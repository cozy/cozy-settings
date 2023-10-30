import { computeDocumentFromRealTime } from 'components/SettingsRealTimeQueries'

describe('computeDocumentFromRealTime', () => {
  const client = {
    getDocumentFromState: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should merge attributes from real time document with existing document in store', () => {
    const docFromRealTime = {
      _id: 'io.cozy.settings.instance',
      _type: 'io.cozy.settings',
      _rev: 'rev-2',
      public_name: 'Alice2'
    }
    const docFromState = {
      _id: 'io.cozy.settings.instance',
      _type: 'io.cozy.settings',
      _rev: 'rev-1',
      attributes: {
        public_name: 'Alice',
        password_defined: true
      }
    }
    client.getDocumentFromState.mockReturnValueOnce(docFromState)

    const result = computeDocumentFromRealTime(client, docFromRealTime)

    expect(result).toEqual({
      _id: 'io.cozy.settings.instance',
      _type: 'io.cozy.settings',
      _rev: 'rev-2',
      public_name: 'Alice2',
      attributes: {
        public_name: 'Alice2',
        password_defined: true
      },
      meta: {
        rev: 'rev-2'
      }
    })
    expect(client.getDocumentFromState).toHaveBeenCalledWith(
      'io.cozy.settings',
      'io.cozy.settings.instance'
    )
  })

  it('should add attributes from real time document if no existing document in store', () => {
    const docFromRealTime = {
      _id: 'io.cozy.settings.instance',
      _type: 'io.cozy.settings',
      _rev: 'rev-1',
      public_name: 'Alice'
    }
    client.getDocumentFromState.mockReturnValueOnce(null)

    const result = computeDocumentFromRealTime(client, docFromRealTime)

    expect(result).toEqual({
      _id: 'io.cozy.settings.instance',
      _type: 'io.cozy.settings',
      _rev: 'rev-1',
      public_name: 'Alice',
      attributes: {
        public_name: 'Alice'
      }
    })
    expect(client.getDocumentFromState).toHaveBeenCalledWith(
      'io.cozy.settings',
      'io.cozy.settings.instance'
    )
  })
})
