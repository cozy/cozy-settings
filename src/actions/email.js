/* global cozy */

import { cozyFetch } from './index'

export const SEND_EMAIL = 'SEND_EMAIL'
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS'
export const SEND_EMAIL_FAILURE = 'SEND_EMAIL_FAILURE'

const STACK_DOMAIN = document.querySelector('[role=application]').dataset.cozyDomain
const CONTACT_ADDRESS = 'contact@cozycloud.cc'

export function sendMessageToSupport (message) {
  return (dispatch, getState) => {
    dispatch({type: SEND_EMAIL})
    if (!message) {
      return dispatch({
        type: SEND_EMAIL_FAILURE,
        error: new Error('No message provided.')
      })
    }
    return sendEmail([
      {name: 'Contact', email: CONTACT_ADDRESS}
    ], [
      {type: 'text/plain', body: message}
    ], `[cozy-support] Ask support for ${STACK_DOMAIN}`)
    .then(() => {
      dispatch({type: SEND_EMAIL_SUCCESS})
    })
    .catch(error => {
      // error if no emails found
      if (error.message && error.message.match(/no email in its settings/)) {
        dispatch({
          type: SEND_EMAIL_FAILURE,
          error: { i18n: 'errors.noEmailFound' }
        })
      } else {
        dispatch({type: SEND_EMAIL_FAILURE, error})
      }
    })
  }
}

export function sendEmail (recipientsList, contentParts, subject = '', mode = 'from') {
  if (!contentParts.length) throw new Error('No email content parts found')
  if (!recipientsList.length) throw new Error('No recipients found')
  return cozy.client.jobs.create('sendmail', {
    mode,
    to: recipientsList,
    subject,
    parts: contentParts
  }, {
    priority: 10,
    max_exec_count: 1
  })
  .then(job => waitForJobFinished(job))
}

// monitor the status of the job and resolve when the email is sent
export const JOB_STATE = {
  READY: 'ready',
  ERRORED: 'errored',
  DONE: 'done'
}
function waitForJobFinished (job) {
  return new Promise((resolve, reject) => {
    let idInterval

    idInterval = setInterval(() => {
      cozyFetch('GET', `/jobs/${job._id}`)
      .then(response => {
        const job = response.data
        if (job.attributes.state === JOB_STATE.ERRORED) {
          clearInterval(idInterval)
          reject(new Error(job.attributes.error))
        }
        if (job.attributes.state === JOB_STATE.DONE) {
          clearInterval(idInterval)
          resolve(job)
        }
      })
      .catch(error => {
        clearInterval(idInterval)
        reject(error)
      })
    }, 1000)
  })
}
