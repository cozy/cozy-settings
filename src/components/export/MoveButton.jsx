import React, { useRef, useState } from 'react'

import flag from 'cozy-flags'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Buttons from 'cozy-ui/transpiled/react/Buttons'

import { STACK_DOMAIN } from 'actions'
import {
  BlockingSubscriptionModal,
  hasBlockingSubscription
} from 'components/BlockingSubscriptionModal'
import { buildExternalTiesQuery } from 'lib/queries'
import { useClient } from 'cozy-client'

const MoveButton = () => {
  const { t } = useI18n()
  const client = useClient()
  const externalTiesQuery = buildExternalTiesQuery()

  const [isBlockingDisplayed, setBlockingDisplayed] = useState(false)
  const form = useRef(null)

  const handleSubmit = async () => {
    const externalTiesResult = await client.query(
      externalTiesQuery.definition(),
      externalTiesQuery.options
    )

    if (hasBlockingSubscription(externalTiesResult)) {
      setBlockingDisplayed(true)
    } else {
      form.current.submit()
    }
  }

  const handleClose = () => {
    setBlockingDisplayed(false)
  }

  const handleResume = () => {
    form.current.submit()
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
          variant="secondary"
          onClick={handleSubmit}
        />
        {isBlockingDisplayed ? (
          <BlockingSubscriptionModal
            onClose={handleClose}
            onResume={handleResume}
            reason="move"
          />
        ) : null}
      </form>
    )
  }

  return null
}

export { MoveButton }
