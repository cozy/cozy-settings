import { memo, useEffect } from 'react'
import { useClient, Mutations } from 'cozy-client'
import { receiveMutationResult } from 'cozy-client/dist/store'

/**
 * Normalizes an object representing a CouchDB document
 *
 * Ensures existence of `_type`
 *
 * @public
 * @param {CouchDBDocument} couchDBDoc - object representing the document
 * @returns {CozyClientDocument} full normalized document
 */
const normalizeDoc = (couchDBDoc, doctype) => {
  return {
    id: couchDBDoc._id,
    _type: doctype,
    ...couchDBDoc
  }
}

/**
 * DispatchChange
 *
 * @param {CozyClient} client CozyClient instane
 * @param {Doctype} doctype Doctype of the document to update
 * @param {CouchDBDocument} couchDBDoc Document to update
 * @param {Mutation} mutationDefinitionCreator Mutation to apply
 */
const dispatchChange = (
  client,
  doctype,
  couchDBDoc,
  mutationDefinitionCreator
) => {
  const data = normalizeDoc(couchDBDoc, doctype)
  const response = {
    data
  }

  const options = {}
  client.dispatch(
    receiveMutationResult(
      client.generateRandomId(),
      response,
      options,
      mutationDefinitionCreator(data)
    )
  )
}

/**
 * The document real time comes without attributes, there are only at the root.
 * That's why we need to merge the attributes from the document in the store.
 * @param {CozyClient} client - CozyClient instane
 * @param {CouchDBDocument} docFromRealTime - object representing the document from real time
 * @returns {object} merged document
 */
export const computeDocumentFromRealTime = (client, docFromRealTime) => {
  const { _id, _type, _rev, ...attributes } = docFromRealTime
  const docFromState = client.getDocumentFromState('io.cozy.settings', _id)

  if (docFromState) {
    return {
      ...docFromState,
      _id,
      _type,
      _rev,
      ...attributes,
      attributes: {
        ...docFromState?.attributes,
        ...attributes
      },
      meta: {
        rev: _rev
      }
    }
  }

  return {
    ...docFromRealTime,
    attributes: {
      ...attributes
    }
  }
}

/**
 * Component that subscribes to io.cozy.settings document changes and keep the
 * internal store updated. This is a copy of RealTimeQueries from cozy-client
 * with a tweak to merge the changes with the existing document from the store.
 * You can have more detail on the problematic we are solving here:
 * https://github.com/cozy/cozy-client/issues/1412
 *
 * @param  {object} options - Options
 * @param  {Doctype} options.doctype - The doctype to watch
 * @returns {null} The component does not display anything.
 */
const SettingsRealTimeQueries = ({ doctype = 'io.cozy.settings' }) => {
  const client = useClient()

  useEffect(() => {
    const realtime = client.plugins.realtime

    if (!realtime) {
      throw new Error(
        'You must include the realtime plugin to use RealTimeQueries'
      )
    }

    const dispatchCreate = couchDBDoc => {
      const doc = computeDocumentFromRealTime(client, couchDBDoc)
      dispatchChange(client, doctype, doc, Mutations.createDocument)
    }
    const dispatchUpdate = couchDBDoc => {
      const doc = computeDocumentFromRealTime(client, couchDBDoc)
      dispatchChange(client, doctype, doc, Mutations.updateDocument)
    }
    const dispatchDelete = couchDBDoc => {
      const doc = computeDocumentFromRealTime(client, couchDBDoc)
      dispatchChange(
        client,
        doctype,
        { ...doc, _deleted: true },
        Mutations.deleteDocument
      )
    }

    const subscribe = async () => {
      await realtime.subscribe('created', doctype, dispatchCreate)
      await realtime.subscribe('updated', doctype, dispatchUpdate)
      await realtime.subscribe('deleted', doctype, dispatchDelete)
    }
    subscribe()

    return () => {
      realtime.unsubscribe('created', doctype, dispatchCreate)
      realtime.unsubscribe('updated', doctype, dispatchUpdate)
      realtime.unsubscribe('deleted', doctype, dispatchDelete)
    }
  }, [client, doctype])

  return null
}

export default memo(SettingsRealTimeQueries)
