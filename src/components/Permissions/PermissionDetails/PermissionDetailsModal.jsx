import React from 'react'
import { useNavigate } from 'react-router-dom'

import { isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import useFetchJSON from 'cozy-client/dist/hooks/useFetchJSON'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import PermissionDetailsModalContent from '@/components/Permissions/PermissionDetails/PermissionDetailsModalContent'
import useAppsOrKonnectorsBySlug from '@/components/Permissions/hooks/useAppsOrKonnectorsBySlug'
import withAllLocales from '@/lib/withAllLocales'

const PermissionDetailsModal = ({ slug, permissionType, t, appName }) => {
  const navigate = useNavigate()

  const closeModal = () => {
    navigate('..')
  }

  const { isResultLoading, hasQueryFailed, result } =
    useAppsOrKonnectorsBySlug(slug)

  const { data: remoteDoctypes, ...queryResultRemoteDoctypes } = useFetchJSON(
    'GET',
    '/remote/_all_doctypes'
  )

  if (
    isResultLoading ||
    hasQueryFailed ||
    (isQueryLoading(queryResultRemoteDoctypes) &&
      !hasQueryBeenLoaded(queryResultRemoteDoctypes)) ||
    queryResultRemoteDoctypes.fetchStatus === 'error'
  )
    return null

  const permission = Object.values(result?.data.permissions).filter(
    permission => permission.type === permissionType
  )[0]

  const isRemoteDoctypes = remoteDoctypes.includes(permissionType)

  const title = t(`CozyPermissions.${permissionType}`)

  return (
    <Dialog
      open={true}
      onClose={closeModal}
      title={title}
      content={
        <PermissionDetailsModalContent
          verbs={permission.verbs}
          description={permission.description}
          isRemoteDoctypes={isRemoteDoctypes}
          title={title}
          appName={appName}
          t
        />
      }
    />
  )
}

export default withAllLocales(PermissionDetailsModal)
