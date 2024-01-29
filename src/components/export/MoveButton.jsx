import React, { useRef, useState } from 'react'

import flag from 'cozy-flags'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Buttons from 'cozy-ui/transpiled/react/Buttons'

import { STACK_DOMAIN } from 'actions'
import { useHasBlockingSubscription } from 'hooks/useHasBlockingSubscription'
import { BlockingSubscriptionModal } from 'components/BlockingSubscriptionModal'

const MoveButton = () => {
  const { t } = useI18n()
  const { isLoaded, hasBlockingSubscription } = useHasBlockingSubscription()

  const [isBlockingDisplayed, setBlockingDisplayed] = useState(false)
  const form = useRef(null)

  const handleSubmit = () => {
    if (hasBlockingSubscription) {
      setBlockingDisplayed(true)
    } else {
      form.current.submit()
    }
  }

  const handleClose = () => {
    setBlockingDisplayed(false)
  }

  if (flag('settings.moving-cozy')) {
    return (
      <form
        action={STACK_DOMAIN + '/move/initialize'}
        method="post"
        target="_blank"
        className="u-mv-half"
        ref={form}
      >
        <Buttons
          label={t('ProfileView.move.button')}
          fullWidth
          onClick={handleSubmit}
          isBusy={isLoaded}
        />
        {isBlockingDisplayed ? (
          <BlockingSubscriptionModal onClose={handleClose} reason="move" />
        ) : null}
      </form>
    )
  }

  return null
}

export { MoveButton }
