import styles from 'styles/passphrase.styl'

import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import compose from 'lodash/flowRight'
import get from 'lodash/get'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Button, ButtonLink } from 'cozy-ui/transpiled/react/Button'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Input from 'cozy-ui/transpiled/react/Input'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Stack from 'cozy-ui/transpiled/react/Stack'
import PasswordInput from 'cozy-ui/transpiled/react/Labs/PasswordInput'
import CheckIcon from 'cozy-ui/transpiled/react/Icons/Check'
import { UnorderedList, ListItem } from 'cozy-ui/transpiled/react/UnorderedList'
import PasswordExample from 'cozy-ui/transpiled/react/PasswordExample'

import { withClient } from 'cozy-client'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import PageTitle from 'components/PageTitle'
import passwordHelper from 'lib/passwordHelper'
import { parseRedirectUrlsFromUrlParams } from 'containers/Passphrase'

const initialState = {
  currentPassphrase: '',
  newPassphrase: '',
  newPassphraseRepeat: '',
  hint: ''
}

class PassphraseForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    // eslint-disable-next-line promise/catch-or-return
    this.props
      .onSubmit(
        this.state.currentPassphrase,
        this.state.newPassphrase,
        this.state.hint
      )
      // eslint-disable-next-line promise/always-return
      .then(() => {
        this.setState(initialState)
      })
  }

  render() {
    const { currentPassphrase, newPassphrase, newPassphraseRepeat, hint } =
      this.state

    const { t, errors, submitting, saved, location, client } = this.props
    const currentPassphraseError = errors && errors.currentPassphrase
    const globalError = errors && errors.global
    const twoFactorError = errors && errors.wrongTwoFactor
    const strength = passwordHelper.getStrength(newPassphrase)

    const newPassphraseTouched =
      newPassphrase !== '' && newPassphraseRepeat !== ''

    const newPassphraseMatch = newPassphrase === newPassphraseRepeat
    const hintSameAsPassphrase = newPassphraseTouched && newPassphrase === hint

    const canSubmit =
      newPassphraseTouched &&
      newPassphraseMatch &&
      strength.label !== 'weak' &&
      !hintSameAsPassphrase

    const { cancelRedirectUrl } = parseRedirectUrlsFromUrlParams(
      location.search
    )

    const canAuthWithPassword = get(
      client,
      'capabilities.can_auth_with_password'
    )
    const canAuthWithOIDC = get(client, 'capabilities.can_auth_with_oidc')
    const shouldUseOIDCtitle = !canAuthWithPassword && canAuthWithOIDC

    return (
      <Stack spacing="xl" tag="form" onSubmit={this.handleSubmit}>
        <PageTitle>
          {shouldUseOIDCtitle
            ? t('PassphraseView.title_oidc')
            : t('PassphraseView.title')}
        </PageTitle>
        <Stack spacing="m">
          <Typography
            variant="h5"
            component="label"
            htmlFor="current-passphrase"
          >
            {t('PassphraseView.current_passphrase.label')}
          </Typography>
          <PasswordInput
            name="currentPassphrase"
            value={currentPassphrase}
            onChange={this.handleInputChange}
            autoComplete="current-password"
            id="current-passphrase"
            placeholder={t('PassphraseView.current_passphrase.placeholder')}
            error={Boolean(currentPassphraseError)}
          />
          {currentPassphraseError && (
            <Typography variant="body1">{t(currentPassphraseError)}</Typography>
          )}
        </Stack>
        <Stack spacing="m">
          <Typography variant="h5" component="label" htmlFor="new-passphrase">
            {t('PassphraseView.new_passphrase.label')}
          </Typography>
          <Stack spacing="xs">
            <PasswordInput
              name="newPassphrase"
              autoComplete="new-password"
              id="new-passphrase"
              placeholder={t('PassphraseView.new_passphrase.placeholder')}
              value={newPassphrase}
              onChange={this.handleInputChange}
              showStrength
              error={newPassphraseTouched && !newPassphraseMatch}
            />
            <PasswordInput
              name="newPassphraseRepeat"
              autoComplete="new-password"
              id="new-passphrase-repeat"
              placeholder={t(
                'PassphraseView.new_passphrase.confirmation_placeholder'
              )}
              value={newPassphraseRepeat}
              onChange={this.handleInputChange}
              error={newPassphraseTouched && !newPassphraseMatch}
            />
          </Stack>
          {newPassphraseTouched && !newPassphraseMatch && (
            <Typography variant="body1" className="u-error">
              {t('PassphraseView.new_passphrase.dont_match')}
            </Typography>
          )}
          {globalError && (
            <Typography variant="body1" className="u-error">
              {t(globalError)}
            </Typography>
          )}
          {twoFactorError && (
            <Typography variant="body1" className="u-error">
              {t(twoFactorError)}
            </Typography>
          )}
          <UnorderedList className={styles['set-passphrase-advices']}>
            <ListItem>
              <ReactMarkdownWrapper
                source={t('PassphraseView.advices.strong_passphrase')}
              />
            </ListItem>
            <ListItem>
              <ReactMarkdownWrapper
                source={t('PassphraseView.advices.memorize')}
              />
            </ListItem>
            <ListItem>
              <ReactMarkdownWrapper
                source={t('PassphraseView.advices.our_tip')}
              />
              <PasswordExample password="Cl4ude€st1Nu@ge" />
            </ListItem>
          </UnorderedList>
        </Stack>
        <Stack spacing="m">
          <Typography variant="h5" component="label" htmlFor="hint">
            {t('PassphraseView.hint.title')}
          </Typography>
          <Stack spacing="xs">
            <Input
              value={hint}
              onChange={this.handleInputChange}
              placeholder={t('PassphraseView.hint.placeholder')}
              name="hint"
              id="hint"
              error={hintSameAsPassphrase}
            />
            {hintSameAsPassphrase && (
              <Typography variant="body1" className="u-error">
                {t('PassphraseView.hint.same_as_passphrase')}
              </Typography>
            )}
          </Stack>
          <ReactMarkdownWrapper source={t('PassphraseView.hint.description')} />
        </Stack>
        <Stack spacing="xs">
          <Button
            busy={submitting}
            disabled={!canSubmit}
            label={t('PassphraseView.submit')}
            extension="full"
            className="u-mb-half"
          >
            {saved && <Icon className="u-ml-half u-valid" icon={CheckIcon} />}
          </Button>
          {cancelRedirectUrl ? (
            <ButtonLink
              href={cancelRedirectUrl}
              label={t('PassphraseView.cancel')}
              theme="secondary"
              extension="full"
            />
          ) : (
            <Button
              tag={Link}
              to="/profile"
              label={t('PassphraseView.cancel')}
              theme="secondary"
              extension="full"
            />
          )}
        </Stack>
      </Stack>
    )
  }
}

export default compose(translate(), withRouter, withClient)(PassphraseForm)
