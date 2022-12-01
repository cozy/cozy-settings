import React from 'react'
import Page from 'components/Page'
import Tabs from 'cozy-ui/transpiled/react/Tabs'
import Tab from 'cozy-ui/transpiled/react/Tab'
import AppList from './AppList'
import DataList from './DataList/DataList'
import { routes } from 'constants/routes'
import { useParams, useNavigate } from 'react-router-dom'
import withAllLocales from '../../lib/withAllLocales'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
const TabPanel = props => {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

const PermissionsTab = ({ t }) => {
  const { page } = useParams()
  const navigate = useNavigate()
  const { isMobile, isTablet } = useBreakpoints()
  const handleChange = (event, value) => {
    return navigate(`/permissions/${value}`)
  }

  return (
    <Page
      className={isMobile || isTablet ? '' : undefined}
      withoutMarginTop={isMobile || isTablet}
    >
      <Tabs
        value={page}
        onChange={handleChange}
        segmented
        style={{ width: '20rem' }}
        className={isMobile || isTablet ? 'u-mh-half u-mt-1' : undefined}
      >
        <Tab
          value="slug"
          label={t('Permissions.applications')}
          href={`#${routes.appList}`}
          {...a11yProps(0)}
        />
        <Tab
          value="data"
          label={t('Permissions.data')}
          href={`#${routes.dataList}`}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={page} index="slug">
        <AppList />
      </TabPanel>
      <TabPanel value={page} index="data">
        <DataList />
      </TabPanel>
    </Page>
  )
}

export default withAllLocales(PermissionsTab)
