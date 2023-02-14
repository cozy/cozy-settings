import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import useFetchJSON from 'cozy-client/dist/hooks/useFetchJSON'

import withAllLocales from 'lib/withAllLocales'
import useAppsOrKonnectorsBySlug from 'components/Permissions/hooks/useAppsOrKonnectorsBySlug'
import PermissionDetailsModalContent from 'components/Permissions/PermissionDetails/PermissionDetailsModalContent'

const PermissionDetailsModal = ({ slug, permissionType, t }) => {
  const navigate = useNavigate()

  const closeModal = () => {
    navigate('..')
  }

  const { isResultLoading, hasQueryFailed, result } =
    useAppsOrKonnectorsBySlug(slug)

  const { data: remoteDoctypes, ...queryResultRemoteDoctypes } = useFetchJSON(
    'GET',
    '/remote/_all_doctypes'
  )

  if (
    isResultLoading ||
    hasQueryFailed ||
    (isQueryLoading(queryResultRemoteDoctypes) &&
      !hasQueryBeenLoaded(queryResultRemoteDoctypes)) ||
    queryResultRemoteDoctypes.fetchStatus === 'error'
  )
    return null

  const permission = Object.values(result?.data.permissions).filter(
    permission => permission.type === permissionType
  )[0]

  const isRemoteDoctypes = remoteDoctypes.includes(permissionType)

  const title = t(`CozyPermissions.${permissionType}`)

  return (
    <Dialog
      open={true}
      onClose={closeModal}
      title={title}
      content={
        <PermissionDetailsModalContent
          slug={slug}
          verbs={permission.verbs}
          description={permission.description}
          isRemoteDoctypes={isRemoteDoctypes}
          title={title}
          t
        />
      }
    />
  )
}

export default withAllLocales(PermissionDetailsModal)
