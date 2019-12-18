import React from 'react'
import cx from 'classnames'
import InlineCard from 'cozy-ui/react/InlineCard'

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

const tokenize = passphrase => {
  const tokens = passphrase.split('').map(char => ({
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

const PassphraseExample = props => {
  const { passphrase, ...rest } = props
  const tokens = tokenize(passphrase)

  return (
    <InlineCard {...rest}>
      {tokens.map((token, index) => (
        <Token key={`${token.char}-${token.type}-${index}`} token={token} />
      ))}
    </InlineCard>
  )
}

export default PassphraseExample
