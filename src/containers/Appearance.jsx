import React from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import AppearanceView from '@/components/Appearance/AppearanceView'
import { buildSettingsInstanceQuery } from '@/lib/queries'

const Appearance = () => {
  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance, ...instanceQueryLeft } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  if (isQueryLoading(instanceQueryLeft)) {
    return (
      <Spinner
        className="u-pos-fixed-s"
        middle
        size="xxlarge"
        loadingType="loading"
      />
    )
  }

  return <AppearanceView instance={instance} />
}

export default Appearance
