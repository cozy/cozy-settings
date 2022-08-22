import React from 'react'
import { Navigate } from 'react-router-dom'

export const IntentRedirect = ({ location }) => {
  const queryString = !!location && location.search
  const query =
    queryString &&
    queryString
      .substring(1)
      .split('&')
      .reduce((accumulator, keyValue) => {
        const splitted = keyValue.split('=')
        accumulator[splitted[0]] = splitted[1] || true
        return accumulator
      }, {})

  if (query.step) {
    return <Navigate to={`/${query.step}`} />
  }
  return <Navigate to="/profile" />
}

export default IntentRedirect
