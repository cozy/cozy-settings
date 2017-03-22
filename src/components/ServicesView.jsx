import tableStyles from '../styles/table'
import viewStyles from '../styles/view'
import classNames from 'classnames'

// @TODO Do a better import for images
import dartyLogo from '../assets/accounts/darty.svg'
import edfLogo from '../assets/accounts/edf.svg'
import maifLogo from '../assets/accounts/maif.svg'
import freeLogo from '../assets/accounts/free.svg'
import trainlineLogo from '../assets/accounts/trainline.svg'
// @TODO

import Modal from 'cozy-ui/react/Modal'

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

// import Loading from './Loading'

class ServicesView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      soonModal: false
    }
  }
  toggleModal () {
    this.setState({
      soonModal: !this.state.soonModal
    })
  }
  render ({ t }, { soonModal }) {
    return (
      <div role='contentinfo' onclick={this.toggleModal.bind(this)}>
        {soonModal && <Modal
          title={t('soon.title')}
          description={t('soon.description')}
         />}
        <h2 className={viewStyles['set-view-title']}>{t('ServicesView.title')}</h2>
        <div className={classNames(tableStyles['coz-table'], viewStyles['set-soon'])}>
          <div className={classNames(tableStyles['coz-table-head'], tableStyles['coz-table-row'])}>
            <div className={classNames(tableStyles['coz-table-header'], tableStyles['set-table-service'])}>{ t('ServicesView.head_services') }</div>
            <div className={classNames(tableStyles['coz-table-header'], tableStyles['set-table-account'])}>{ t('ServicesView.head_account') }</div>
            <div className={classNames(tableStyles['coz-table-header'], tableStyles['set-table-sync'])}>{ t('ServicesView.head_sync') }</div>
            <div className={classNames(tableStyles['coz-table-header'], tableStyles['set-table-status'])}>{ t('ServicesView.head_status') }</div>
          </div>
          <div className={classNames(tableStyles['coz-table-body'], tableStyles['set-table-services'])}>
            <div>
              <div className={tableStyles['coz-table-row']}>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-service'], tableStyles['coz-table-primary'])}>
                  <span className={classNames(viewStyles['set-account-logo'])} style='background-color: #ee1716;'>
                    <img src={dartyLogo} alt='Darty logo' style='border-radius: 50%' />
                  </span>
                  DARTY
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-account'])}>
                  john.smith@mail.com
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-sync'])}>
                  <time datetime=''>22 feb 2017, 2:03PM</time>
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-status'])}>—</div>
              </div>
              <div className={tableStyles['coz-table-row']}>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-service'], tableStyles['coz-table-primary'])}>
                  <span className={classNames(viewStyles['set-account-logo'])} style='background-color: #ff5800;'>
                    <img src={edfLogo} alt='EDF logo' />
                  </span>
                  EDF
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-account'])}>
                  927421521512623
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-sync'])}>
                  <time datetime=''>24 feb 2017, 8:13PM</time>
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-status'])}>—</div>
              </div>
              <div className={tableStyles['coz-table-row']}>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-service'], tableStyles['coz-table-primary'])}>
                  <span className={classNames(viewStyles['set-account-logo'])} style='background-color: #cd1e25;'>
                    <img src={freeLogo} alt='Free logo' />
                  </span>
                  Free
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-account'])}>
                  19283484
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-sync'])}>
                  <time datetime=''>03 feb 2017, 9:39AM</time>
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-status'])}>—</div>
              </div>
              <div className={tableStyles['coz-table-row']}>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-service'], tableStyles['coz-table-primary'])}>
                  <span className={classNames(viewStyles['set-account-logo'])} style='background-color: #007856;'>
                    <img src={maifLogo} alt='MAIF logo' />
                  </span>
                  MAIF
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-account'])}>
                  08SF72841
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-sync'])}>
                  <time datetime=''>21 feb 2017, 9:31AM</time>
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-status'])}>—</div>
              </div>
              <div className={tableStyles['coz-table-row']}>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-service'], tableStyles['coz-table-primary'])}>
                  <span className={classNames(viewStyles['set-account-logo'])} style='background-color: #3fd6b5;'>
                    <img src={trainlineLogo} alt='Trainline logo' />
                  </span>
                  Trainline EU
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-account'])}>
                  john.smith@mail.com
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-sync'])}>
                  <time datetime=''>03 jan 2017, 11:48AM</time>
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-status'])}>
                  <span className='coz-error coz-error--warning'>Unsynchronised</span>
                </div>
              </div>
              <p className={viewStyles['set-account-more']}><a href='#'>Access the whole list of services here →</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default translate()(ServicesView)
