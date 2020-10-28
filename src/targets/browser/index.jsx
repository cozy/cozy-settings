/* global cozy */

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'styles/index.styl'

import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { CozyProvider } from 'cozy-client'

import I18n from 'cozy-ui/transpiled/react/I18n'
import PiwikHashRouter from 'lib/PiwikHashRouter'

import App from 'components/App'
import cozyClient from 'lib/client'

import createStore from '../../store'

const EnhancedI18n = connect(state => {
  const { lang } = state.ui
  try {
    cozy.bar.setLocale && cozy.bar.setLocale(lang)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`The dict phrases for "${lang}" can't be loaded`)
  }
  return { lang }
})(I18n)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  const protocol = window.location.protocol
  cozyClient.login({
    uri: `${protocol}//${data.cozyDomain}`,
    token: data.cozyToken
  })

  const store = createStore()
  cozyClient.setStore(store)

  cozy.bar.init({
    cozyClient,
    appName: data.cozyAppName,
    appEditor: data.cozyAppEditor,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale
  })

  render(
    <CozyProvider client={cozyClient}>
      <Provider store={store}>
        <EnhancedI18n dictRequire={lang => require(`locales/${lang}.json`)}>
          <PiwikHashRouter>
            <App />
          </PiwikHashRouter>
        </EnhancedI18n>
      </Provider>
    </CozyProvider>,
    root
  )
})
