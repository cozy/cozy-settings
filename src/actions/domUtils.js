export const getStackDomain = () => {
  if (document.querySelector('[role=application]')) {
    return (
      '//' + document.querySelector('[role=application]').dataset.cozyDomain
    )
  } else {
    return null
  }
}

export const getStackToken = () => {
  if (document.querySelector('[role=application]')) {
    return document.querySelector('[role=application]').dataset.cozyToken
  } else {
    return null
  }
}
