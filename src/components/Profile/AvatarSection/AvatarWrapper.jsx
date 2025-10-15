import React from 'react'

import { useQuery, useClient } from 'cozy-client'
import Avatar from 'cozy-ui/transpiled/react/Avatar'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { buildSettingsInstanceQuery } from '@/lib/queries'

const AvatarWrapper = ({ avatarStatus, setAvatarStatus, avatarTimestamp }) => {
  const client = useClient()
  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )
  const rootURL = client.getStackClient().uri

  if (avatarStatus === 'LOADING') {
    return (
      <>
        <Avatar className="u-o-50" size={94} />
        <Spinner className="u-m-0" middle size="large" />
      </>
    )
  }

  const alt = instance?.public_name || 'Avatar'

  if (avatarStatus === 'PRESENT') {
    return (
      <Avatar
        key={avatarTimestamp}
        size={94}
        src={`${rootURL}/public/avatar?t=${avatarTimestamp}&fallback=initials`}
        alt={alt}
        onError={() => {
          setAvatarStatus('ABSENT')
        }}
      />
    )
  }

  return <Avatar key={avatarTimestamp} size={94} alt={alt} />
}

export default AvatarWrapper
