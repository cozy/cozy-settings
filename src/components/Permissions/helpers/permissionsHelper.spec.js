import {
  displayPermissions,
  getPermissionsVerbsByType
} from './permissionsHelper'

describe('displayPermissions', () => {
  it('should return Lecture et Écriture when verbs is undefined', () => {
    const result = displayPermissions(undefined)
    expect(result).toEqual('Permissions.readAndWrite')
  })
  it('should return Lecture et Écriture when several verbs including GET ', () => {
    const result = displayPermissions(['GET', 'POST', 'PUT'])
    expect(result).toEqual('Permissions.readAndWrite')
  })
  it('should return Lecture when verbs contains only GET ', () => {
    const result = displayPermissions(['GET'])
    expect(result).toEqual('Permissions.read')
  })
  it('should return Ecriture when verbs does not contain GET ', () => {
    const result = displayPermissions(['POST', 'PUT', 'DELETE'])
    expect(result).toEqual('Permissions.write')
  })
})

describe('getPermissionsVerbsByType', () => {
  const appOrKonnector = {
    permissions: {
      accounts: {
        type: 'io.cozy.accounts',
        description:
          'Required to display additional information in the viewer for files automatically retrieved by services',
        verbs: ['GET']
      },
      albums: {
        type: 'io.cozy.photos.albums',
        description: 'Required to manage photos albums',
        verbs: ['PUT']
      },
      files: {
        type: 'io.cozy.files',
        description: 'Required to access the files'
      }
    }
  }
  it("should return ['PUT'] when the permission required is in appOrKonnector.permissions and it contains ['PUT'] in his verbs", () => {
    const permission = 'io.cozy.photos.albums'
    const result = getPermissionsVerbsByType(
      appOrKonnector.permissions,
      permission
    )
    expect(result).toEqual(['PUT'])
  })
  it("should return undefined when the permission required is not in appOrKonnector.permissions and it contains ['PUT'] in his verbs", () => {
    const permission = 'io.cozy.contacts'
    const result = getPermissionsVerbsByType(
      appOrKonnector.permissions,
      permission
    )
    expect(result).toEqual(undefined)
  })
})
