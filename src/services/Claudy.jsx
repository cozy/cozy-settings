/* global __PIWIK_TRACKER_URL__  __PIWIK_SITEID__ __PIWIK_DIMENSION_ID_APP__ */

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import {
  shouldEnableTracking,
  getTracker,
  configureTracker
} from 'cozy-ui/react/helpers/tracker'
import Icon from 'cozy-ui/react/Icon'

import ClaudyAction from 'services/ClaudyAction'

const MOBILE_CLIENT_KIND = 'mobile'
const DESKTOP_CLIENT_KIND = 'desktop'

const CLAUDY_ACTION_GATHER = 'gather'

export class Claudy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openedAction: null,
      selectedAction: null,
      alreadyResized: false,
      alert: null
    }

    this.getIcon = this.getIcon.bind(this)
    this.computeSelectedActionUrl = this.computeSelectedActionUrl.bind(this)
    this.selectAction = this.selectAction.bind(this)
    this.trackActionLink = this.trackActionLink.bind(this)
    this.goBack = this.goBack.bind(this)

    this.checkIcon = require('assets/services/icon-check.svg')
  }

  componentDidMount() {
    // if tracking enabled, init the piwik tracker
    if (shouldEnableTracking()) {
      const trackerInstance = getTracker(
        __PIWIK_TRACKER_URL__,
        __PIWIK_SITEID__,
        false,
        false
      )
      configureTracker({
        appDimensionId: __PIWIK_DIMENSION_ID_APP__,
        app: 'Cozy Settings Services',
        heartbeat: 0
      })
      this.setState({ usageTracker: trackerInstance })
    }
  }

  getIcon(iconName) {
    return require(`assets/services/claudyActions/${iconName}`)
  }

  computeSelectedActionUrl(selectedAction) {
    if (!selectedAction || !selectedAction.link) return null
    const action = selectedAction
    const { t, claudyInfos } = this.props
    if (action.link.type === 'apps' && action.link.appSlug) {
      if (!claudyInfos.apps || !claudyInfos.apps.length) {
        console.warn('No apps found on the Cozy')
        return null
      }
      const app = claudyInfos.apps.find(
        a => a.attributes.slug === action.link.appSlug
      )
      if (app && app.links && app.links.related) {
        const appUrl = `${app.links.related}${action.link.path || ''}`
        return appUrl
      } else {
        console.warn(
          `No app with slug '${action.link.appSlug}' found on the Cozy.`
        )
        return null
      }
    } else if (action.link.type === 'external') {
      const url = t(`claudy.actions.${action.slug}.link`)
      return url
    } else {
      return null
    }
  }

  consolidateActions(claudyInfos) {
    return claudyInfos.actions.map(action => {
      switch (action.slug) {
        case DESKTOP_CLIENT_KIND:
          action.complete = !!claudyInfos.devices.find(
            d => d.client_kind === DESKTOP_CLIENT_KIND
          )
          break
        case MOBILE_CLIENT_KIND:
          action.complete = !!claudyInfos.devices.find(
            d => d.client_kind === MOBILE_CLIENT_KIND
          )
          break
        case CLAUDY_ACTION_GATHER:
          action.complete = !!claudyInfos.accounts.length
          break
        default:
          action.complete = false
          break
      }
      return action
    })
  }

  selectAction(action) {
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
    if (
      this.state.selectedAction &&
      this.state.selectedAction.slug === action.slug
    ) {
      this.setState({ openedAction: true })
    } else {
      this.setState({ selectedAction: action, openedAction: true })
    }
  }

  trackActionLink(action) {
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

  goBack(alert) {
    this.setState({ openedAction: false })

    if (alert) {
      this.setState({ alert })
      // In case of alert, we reset it after 30" to make it disappear
      setTimeout(() => {
        this.setState({ alert: null })
        this.resizeDefaultClaudy()
      }, 30 * 1000)
    }
  }

  resizeClaudy(height) {
    const { service } = this.props
    const { alert } = this.state // to add automatically extra size for alert
    service.instance &&
      typeof service.instance.resizeClient === 'function' &&
      service.instance.resizeClient(
        {
          height: height + (alert ? 44 : 0)
        },
        '.2s ease-out'
      )
  }

  resizeDefaultClaudy() {
    const { claudyInfos } = this.props
    const actionsLength = claudyInfos.actions.length
    // actions.length * action{height} (64px) + header{height} (56px) + content{padding} (2 * 8px)
    this.resizeClaudy(
      (actionsLength <= 5 ? actionsLength : 5) * 64 + 56 + 2 * 8
    )
  }

  render() {
    const {
      t,
      claudyInfos,
      onClose,
      emailStatus,
      sendMessageToSupport,
      service
    } = this.props
    const { selectedAction, openedAction, alreadyResized, alert } = this.state
    const selectedActionUrl = this.computeSelectedActionUrl(selectedAction)
    const claudyActions = this.consolidateActions(claudyInfos)
    let SelectedActionComponent = null
    if (selectedAction && selectedAction.component) {
      SelectedActionComponent = require(`./ClaudyActionComponents${
        selectedAction.component
      }.jsx`).default
    }
    if (!alreadyResized && claudyInfos.actions.length && service.instance) {
      this.resizeDefaultClaudy() // very first resizing
      this.setState({ alreadyResized: true })
    }
    return (
      <div
        className={`coz-service-claudy ${
          openedAction ? 'coz-claudy-menu--action-selected' : ''
        }`}
      >
        <header className="coz-claudy-menu-header">
          <h2 className="coz-claudy-menu-title">{t('claudy.title')}</h2>
          <button className="coz-btn-close" onClick={onClose}>
            <Icon icon="cross" color="#95999D" width="24" height="24" />
          </button>
          <button
            className="coz-claudy-menu-header-back-button"
            onClick={() => this.goBack()}
          />
        </header>
        {alert && (
          <div
            key="coz-claudy-menu-action-description-success"
            className="coz-claudy-menu-action-description-success"
          >
            {alert}
          </div>
        )}
        <div className="coz-claudy-menu-content-wrapper">
          <div
            className="coz-claudy-menu-content"
            ref={container => {
              this.claudyContainer = container
            }}
          >
            <div className="coz-claudy-menu-actions-list">
              {claudyActions.map((action, index) => (
                <a
                  className="coz-claudy-menu-action"
                  data-complete={action.complete}
                  onClick={() => this.selectAction(action)}
                  key={index}
                >
                  <img
                    className="coz-claudy-menu-action-icon"
                    src={this.getIcon(action.icon)}
                  />
                  <p className="coz-claudy-menu-action-title">
                    {t(`claudy.actions.${action.slug}.title`)}
                  </p>
                  {action.complete &&
                    action.slug !== CLAUDY_ACTION_GATHER && (
                      <img
                        className="coz-claudy-menu-action-check"
                        src={this.checkIcon}
                      />
                    )}
                  {action.complete &&
                    action.slug === CLAUDY_ACTION_GATHER && (
                      <div className="coz-claudy-menu-action-count-wrapper">
                        <span className="coz-claudy-menu-action-count">
                          {claudyInfos.accounts.length}
                        </span>
                      </div>
                    )}
                </a>
              ))}
            </div>
            {selectedAction &&
              !SelectedActionComponent && (
                <ClaudyAction
                  action={selectedAction}
                  iconSrc={this.getIcon(selectedAction.icon)}
                  url={selectedActionUrl}
                  onActionClick={() => this.trackActionLink(selectedAction)}
                />
              )}
            {SelectedActionComponent && (
              <SelectedActionComponent
                action={selectedAction}
                iconSrc={this.getIcon(selectedAction.icon)}
                url={selectedActionUrl}
                onActionClick={() => this.trackActionLink(selectedAction)}
                onSuccess={this.goBack}
                container={this.claudyContainer}
                resizeIntent={height => this.resizeClaudy(height)}
                resizeIntentDefault={() => this.resizeDefaultClaudy()}
                opened={openedAction}
                emailStatus={emailStatus}
                sendMessageToSupport={sendMessageToSupport}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default translate()(Claudy)
