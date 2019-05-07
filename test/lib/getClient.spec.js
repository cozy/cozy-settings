import { getClient } from '../../src/lib/cozyClient'
import CozyClient from 'cozy-client'
jest.mock('cozy-client')

const FAKE_APP_TOKEN =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAiLCJpYXQiOjE1NTYxMTIwOTQsImlzcyI6ImVkYXMubXljb3p5LmNsb3VkIiwic3ViIjoiaG9tZSIsInNlc3Npb25faWQiOiI4YjI1ZTgzNTkwYTg5MDg0MDUzNDIxZGE0ZmZlOTMwNiJ9.gA3Xnoliu43gwpuO88O6G59rVP_HClZ_vBp96pEjVNnZDpxU4ZnQoWmICoLXih4PvFZRj2eHjnG-eqnJx6XM2A'

const FAKE_APP_DOMAIN = 'test.mycozy.cloud'

const FAKE_APP_BODY = `<div role="application" data-cozy-token="${FAKE_APP_TOKEN}" data-cozy-domain="${FAKE_APP_DOMAIN}" data-cozy-locale="fr" data-cozy-app-editor="Cozy" data-cozy-app-name="Accueil" data-cozy-app-name-prefix="Cozy" data-cozy-app-slug="home" data-cozy-tracking="false" data-cozy-icon-path="icon.svg"><script src="vendors/home.a664629f1a5622ccb459.js"></script><script src="app/home.455bbc269323b2c64382.js"></script><script src="//test.mycozy.cloud/assets/js/piwik.js" async></script></div>`

/*
const FAKE_APP_HTML = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Cozy Home</title>
  <link rel="icon" href="//test.mycozy.cloud/assets/favicon.f56cf1d03b.ico">
  <link rel="icon" type="image/png" href="//test.mycozy.cloud/assets/favicon-16x16.192a16308f.png" sizes="16x16">
  <link rel="icon" type="image/png" href="//test.mycozy.cloud/assets/favicon-32x32.9f958fa2c7.png" sizes="32x32">
  <link rel="apple-touch-icon" sizes="180x180" href="//test.mycozy.cloud/assets/apple-touch-icon.a0e0ae4102.png"/>
    <link rel="manifest" href="/manifest.json" crossorigin="use-credentials"><meta name="msapplication-TileColor" content="#2b5797"><meta name="theme-color" content="#ffffff"><meta name="viewport" content="width=device-width,height=device-height,initial-scale=1,viewport-fit=cover"><link rel="stylesheet" href="vendors/home.c451e5ac76c8377b20c5.0.min.css"><link rel="stylesheet" href="app/home.cbb1b1050b936df11fbd.min.css"><link rel="stylesheet" type="text/css" href="//test.mycozy.cloud/assets/styles/theme.faa4e12bdc.css"> <script src="//test.mycozy.cloud/assets/js/cozy-client.605c649bc3.min.js"></script>
<link rel="stylesheet" type="text/css" href="//test.mycozy.cloud/assets/fonts/fonts.33109548ca.css">
<link rel="stylesheet" type="text/css" href="//test.mycozy.cloud/assets/css/cozy-bar.6effa2d88c.min.css">
<script src="//test.mycozy.cloud/assets/js/cozy-bar.f99c08ee53.min.js"></script></head><body>${FAKE_APP_BODY}</body></html>
`
*/

describe('getClient', () => {
  beforeAll(() => {
    document.body.innerHTML = FAKE_APP_BODY
    Object.defineProperty(document, 'readyState', { value: 'loaded' })
    delete global.window.location
    global.window.location = new URL(`https://${FAKE_APP_DOMAIN}`)
  })

  beforeEach(() => {
    CozyClient.mockClear()
  })

  it('should initialize a CozyClient instance', () => {
    const res = getClient()
    expect(CozyClient).toHaveBeenCalledTimes(1)
    expect(res).toBeTruthy()
    const arg = CozyClient.mock.calls[0][0]
    expect(arg.uri).toEqual('https://test.mycozy.cloud')
    expect(arg.token).toEqual(FAKE_APP_TOKEN)
  })

  it('should memoize the first call', () => {
    getClient()
    CozyClient.mockClear()
    const res = getClient()
    expect(CozyClient).toHaveBeenCalledTimes(0)
    expect(res).toBeTruthy()
  })
})
