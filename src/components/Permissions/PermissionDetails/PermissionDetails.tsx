import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

import PermissionDetailsModal from 'components/Permissions/PermissionDetails/PermissionDetailsModal'

const PermissionDetails: FunctionComponent = () => {
  const { slug, permissionType } = useParams()

  if (slug && permissionType) {
    return (
      <PermissionDetailsModal slug={slug} permissionType={permissionType} />
    )
  }

  return null
}

export default PermissionDetails
