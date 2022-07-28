import { displayPermissions } from './permissionsHelper'

describe('displayPermissions', () => {
  it('should return Lecture et Écriture when verbs is undefined', () => {
    const result = displayPermissions(undefined)
    expect(result).toEqual('Lecture et Écriture')
  })
  it('should return Lecture et Écriture when several verbs including GET ', () => {
    const result = displayPermissions(['GET', 'POST', 'PUT'])
    expect(result).toEqual('Lecture et Écriture')
  })
  it('should return Lecture when verbs contains only GET ', () => {
    const result = displayPermissions(['GET'])
    expect(result).toEqual('Lecture')
  })
  it('should return Ecriture when verbs does not contain GET ', () => {
    const result = displayPermissions(['POST', 'PUT', 'DELETE'])
    expect(result).toEqual('Écriture')
  })
})
