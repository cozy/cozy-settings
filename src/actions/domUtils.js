export const getStackDomain = () => {
  if (document.querySelector('[role=application]')) {
    const data = JSON.parse(
      document.querySelector('[role=application]').dataset.cozy
    )
    return '//' + data.domain
  } else {
    return null
  }
}

export const getStackToken = () => {
  if (document.querySelector('[role=application]')) {
    const data = JSON.parse(
      document.querySelector('[role=application]').dataset.cozy
    )
    return data.token
  } else {
    return null
  }
}
