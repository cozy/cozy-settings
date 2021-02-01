import styles from 'styles/fields.styl'

import React from 'react'
import classNames from 'classnames'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import CheckIcon from 'cozy-ui/transpiled/react/Icons/Check'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'
import Icon from 'cozy-ui/transpiled/react/Icon'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'

const absoluteStyle = {
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  bottom: 0,
  margin: 'auto'
}

const StatusIcon = ({ submitting, saved, className, absolute }) => {
  return (
    <span className={className} style={absolute && absoluteStyle}>
      {submitting && (
        <Spinner
          noMargin
          className={classNames(styles['set-field-loading'], 'u-mr-half')}
        />
      )}
      {saved && (
        <Icon
          icon={CheckIcon}
          className={classNames(styles['set-field-saved'], 'u-mr-half u-valid')}
        />
      )}
    </span>
  )
}

const Field = ({
  className,
  type,
  title,
  label,
  submitting,
  saved,
  errors,
  children
}) => {
  const { t } = useI18n()
  return (
    <div className={className}>
      <Typography variant="h5">{title}</Typography>
      <div>
        <Typography variant="body1" component="div" gutterBottom>
          {type === 'checkbox' ? (
            <Media>
              <Bd>
                <ReactMarkdownWrapper source={label} />
              </Bd>
              <Img>
                <StatusIcon submitting={submitting} saved={saved} />
              </Img>
              <Img>{children}</Img>
            </Media>
          ) : (
            <>
              <ReactMarkdownWrapper source={label} />
              <div className="u-pos-relative">
                <StatusIcon absolute submitting={submitting} saved={saved} />
                {children}
              </div>
            </>
          )}
        </Typography>
      </div>
      {errors &&
        errors.length !== 0 &&
        errors.map((error, index) => (
          <Typography variant="body1" className="u-error" key={index}>
            {t(error)}
          </Typography>
        ))}
    </div>
  )
}

export default Field
