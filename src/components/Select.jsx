import React from 'react'
import styles from 'styles/fields.styl'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Field from 'components/Field'
import SelectBox from 'cozy-ui/transpiled/react/SelectBox'

export default translate()(props => {
  const { fieldProps, ...restProps } = props
  return (
    <Field {...fieldProps} className={styles['set-field-select']}>
      <SelectBox {...restProps} fullwidth />
    </Field>
  )
})
