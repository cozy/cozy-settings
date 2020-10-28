import styles from 'styles/passphrase'

import React, { Component } from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Button, ButtonLink } from 'cozy-ui/transpiled/react/Button'
import {
  MainTitle,
  SubTitle,
  ErrorMessage
} from 'cozy-ui/transpiled/react/Text'
import Input from 'cozy-ui/transpiled/react/Input'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Stack from 'cozy-ui/transpiled/react/Stack'
import { UnorderedList, ListItem } from 'cozy-ui/transpiled/react/UnorderedList'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { Link, withRouter } from 'react-router-dom'
import compose from 'lodash/flowRight'
import PasswordExample from 'cozy-ui/transpiled/react/PasswordExample'

import PasswordInput from 'cozy-ui/transpiled/react/Labs/PasswordInput'
import passwordHelper from 'lib/passwordHelper'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
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

    this.props
      .onSubmit(
        this.state.currentPassphrase,
        this.state.newPassphrase,
        this.state.hint
      )
      .then(() => {
        this.setState(initialState)
      })
  }

  render() {
    const {
      currentPassphrase,
      newPassphrase,
      newPassphraseRepeat,
      hint
    } = this.state

    const { t, errors, submitting, saved, location } = this.props
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
      hint &&
      !hintSameAsPassphrase

    const { cancelRedirectUrl } = parseRedirectUrlsFromUrlParams(
      location.search
    )

    return (
      <Stack spacing="xxl" tag="form" onSubmit={this.handleSubmit}>
        <MainTitle className="u-mt-2">{t('PassphraseView.title')}</MainTitle>
        <Stack spacing="m">
          <SubTitle tag="label" htmlFor="current-passphrase">
            {t('PassphraseView.current_passphrase.label')}
          </SubTitle>
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
            <ErrorMessage>{t(currentPassphraseError)}</ErrorMessage>
          )}
        </Stack>
        <Stack spacing="m">
          <SubTitle tag="label" htmlFor="new-passphrase">
            {t('PassphraseView.new_passphrase.label')}
          </SubTitle>
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
            <ErrorMessage>
              {t('PassphraseView.new_passphrase.dont_match')}
            </ErrorMessage>
          )}
          {globalError && <ErrorMessage>{t(globalError)}</ErrorMessage>}
          {twoFactorError && <ErrorMessage>{t(twoFactorError)}</ErrorMessage>}
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
          <SubTitle tag="label" htmlFor="hint">
            {t('PassphraseView.hint.title')}
          </SubTitle>
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
              <ErrorMessage>
                {t('PassphraseView.hint.same_as_passphrase')}
              </ErrorMessage>
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
            {saved && (
              <Icon
                className="u-ml-half"
                icon="check"
                color={palette['emerald']}
              />
            )}
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

export default compose(
  translate(),
  withRouter
)(PassphraseForm)
