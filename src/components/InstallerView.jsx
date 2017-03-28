import viewStyles from '../styles/view'
import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import classNames from 'classnames'

class InstallerView extends Component {
  doInstall () {
    // get the values from the fields
    const slug = document.querySelector('#slug').value
    const repourl = document.querySelector('#repourl').value
    const isupdate = document.querySelector('#isupdate').checked
    this.onSubmit(slug, repourl, isupdate)
  }

  render ({t, onSubmit}) {
    this.onSubmit = onSubmit
    return (
      <div role='contentinfo'>
        <div className={classNames(viewStyles['set-view-content'], viewStyles['set-view-content--narrow'])}>
          <h2 className={viewStyles['set-view-title']}>{t('InstallView.title')}</h2>
          <input id='slug' placeholder='slug' /><br />
          <label>{t('InstallView.update')}</label> <input id='isupdate' type='checkbox' />
          <input id='repourl' value='git://github.com/username/repository.git#branch' />
          <button onclick={this.doInstall.bind(this)}>{t('InstallView.submit')}</button>
        </div>
      </div>
    )
  }
}

export default translate()(InstallerView)
