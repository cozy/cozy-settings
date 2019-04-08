import React from 'react'
import styles from 'styles/fields'
import { translate } from 'cozy-ui/react/I18n'
import Field from 'components/Field'
import SelectBox from 'cozy-ui/react/SelectBox'

export default translate()(props => {
  const { fieldProps, ...restProps } = props
  return (
    <Field {...fieldProps} className={styles['set-field-select']}>
      <SelectBox {...restProps} fullwidth />
    </Field>
  )
})
