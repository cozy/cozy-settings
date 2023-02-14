import React from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Alert from 'cozy-ui/transpiled/react/Alert'

import withAllLocales from 'lib/withAllLocales'
import { displayPermissions } from 'components/Permissions/helpers/permissionsHelper'

const PermissionDetailsModalContent = ({
  slug,
  verbs,
  description,
  isRemoteDoctypes,
  title,
  t
}) => {
  const displayedPermissions = displayPermissions(verbs)

  const hasReadPermissions =
    displayedPermissions === 'Permissions.read' ||
    displayedPermissions === 'Permissions.readAndWrite'
  const hasWritePermissions =
    displayedPermissions === 'Permissions.write' ||
    displayedPermissions === 'Permissions.readAndWrite'

  return (
    <>
      <Typography variant="h5" className="">
        {isRemoteDoctypes
          ? t('Permissions.exit_right', {
              app: slug.toUpperCase(),
              doctype: title.toLowerCase()
            })
          : t('Permissions.access_right', {
              app: slug.toUpperCase(),
              doctype: title.toLowerCase()
            })}
      </Typography>
      <Alert
        severity={isRemoteDoctypes ? 'warning' : 'success'}
        className="u-mt-half"
      >
        {isRemoteDoctypes
          ? t('Permissions.exit_right_description')
          : t('Permissions.access_right_description', {
              app: slug.toUpperCase()
            })}
      </Alert>
      <Typography variant="h5" className="u-mt-1-half">
        {t('Permissions.right_reason', { app: slug.toUpperCase() })}
      </Typography>
      <Typography className="u-mt-half">{description}</Typography>
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
  )
}

export default withAllLocales(PermissionDetailsModalContent)
