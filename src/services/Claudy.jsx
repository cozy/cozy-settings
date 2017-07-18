
import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

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
    this.goBack = this.goBack.bind(this)
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

  selectAction (action) {
    // if just previously selected
    if (this.state.selectedAction && this.state.selectedAction.slug === action.slug) {
      this.setState({ openedAction: true })
    } else {
      this.setState({selectedAction: action, openedAction: true})
    }
  }

  goBack () {
    this.setState({ openedAction: false })
  }

  render () {
    const { t, claudyInfos, onClose } = this.props
    const { selectedAction, openedAction } = this.state
    const selectedActionUrl = this.computeSelectedActionUrl()
    this.trackActionLink = () => {}
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
              {claudyInfos.actions.map(action => (
                <a className='coz-claudy-menu-action' onClick={() => this.selectAction(action)}>
                  <img
                    className='coz-claudy-menu-action-icon'
                    src={this.getIcon(action.icon)}
                  />
                  <p className='coz-claudy-menu-action-title'>
                    {t(`claudy.actions.${action.slug}.title`)}
                  </p>
                </a>
              ))}
            </div>
            {selectedAction &&
              <div className='coz-claudy-menu-action-description'>
                <div className='coz-claudy-menu-action-description-header'>
                  <img
                    className='coz-claudy-menu-action-icon'
                    src={this.getIcon(selectedAction.icon)}
                  />
                  <p className='coz-claudy-menu-action-title'>
                    {t(`claudy.actions.${selectedAction.slug}.title`)}
                  </p>
                </div>
                <div className='coz-claudy-menu-action-description-content'>
                  <p className='coz-claudy-menu-action-description-text'>
                    {t(`claudy.actions.${selectedAction.slug}.description`)}
                  </p>
                  {selectedActionUrl
                      ? <a
                        href={selectedActionUrl}
                        role='button'
                        target={selectedAction.link.type === 'external' ? '_blank' : '_self'}
                        className='coz-btn-regular coz-claudy-menu-action-description-button'
                        onClick={() => this.trackActionLink(selectedAction)}
                      >
                        {t(`claudy.actions.${selectedAction.slug}.button`)}
                      </a>
                    : <a
                      role='button'
                      className='coz-btn-regular coz-claudy-menu-action-description-button'
                      disabled
                      title={`App ${selectedAction.slug} not found`}
                    >
                      {t(`claudy.actions.${selectedAction.slug}.button`)}
                    </a>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default translate()(Claudy)
