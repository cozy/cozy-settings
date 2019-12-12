import fieldsStyles from 'styles/fields'
import styles from 'styles/passphrase'

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button, ButtonLink } from 'cozy-ui/react/Button'
import { MainTitle, SubTitle, Text } from 'cozy-ui/react/Text'
import Input from 'cozy-ui/react/Input'
import Icon from 'cozy-ui/react/Icon'
import Stack from 'cozy-ui/react/Stack'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { Link, withRouter } from 'react-router-dom'
import compose from 'lodash/flowRight'
import PasswordExample from 'components/PasswordExample'

import { NewPasswordInput } from 'components/Input'
import passwordHelper from 'lib/passwordHelper'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import { getRedirectUrlsFromURLParams } from 'containers/Passphrase'

const initialState = {
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
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
        this.state.currentPassword,
        this.state.newPassword,
        this.state.hint
      )
      .then(() => {
        this.setState(initialState)
      })
  }

  render() {
    const { currentPassword, newPassword, newPasswordRepeat, hint } = this.state
    const { t, errors, submitting, saved, location } = this.props
    const currentPasswordError = errors && errors.currentPassword
    const globalError = errors && errors.global
    const newPasswordError = errors && errors.newPassword
    const twoFactorError = errors && errors.wrongTwoFactor
    const strength = passwordHelper.getStrength(newPassword)

    const newPasswordTouched = newPassword !== '' && newPasswordRepeat !== ''
    const newPasswordMatch = newPassword === newPasswordRepeat

    const hintSameAsPassword = newPasswordTouched && newPassword === hint

    const canSubmit =
      newPasswordTouched &&
      newPasswordMatch &&
      strength.label !== 'weak' &&
      hint &&
      !hintSameAsPassword

    const { cancelRedirectUrl } = getRedirectUrlsFromURLParams(location.search)

    return (
      <Stack spacing="xxl" tag="form" onSubmit={this.handleSubmit}>
        <MainTitle className="u-mt-2">{t('PassphraseView.title')}</MainTitle>
        <Stack spacing="m">
          <SubTitle tag="label" htmlFor="current-password">
            {t('PassphraseView.current_password.label')}
          </SubTitle>
          <NewPasswordInput
            name="currentPassword"
            value={currentPassword}
            onChange={this.handleInputChange}
            autoComplete="current-password"
            id="current-password"
            placeholder={t('PassphraseView.current_password.placeholder')}
            error={Boolean(currentPasswordError)}
          />
          {currentPasswordError && (
            <p className="u-error">{t(currentPasswordError)}</p>
          )}
        </Stack>
        <Stack spacing="m">
          <SubTitle tag="label" htmlFor="new-password">
            {t('PassphraseView.new_password.label')}
          </SubTitle>
          <Stack spacing="xs">
            <NewPasswordInput
              name="newPassword"
              autoComplete="new-password"
              id="new-password"
              placeholder={t('PassphraseView.new_password.placeholder')}
              value={newPassword}
              onChange={this.handleInputChange}
              showStrength
              error={newPasswordTouched && !newPasswordMatch}
            />
            <NewPasswordInput
              name="newPasswordRepeat"
              autoComplete="new-password"
              id="new-password-repeat"
              placeholder={t(
                'PassphraseView.new_password.confirmation_placeholder'
              )}
              value={newPasswordRepeat}
              onChange={this.handleInputChange}
              error={newPasswordTouched && !newPasswordMatch}
            />
          </Stack>
          {newPasswordTouched &&
            !newPasswordMatch && (
              <p className="u-error">
                {t('PassphraseView.new_password.dont_match')}
              </p>
            )}
          {newPasswordError && <p className="u-error">{t(newPasswordError)}</p>}
          {globalError && <p className="u-error">{t(globalError)}</p>}
          {twoFactorError && <p className="u-error">{t(twoFactorError)}</p>}
          <Stack
            spacing="m"
            tag="ul"
            className={styles['coz-passphrase-advices']}
          >
            <Text tag="li">
              <ReactMarkdownWrapper
                source={t('PassphraseView.advices.strong_password')}
              />
            </Text>
            <Text tag="li">
              <ReactMarkdownWrapper
                source={t('PassphraseView.advices.memorize')}
              />
            </Text>
            <Text tag="li">
              <ReactMarkdownWrapper
                source={t('PassphraseView.advices.our_tip')}
              />
              <PasswordExample password="Cl4ude€st1Nu@ge" />
            </Text>
          </Stack>
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
              error={hintSameAsPassword}
            />
            {hintSameAsPassword && (
              <p className="u-error">
                {t('PassphraseView.hint.same_as_password')}
              </p>
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
