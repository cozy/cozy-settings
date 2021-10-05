import { useState, useEffect } from 'react'
import { Q } from 'cozy-client'

import logger from 'lib/logger'

export const FILES_DOCTYPE = 'io.cozy.files'
export const OAUTH_CLIENTS_DOCTYPE = 'io.cozy.oauth.clients'
export const ROOT_FOLDER_ID = 'io.cozy.files.root-dir'
export const TRASH_DIR_ID = 'io.cozy.files.trash-dir'
export const COZY_DESKTOP_SOFTWARE_ID = 'github.com/cozy-labs/cozy-desktop'
export const DISPLAYED_CLIENTS = ['mobile', 'desktop', 'browser']

const buildFoldersQuery = ({ currentFolderId }) =>
  Q(FILES_DOCTYPE)
    .where({
      dir_id: currentFolderId,
      type: 'directory',
      name: { $gt: null }
    })
    .partialIndex({
      _id: {
        $ne: TRASH_DIR_ID
      }
    })
    .indexFields(['dir_id', 'type', 'name'])
    .sortBy([{ dir_id: 'asc' }, { type: 'asc' }, { name: 'asc' }])

export const useFolders = client => {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [folders, setFolders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const foldersQuery = buildFoldersQuery({
          currentFolderId: ROOT_FOLDER_ID
        })
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
  deviceToConfigure,
  foldersToInclude,
  foldersToExclude,
  client
}) => {
  return Promise.all([
    foldersToExclude.length > 0 &&
      client
        .collection(FILES_DOCTYPE)
        .addNotSynchronizedDirectories(deviceToConfigure, foldersToExclude),
    foldersToInclude.length > 0 &&
      client
        .collection(FILES_DOCTYPE)
        .removeNotSynchronizedDirectories(deviceToConfigure, foldersToInclude)
  ])
}
