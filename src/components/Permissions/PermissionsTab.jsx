import React, { useState } from 'react'
import Page from 'components/Page'
import { Tabs, Tab } from 'cozy-ui/transpiled/react/MuiTabs'
import AppList from './AppList'
import DataList from './DataList'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider/index'
import { routes } from 'constants/routes'
import { useParams } from 'react-router-dom'
import withAllLocales from '../../lib/withAllLocales'

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
  const { page: slugOrData } = useParams()
  const [tab, setTab] = useState(slugOrData)
  const handleChange = (event, value) => setTab(value)

  return (
    <Page narrow>
      <Tabs value={tab} onChange={handleChange}>
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
      <Divider className="u-mb-1" />
      <TabPanel value={tab} index="slug">
        <AppList />
      </TabPanel>
      <TabPanel value={tab} index="data">
        <DataList />
      </TabPanel>
    </Page>
  )
}

export default withAllLocales(PermissionsTab)
