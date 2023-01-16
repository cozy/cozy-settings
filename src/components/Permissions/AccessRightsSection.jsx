import React, { useState } from 'react'
import { NavigationListSection } from 'cozy-ui/transpiled/react/NavigationList'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import ListItemIcon, {
  mediumSize,
  largeSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import CozyLockIcon from 'cozy-ui/transpiled/react/Icons/CozyLock'
import CozyReleaseIcon from 'cozy-ui/transpiled/react/Icons/CozyRelease'
import {
  displayPermissions,
  getPermissionIconName
} from './helpers/permissionsHelper'
import withAllLocales from '../../lib/withAllLocales'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Alert from 'cozy-ui/transpiled/react/Alert'

const AccessRightsSection = ({
  sortedPermissionsByName,
  slugName,
  t,
  isRemoteDoctypes
}) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [modalData, setModalData] = useState()
  const { isMobile, isTablet } = useBreakpoints()

  const openModal = data => {
    setModalData(data)
    setModalOpened(true)
  }

  const closeModal = () => setModalOpened(false)

  const displayedPermissions = modalData && displayPermissions(modalData.verbs)

  const hasReadPermissions =
    displayedPermissions === 'Permissions.read' ||
    displayedPermissions === 'Permissions.readAndWrite'
  const hasWritePermissions =
    displayedPermissions === 'Permissions.write' ||
    displayedPermissions === 'Permissions.readAndWrite'

  if (!sortedPermissionsByName || sortedPermissionsByName.length < 1) {
    return
  }
  return (
    <div
      style={
        isMobile || isTablet
          ? { borderTop: '16px solid var(--defaultBackgroundColor)' }
          : {}
      }
    >
      <NavigationListSection>
        <ListItem>
          <ListItemIcon>
            <Icon
              icon={isRemoteDoctypes ? CozyReleaseIcon : CozyLockIcon}
              size={largeSize}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography type="body2" style={{ fontWeight: 'bold' }}>
                {isRemoteDoctypes
                  ? t('Permissions.exit_rights')
                  : t('Permissions.limited_right_access')}
              </Typography>
            }
            secondary={
              isRemoteDoctypes
                ? t('Permissions.exit_rights_secondary')
                : t('Permissions.limited_right_access_secondary')
            }
          />
        </ListItem>
        <Divider />
        {sortedPermissionsByName.map(
          ({ description, name, title, verbs, type }, index) => {
            const iconName = getPermissionIconName(type)
            return (
              <div key={name}>
                <ListItem
                  button
                  onClick={() =>
                    openModal({
                      description,
                      name,
                      title,
                      verbs,
                      type,
                      isRemoteDoctypes
                    })
                  }
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
                    primary={title}
                    secondary={t(displayPermissions(verbs))}
                  />
                  <Icon icon={RightIcon} />
                </ListItem>
                {index !== sortedPermissionsByName.length - 1 && (
                  <Divider variant="inset" />
                )}
              </div>
            )
          }
        )}
      </NavigationListSection>
      {modalOpened && (
        <Dialog
          open={true}
          onClose={closeModal}
          title={modalData?.title ? modalData.title : ''}
          content={
            <>
              <Typography variant="h5" className="">
                {modalData
                  ? modalData.isRemoteDoctypes
                    ? t('Permissions.exit_right', {
                        app: slugName.toUpperCase(),
                        doctype: modalData.title.toLowerCase()
                      })
                    : t('Permissions.access_right', {
                        app: slugName.toUpperCase(),
                        doctype: modalData.title.toLowerCase()
                      })
                  : ''}
              </Typography>
              <Alert
                severity={modalData?.isRemoteDoctypes ? 'warning' : 'success'}
                className="u-mt-half"
              >
                {modalData?.isRemoteDoctypes
                  ? t('Permissions.exit_right_description')
                  : t('Permissions.access_right_description', {
                      app: slugName.toUpperCase()
                    })}
              </Alert>
              <Typography variant="h5" className="u-mt-1-half">
                {t('Permissions.right_reason', { app: slugName.toUpperCase() })}
              </Typography>
              <Typography className="u-mt-half">
                {modalData?.description}
              </Typography>
              <Typography variant="h5" className="u-mt-1-half">
                {t('Permissions.details')}
              </Typography>
              {hasReadPermissions && (
                <>
                  <Typography className="u-mt-half">
                    {t('Permissions.read_right_title')}
                  </Typography>
                  <Typography variant="caption">
                    {t('Permissions.read_right_text')}
                  </Typography>
                </>
              )}
              {hasWritePermissions && (
                <>
                  <Typography className="u-mt-half">
                    {t('Permissions.write_right_title')}
                  </Typography>
                  <Typography variant="caption">
                    {t('Permissions.write_right_text')}
                  </Typography>
                </>
              )}
            </>
          }
        />
      )}
    </div>
  )
}

export default withAllLocales(AccessRightsSection)
