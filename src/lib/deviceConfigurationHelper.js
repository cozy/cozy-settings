import { useState, useEffect } from 'react'
import { Q } from 'cozy-client'

import logger from 'lib/logger'

export const FILES_DOCTYPE = 'io.cozy.files'
export const OAUTH_CLIENTS_DOCTYPE = 'io.cozy.oauth.clients'
export const ROOT_FOLDER_ID = 'io.cozy.files.root-dir'
export const TRASH_DIR_ID = 'io.cozy.files.trash-dir'
export const COZY_DESKTOP_SOFTWARE_ID = 'github.com/cozy-labs/cozy-desktop'
export const DISPLAYED_CLIENTS = ['mobile', 'desktop', 'browser']

const buildFoldersQuery = () =>
  Q(FILES_DOCTYPE)
    .where({
      type: 'directory',
      name: { $gt: null }
    })
    .partialIndex({
      _id: {
        $ne: TRASH_DIR_ID
      }
    })
    .indexFields(['path', 'type', 'name'])
    .sortBy([{ path: 'asc' }, { type: 'asc' }, { name: 'asc' }])

export const useFolders = client => {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [folders, setFolders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const foldersQuery = buildFoldersQuery()
        // We need to be able to tell wether a folder's children are excluded or
        // not to display a "mixed" state when the folder itself is included but
        // its children are not.
        // This can be done by fetching all the folders (i.e. the info we need
        // is present on the folders themselves) or we can fetch folders level
        // by level (i.e. to limit the query size) but we'll then need to
        // request the list of excluded folders as well and looks for excluded
        // children).
        //
        // We'll go with the first solution for the moment as it is simpler to
        // implement than the level by level fetch and display solution.
        const fetchedFolders = await client.queryAll(foldersQuery)
        setFolders(fetchedFolders)
        setLoading(false)
      } catch (e) {
        logger.warn(e)
        setFailed(true)
      }
    }
    fetchData()
  }, [client])

  return { folders, loading, failed }
}

export const toCozyDirectory = ({ id, _id }) => {
  return {
    _id: _id || id,
    _type: FILES_DOCTYPE
  }
}

export const toCozyOAuthClient = ({ id, _id }) => {
  return {
    _id: _id || id,
    _type: OAUTH_CLIENTS_DOCTYPE
  }
}

export const updateDirectoriesExclusions = ({
  device,
  foldersToInclude,
  foldersToExclude,
  client
}) => {
  return Promise.all([
    foldersToExclude.length > 0 &&
      client
        .collection(FILES_DOCTYPE)
        .addNotSynchronizedDirectories(
          toCozyOAuthClient(device),
          foldersToExclude.map(toCozyDirectory)
        ),
    foldersToInclude.length > 0 &&
      client
        .collection(FILES_DOCTYPE)
        .removeNotSynchronizedDirectories(
          toCozyOAuthClient(device),
          foldersToInclude.map(toCozyDirectory)
        )
  ])
}
