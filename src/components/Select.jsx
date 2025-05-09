import React from 'react'

import SelectBox from 'cozy-ui/transpiled/react/SelectBox'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

import Field from '@/components/Field'

export default translate()(props => {
  const { fieldProps, ...restProps } = props
  return (
    <Field {...fieldProps}>
      <SelectBox {...restProps} fullwidth />
    </Field>
  )
})
