import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

import { getAppDisplayName } from 'cozy-client/dist/models/applications'

import PermissionDetailsModal from '@/components/Permissions/PermissionDetails/PermissionDetailsModal'
import useAppsOrKonnectorsBySlug from '@/components/Permissions/hooks/useAppsOrKonnectorsBySlug'

const PermissionDetails: FunctionComponent = () => {
  const { slug, permissionType } = useParams()
  const { isResultLoading, hasQueryFailed, result } =
    useAppsOrKonnectorsBySlug(slug)
  if (
    !isResultLoading &&
    !hasQueryFailed &&
    result?.data &&
    slug &&
    permissionType
  ) {
    return (
      <PermissionDetailsModal
        slug={slug}
        permissionType={permissionType}
        // @ts-expect-error unsafe assignment
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        appName={getAppDisplayName(result.data)}
      />
    )
  }

  return null
}

export default PermissionDetails
