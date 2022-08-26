import React from 'react'
import Page from 'components/Page'
import Tabs from 'cozy-ui/transpiled/react/Tabs'
import Tab from 'cozy-ui/transpiled/react/Tab'
import AppList from './AppList'
import DataList from './DataList'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider/index'
import { routes } from 'constants/routes'
import { useParams, useNavigate } from 'react-router-dom'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

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

const PermissionsTab = () => {
  const { t } = useI18n()
  const { page } = useParams()
  const navigate = useNavigate()
  const handleChange = (event, value) => navigate(`/permissions/${value}`)

  return (
    <Page narrow>
      <Tabs value={page} onChange={handleChange} segmented>
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
      <TabPanel value={page} index="slug">
        <AppList />
      </TabPanel>
      <TabPanel value={page} index="data">
        <DataList />
      </TabPanel>
    </Page>
  )
}

export default PermissionsTab
