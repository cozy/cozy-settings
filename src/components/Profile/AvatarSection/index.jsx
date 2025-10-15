import React, { useState, useRef } from 'react'

import Badge from 'cozy-ui/transpiled/react/Badge'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PenIcon from 'cozy-ui/transpiled/react/Icons/Pen'

import AvatarMenu from './AvatarMenu'
import AvatarWrapper from './AvatarWrapper'

const AvatarSection = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [avatarStatus, setAvatarStatus] = useState('PRESENT') // PRESENT || ABSENT || LOADING
  const [avatarTimestamp, setAvatarTimestamp] = useState(Date.now())

  const menuAnchorRef = useRef(null)

  return (
    <Badge
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      badgeContent={
        <>
          <Button
            ref={menuAnchorRef}
            component="div"
            className="u-miw-auto u-w-2-half u-h-2-half u-bdrs-circle"
            classes={{ label: 'u-flex u-w-auto' }}
            style={{
              outline: '4px solid var(--paperBackgroundColor)'
            }}
            label={<Icon icon={PenIcon} />}
            size="small"
            onClick={() => setShowMenu(v => !v)}
          />
          <AvatarMenu
            anchorRef={menuAnchorRef.current}
            avatarStatus={avatarStatus}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setAvatarStatus={setAvatarStatus}
            setAvatarTimestamp={setAvatarTimestamp}
          />
        </>
      }
    >
      <AvatarWrapper
        avatarStatus={avatarStatus}
        setAvatarStatus={setAvatarStatus}
        avatarTimestamp={avatarTimestamp}
      />
    </Badge>
  )
}

export default AvatarSection
