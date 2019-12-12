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
import PassphraseExample from 'components/PassphraseExample'

import { PassphraseInput } from 'components/Input'
import passwordHelper from 'lib/passwordHelper'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import { getRedirectUrlsFromURLParams } from 'containers/Passphrase'

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

    const { cancelRedirectUrl } = getRedirectUrlsFromURLParams(location.search)

    return (
      <Stack spacing="xxl" tag="form" onSubmit={this.handleSubmit}>
        <MainTitle className="u-mt-2">{t('PassphraseView.title')}</MainTitle>
        <Stack spacing="m">
          <SubTitle tag="label" htmlFor="current-passphrase">
            {t('PassphraseView.current_passphrase.label')}
          </SubTitle>
          <PassphraseInput
            name="currentPassphrase"
            value={currentPassphrase}
            onChange={this.handleInputChange}
            autoComplete="current-password"
            id="current-passphrase"
            placeholder={t('PassphraseView.current_passphrase.placeholder')}
            error={Boolean(currentPassphraseError)}
          />
          {currentPassphraseError && (
            <p className="u-error">{t(currentPassphraseError)}</p>
          )}
        </Stack>
        <Stack spacing="m">
          <SubTitle tag="label" htmlFor="new-passphrase">
            {t('PassphraseView.new_passphrase.label')}
          </SubTitle>
          <Stack spacing="xs">
            <PassphraseInput
              name="newPassphrase"
              autoComplete="new-password"
              id="new-passphrase"
              placeholder={t('PassphraseView.new_passphrase.placeholder')}
              value={newPassphrase}
              onChange={this.handleInputChange}
              showStrength
              error={newPassphraseTouched && !newPassphraseMatch}
            />
            <PassphraseInput
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
          {newPassphraseTouched &&
            !newPassphraseMatch && (
              <p className="u-error">
                {t('PassphraseView.new_passphrase.dont_match')}
              </p>
            )}
          {globalError && <p className="u-error">{t(globalError)}</p>}
          {twoFactorError && <p className="u-error">{t(twoFactorError)}</p>}
          <Stack
            spacing="m"
            tag="ul"
            className={styles['coz-passphrase-advices']}
          >
            <Text tag="li">
              <ReactMarkdownWrapper
                source={t('PassphraseView.advices.strong_passphrase')}
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
              <PassphraseExample passphrase="Cl4ude€st1Nu@ge" />
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
              error={hintSameAsPassphrase}
            />
            {hintSameAsPassphrase && (
              <p className="u-error">
                {t('PassphraseView.hint.same_as_passphrase')}
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
