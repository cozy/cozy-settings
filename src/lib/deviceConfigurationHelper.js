import { Q } from 'cozy-client'

export const FILES_DOCTYPE = 'io.cozy.files'
export const OAUTH_CLIENTS_DOCTYPE = 'io.cozy.oauth.clients'

export const ROOT_FOLDER_ID = 'io.cozy.files.root-dir'
const TRASH_DIR_ID = 'io.cozy.files.trash-dir'

const formatFoldersQueryId = (type, folderId, sortAttribute, sortOrder) => {
  return `${type} ${folderId} ${sortAttribute} ${sortOrder} ${new Date()}`
}

export const buildFoldersQuery = ({ currentFolderId }) => ({
  definition: () =>
    Q('io.cozy.files')
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
      .limitBy(100),
  options: {
    as: formatFoldersQueryId('directory', currentFolderId, 'name', 'asc')
  }
})

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
