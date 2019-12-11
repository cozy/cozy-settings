import React from 'react'
import cx from 'classnames'
import styles from 'styles/passphrase'

const alphaRegexp = /^[a-z]$/i
const numberRegexp = /^[0-9]$/

const isAlphaCharacter = char => alphaRegexp.test(char)
const isNumberCharacter = char => numberRegexp.test(char)

const tokenTypes = {
  alpha: 'alpha',
  number: 'number',
  special: 'special'
}

const getTokenType = char => {
  if (isAlphaCharacter(char)) {
    return tokenTypes.alpha
  }

  if (isNumberCharacter(char)) {
    return tokenTypes.number
  }

  return tokenTypes.special
}

const tokenize = password => {
  const tokens = password.split('').map(char => ({
    char,
    type: getTokenType(char)
  }))

  return tokens
}

const Token = props => {
  const { token, className, ...rest } = props

  return (
    <span
      className={cx(
        {
          'u-dodgerBlue': token.type === tokenTypes.number,
          'u-lightishPurple': token.type === tokenTypes.special
        },
        className
      )}
      {...rest}
    >
      {token.char}
    </span>
  )
}

const PasswordExample = props => {
  const { password, ...rest } = props
  const tokens = tokenize(password)

  return (
    <span className={styles['coz-passphrase-example']} {...rest}>
      {tokens.map((token, index) => (
        <Token key={`${token.char}-${token.type}-${index}`} token={token} />
      ))}
    </span>
  )
}

export default PasswordExample
