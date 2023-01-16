import React from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Alert from 'cozy-ui/transpiled/react/Alert'

import withAllLocales from 'lib/withAllLocales'
import { displayPermissions } from 'components/Permissions/helpers/permissionsHelper'

const AccessRightsDetailsSection = ({ modalData, slug, t }) => {
  const displayedPermissions = modalData && displayPermissions(modalData.verbs)

  const hasReadPermissions =
    displayedPermissions === 'Permissions.read' ||
    displayedPermissions === 'Permissions.readAndWrite'
  const hasWritePermissions =
    displayedPermissions === 'Permissions.write' ||
    displayedPermissions === 'Permissions.readAndWrite'

  return (
    <>
      <Typography variant="h5" className="">
        {modalData
          ? modalData.isRemoteDoctypes
            ? t('Permissions.exit_right', {
                app: slug.toUpperCase(),
                doctype: modalData.title.toLowerCase()
              })
            : t('Permissions.access_right', {
                app: slug.toUpperCase(),
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
              app: slug.toUpperCase()
            })}
      </Alert>
      <Typography variant="h5" className="u-mt-1-half">
        {t('Permissions.right_reason', { app: slug.toUpperCase() })}
      </Typography>
      <Typography className="u-mt-half">{modalData?.description}</Typography>
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

export default withAllLocales(AccessRightsDetailsSection)
