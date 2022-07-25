import React from 'react'

import { APPS_DOCTYPE } from 'doctypes'
import { Q, useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import { useI18n } from 'cozy-ui/transpiled/react'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { withRouter, Link } from 'react-router-dom'
import PERMISSIONS_ICONS from '../config/permissionsIcons.json'

const PermissionsApplication = ({ match }) => {
  const { t } = useI18n()
  const appName = match.params.app

  const test = PERMISSIONS_ICONS['io.cozy.contacts']

  const queryResult = useQuery(
    Q(APPS_DOCTYPE).getById('io.cozy.apps/' + appName),
    {
      as: 'io.cozy.apps/' + appName
    }
  )

  console.log({ queryResult })

  return (
    <Page narrow>
      {isQueryLoading(queryResult) && !hasQueryBeenLoaded(queryResult) ? (
        <Spinner size="large" className="u-flex u-flex-justify-center u-mt-1" />
      ) : queryResult.fetchStatus === 'failed' ? (
        <Typography variant="body1" className="u-mb-1-half">
          {t('Permissions.failedRequest')}
        </Typography>
      ) : (
        <div>
          <PageTitle>{appName.toUpperCase()}</PageTitle>
          <List dense={true}>
            {Object.entries(queryResult.data[0].attributes.permissions).map(
              ([key, value]) => (
                <ListItem key={key} button>
                  <Link
                    to={`/permissions/${appName}/${key}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItemIcon>
                      {console.log(
                        'CONTACTS ICON ===> ',
                        PERMISSIONS_ICONS['io.cozy.contacts']
                      )}
                      {console.log(
                        `assets/icons/permissions-icons/${PERMISSIONS_ICONS['io.cozy.contacts']}.svg`
                      )}
                      <Icon
                        // icon={`assets/icons/permissions-icons/${PERMISSIONS_ICONS['io.cozy.contacts']}.svg`}
                        icon={
                          require(`assets/icons/permissions-icons/${PERMISSIONS_ICONS['io.cozy.contacts']}.svg`)
                            .default
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${value.type} : ${
                        value.verbs ? value.verbs.join(' / ') : 'ALL'
                      }`}
                    />
                  </Link>
                </ListItem>
              )
            )}
          </List>
        </div>
      )}
    </Page>
  )
}

export default withRouter(PermissionsApplication)
