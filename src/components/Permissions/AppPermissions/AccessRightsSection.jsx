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
} from '../helpers/permissionsHelper'
import withAllLocales from '../../../lib/withAllLocales'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import AccessRightsDetailsSection from '../PermissionDetails/AccessRightsDetailsSection'

const AccessRightsSection = ({
  sortedPermissionsByName,
  slugName,
  t,
  isRemoteDoctypes
}) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [modalData, setModalData] = useState()
  const { isDesktop } = useBreakpoints()

  const openModal = data => {
    setModalData(data)
    setModalOpened(true)
  }

  const closeModal = () => setModalOpened(false)

  if (!sortedPermissionsByName || sortedPermissionsByName.length < 1) {
    return
  }
  return (
    <>
      {!isDesktop && (
        <Divider
          style={{
            height: '0.75rem',
            backgroundColor: 'var(--defaultBackgroundColor)'
          }}
        />
      )}
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
            <AccessRightsDetailsSection modalData={modalData} slug={slugName} />
          }
        />
      )}
    </>
  )
}

export default withAllLocales(AccessRightsSection)
