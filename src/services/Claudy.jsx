/* global __PIWIK_TRACKER_URL__  __PIWIK_SITEID__ __PIWIK_DIMENSION_ID_APP__ */

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import { shouldEnableTracking, getTracker, configureTracker } from 'cozy-ui/react/helpers/tracker'

import ClaudyAction from './ClaudyAction'

const MOBILE_CLIENT_KIND = 'mobile'
const DESKTOP_CLIENT_KIND = 'desktop'

export class Claudy extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      openedAction: null,
      selectedAction: null
    }

    this.getIcon = this.getIcon.bind(this)
    this.computeSelectedActionUrl = this.computeSelectedActionUrl.bind(this)
    this.selectAction = this.selectAction.bind(this)
    this.trackActionLink = this.trackActionLink.bind(this)
    this.goBack = this.goBack.bind(this)

    this.checkIcon = require('../assets/services/icon-check.svg')
  }

  componentDidMount () {
    // if tracking enabled, init the piwik tracker
    if (shouldEnableTracking()) {
      const trackerInstance = getTracker(__PIWIK_TRACKER_URL__, __PIWIK_SITEID__, false, false)
      configureTracker({
        appDimensionId: __PIWIK_DIMENSION_ID_APP__,
        app: 'Cozy Settings Services',
        heartbeat: 0
      })
      this.setState({ usageTracker: trackerInstance })
    }
  }

  getIcon (iconName) {
    return require(`../assets/services/claudyActions/${iconName}`)
  }

  computeSelectedActionUrl () {
    if (!this.state.selectedAction) return null
    const action = this.state.selectedAction
    const { t, claudyInfos } = this.props
    if (action.link.type === 'apps' && action.link.appSlug) {
      if (!claudyInfos.apps || !claudyInfos.apps.length) {
        console.warn('No apps found on the Cozy')
        return null
      }
      const app = claudyInfos.apps.find(a => a.attributes.slug === action.link.appSlug)
      if (app && app.links && app.links.related) {
        const appUrl = `${app.links.related}${action.link.path || ''}`
        return appUrl
      } else {
        console.warn(`No app with slug '${action.link.appSlug}' found on the Cozy.`)
        return null
      }
    } else {
      const url = t(`claudy.actions.${action.slug}.link`)
      return url
    }
  }

  consolidateActions (claudyInfos) {
    return claudyInfos.actions.map(action => {
      switch (action.slug) {
        case 'desktop':
          action.complete = !!claudyInfos.devices.find(d => d.client_kind === DESKTOP_CLIENT_KIND)
          break
        case 'mobile':
          action.complete = !!claudyInfos.devices.find(d => d.client_kind === MOBILE_CLIENT_KIND)
          break
        case 'cozy-collect':
          action.complete = !!claudyInfos.collectAccounts.length
          break
        default:
          action.complete = false
          break
      }
      return action
    })
  }

  selectAction (action) {
    // if just previously selected
    const usageTracker = this.state.usageTracker
    if (usageTracker) {
      usageTracker.push([
        'trackEvent',
        'Claudy',
        'openAction',
        `${action.slug}`
      ])
    }
    if (this.state.selectedAction && this.state.selectedAction.slug === action.slug) {
      this.setState({ openedAction: true })
    } else {
      this.setState({selectedAction: action, openedAction: true})
    }
  }

  trackActionLink (action) {
    const usageTracker = this.state.usageTracker
    if (usageTracker) {
      usageTracker.push([
        'trackEvent',
        'Claudy',
        'openActionLink',
        `${action.slug}`
      ])
    }
  }

  goBack () {
    this.setState({ openedAction: false })
  }

  render () {
    const { t, claudyInfos, onClose } = this.props
    const { selectedAction, openedAction } = this.state
    const selectedActionUrl = this.computeSelectedActionUrl()
    const claudyActions = this.consolidateActions(claudyInfos)
    return (
      <div className={`coz-service-claudy ${
        openedAction ? 'coz-claudy-menu--action-selected' : ''}`}>
        <header className='coz-claudy-menu-header'>
          <h2 className='coz-claudy-menu-title'>{t('claudy.title')}</h2>
          <button className='coz-btn-close' onClick={onClose} />
          <button className='coz-claudy-menu-header-back-button' onClick={this.goBack} />
        </header>
        <div className='coz-claudy-menu-content-wrapper'>
          <div className='coz-claudy-menu-content' >
            <div className='coz-claudy-menu-actions-list'>
              {claudyActions.map(action => (
                <a className='coz-claudy-menu-action' data-complete={action.complete} onClick={() => this.selectAction(action)}>
                  <img
                    className='coz-claudy-menu-action-icon'
                    src={this.getIcon(action.icon)}
                  />
                  <p className='coz-claudy-menu-action-title'>
                    {t(`claudy.actions.${action.slug}.title`)}
                  </p>
                  {action.complete &&
                    <img
                      className='coz-claudy-menu-action-check'
                      src={this.checkIcon}
                    />
                  }
                </a>
              ))}
            </div>
            {selectedAction &&
              <ClaudyAction
                action={selectedAction}
                iconSrc={this.getIcon(selectedAction.icon)}
                url={selectedActionUrl}
                onActionClick={() => this.trackActionLink(selectedAction)}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default translate()(Claudy)
