import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemIcon, {
  smallSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import NavigationList, {
  NavigationListSection
} from 'cozy-ui/transpiled/react/NavigationList'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import { routes } from 'constants/routes'
import Page from 'components/Page'
import useAppsOrKonnectors from 'components/Permissions/hooks/useAppsOrKonnectors'

const AppList = () => {
  const { t } = useI18n()
  const { isMobile, isTablet } = useBreakpoints()

  const { isResultLoading, hasQueryFailed, appsResult, konnectorsResult } =
    useAppsOrKonnectors()

  const toNotDisplay = ['home', 'store', 'settings']

  return (
    <Page
      className={isMobile || isTablet ? '' : 'u-maw-7'}
      withoutMarginTop={isMobile || isTablet}
    >
      {isResultLoading ? (
        <Spinner size="large" className="u-flex u-flex-justify-center u-mt-1" />
      ) : hasQueryFailed ? (
        <Typography variant="body1" className="u-mb-1-half">
          {t('Permissions.failedRequest')}
        </Typography>
      ) : (
        <NavigationList>
          <NavigationListSection>
            {appsResult.data
              .concat(konnectorsResult.data)
              .sort((a, b) => a.slug.localeCompare(b.slug))
              .filter(a => !toNotDisplay.includes(a.slug))
              .map(appOrKonnector => {
                return (
                  <div key={appOrKonnector.name}>
                    <ListItem
                      button
                      component="a"
                      href={`/#${routes.appList}/${appOrKonnector.slug}`}
                    >
                      <ListItemIcon>
                        <AppIcon app={appOrKonnector} />
                      </ListItemIcon>
                      <ListItemText
                        primary={appOrKonnector.name}
                        secondary={t('Permissions.numberOfPermissions', {
                          smart_count: Object.entries(
                            appOrKonnector.permissions
                          ).length
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
                  </div>
                )
              })}
          </NavigationListSection>
        </NavigationList>
      )}
    </Page>
  )
}

export default AppList