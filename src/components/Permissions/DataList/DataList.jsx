import React from 'react'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Typography from 'cozy-ui/transpiled/react/Typography'
import NavigationList, {
  NavigationListSection
} from 'cozy-ui/transpiled/react/NavigationList'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemIcon, {
  smallSize,
  mediumSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import withAllLocales from 'lib/withAllLocales'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import { getPermissionIconName } from 'components/Permissions/helpers/permissionsHelper'
import { sortPermissionsByName } from './DataListHelpers'
import { completePermission } from '../helpers/permissionsHelper'
import { routes } from 'constants/routes'
import { isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import { buildAppsQuery, buildKonnectorsQuery } from 'lib/queries'
import { useQuery } from 'cozy-client'

const DataList = ({ t }) => {
  const appsQuery = buildAppsQuery()
  const queryResultApps = useQuery(appsQuery.definition, appsQuery.options)
  const konnectorsQuery = buildKonnectorsQuery()
  const queryResultKonnectors = useQuery(
    konnectorsQuery.definition,
    konnectorsQuery.options
  )

  const permissionsToDisplay = completePermission(
    queryResultApps,
    queryResultKonnectors
  )

  return (
    <Page narrow>
      <PageTitle>{t('Permissions.data')}</PageTitle>
      {(isQueryLoading(queryResultApps) ||
        isQueryLoading(queryResultKonnectors)) &&
      (!hasQueryBeenLoaded(queryResultApps) ||
        !hasQueryBeenLoaded(queryResultKonnectors)) ? (
        <Spinner size="large" className="u-flex u-flex-justify-center u-mt-1" />
      ) : queryResultApps.fetchStatus === 'failed' ||
        queryResultKonnectors.fetchStatus === 'failed' ? (
        <Typography variant="body1" className="u-mb-1-half">
          {t('Permissions.failedRequest')}
        </Typography>
      ) : (
        <NavigationList>
          <NavigationListSection>
            {sortPermissionsByName(permissionsToDisplay, t).map(
              ([key, slugs]) => {
                const iconName = getPermissionIconName(key)
                return (
                  <React.Fragment key={key}>
                    <ListItem
                      button
                      component="a"
                      href={`/#${routes.dataList}/${key}`}
                    >
                      <ListItemIcon>
                        <Icon
                          icon={
                            require(`cozy-ui/transpiled/react/Icons/${iconName}`)
                              .default
                          }
                          size={mediumSize}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('CozyPermissions.' + key)}
                        secondary={t('Permissions.numberOfApplications', {
                          smart_count: slugs.length
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
                    <Divider variant="inset" />
                  </React.Fragment>
                )
              }
            )}
          </NavigationListSection>
        </NavigationList>
      )}
    </Page>
  )
}

export default withAllLocales(DataList)
