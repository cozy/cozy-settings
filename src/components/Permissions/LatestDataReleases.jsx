import React, { useState } from 'react'
import { NavigationListSection } from 'cozy-ui/transpiled/react/NavigationList'
import Typography from 'cozy-ui/transpiled/react/Typography'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import ListItemIcon, {
  smallSize,
  mediumSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import RiseIcon from 'cozy-ui/transpiled/react/Icons/Rise'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import { isNotLastItem, sortDataByDate } from './helpers/permissionsHelper'
import { Dialog as DialogComponent } from 'cozy-ui/transpiled/react/CozyDialogs'
import withAllLocales from './../../lib/withAllLocales'

const LatestDataReleases = ({ queryResultRemoteRequests, slugName, t }) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [modalData, setModalData] = useState()

  const { f } = useI18n()

  const openModal = data => {
    setModalOpened(true)
    let formatedData = { ...data }
    delete formatedData._id
    delete formatedData._rev
    setModalData(formatedData)
  }

  const formatDate = ({ f, date }) => {
    return f(date, 'DD MMMM YYYY')
  }

  const handleClose = () => setModalOpened(false)

  return (
    <div>
      <NavigationListSection>
        <ListItem>
          <Typography variant="h5">
            {t('Permissions.latest_data_releases')}
          </Typography>
        </ListItem>
        <Divider />
        {sortDataByDate(queryResultRemoteRequests).map(data => {
          return (
            <div key={data.id}>
              <ListItem button onClick={() => openModal(data)}>
                <ListItemIcon>
                  <Icon
                    icon={RiseIcon}
                    size={mediumSize}
                    color="var(--warningColor)"
                    rotate={90}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={t('Permissions.monthly_statistics')}
                  secondary={formatDate({
                    f,
                    date: new Date(data.created_at)
                  })}
                />
                <ListItemSecondaryAction>
                  <Icon
                    icon={RightIcon}
                    size={smallSize}
                    className="u-mr-1"
                    style={{ color: 'var(--secondaryTextColor)' }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              {isNotLastItem(
                data.id,
                sortDataByDate(queryResultRemoteRequests)
              ) && <Divider variant="inset" />}
            </div>
          )
        })}
      </NavigationListSection>
      <DialogComponent
        open={modalOpened}
        onClose={handleClose}
        title={t('Permissions.monthly_statistics')}
        content={
          <>
            <p>
              {modalData &&
                t('Permissions.monthly_stats_phrase', {
                  app: slugName.toUpperCase(),
                  date: formatDate({
                    f,
                    date: new Date(modalData.created_at)
                  })
                })}
            </p>
            <code>
              <pre>{modalData && JSON.stringify(modalData, null, 2)}</pre>
            </code>
          </>
        }
      />
    </div>
  )
}

export default withAllLocales(LatestDataReleases)
