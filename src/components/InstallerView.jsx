import styles from '../styles/fields'
import viewStyles from '../styles/view'
import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import classNames from 'classnames'
import Input from './Input'

class InstallerView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slug: null,
      url: null,
      isUpdate: false
    }
  }

  onChange (name, value) {
    this.state[name] = value
  }

  handleSubmit () {
    this.props.onSubmit(this.state.slug, this.state.url, this.state.isUpdate)
  }

  render ({t, onSubmit, slug, url}) {
    return (
      <div role='contentinfo'>
        <div className={classNames(viewStyles['set-view-content'], viewStyles['set-view-content--narrow'])}>
          <h2 className={viewStyles['set-view-title']}>{t('InstallView.title')}</h2>
          <div className={styles['coz-form']}>
            <Input
              onChange={this.onChange.bind(this)}
              label={t('InstallView.repository_url')}
              placeholder='git://github.com/username/repository.git#branch'
              name='url'
            />
            <Input
              onChange={this.onChange.bind(this)}
              label={t('InstallView.slug')}
              name='slug'
            />
            <Input
              onChange={this.onChange.bind(this)}
              type='checkbox'
              label={t('InstallView.update')}
              name='isUpdate'
            />
            <div className={styles['coz-form-controls']}>
              <button
                role='button'
                className={classNames('coz-btn', 'coz-btn--regular')}
                onClick={this.handleSubmit.bind(this)}
              >
                {t('InstallView.submit')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default translate()(InstallerView)
