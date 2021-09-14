import React, { useCallback, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import cx from 'classnames'

import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Button'
import Card from 'cozy-ui/transpiled/react/Card'
import CardContent from 'cozy-ui/transpiled/react/CardContent'
import CardHeader from 'cozy-ui/transpiled/react/CardHeader'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import FileTypeFolderIcon from 'cozy-ui/transpiled/react/Icons/FileTypeFolder'
import FormControl from 'cozy-ui/transpiled/react/FormControl'
import FormControlLabel from 'cozy-ui/transpiled/react/FormControlLabel'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Radio from '@material-ui/core/Radio'
import RadioGroup from 'cozy-ui/transpiled/react/RadioGroup'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { isQueryLoading, useClient, useQuery } from 'cozy-client'

import {
  ROOT_FOLDER_ID,
  buildFoldersQuery,
  toCozyDirectory,
  toCozyOAuthClient,
  updateDirectoriesExclusions
} from 'lib/deviceConfigurationHelper'

const hasQueryFailed = query => query && query.fetchStatus === 'failed'

const FoldersLoading = () => (
  <div className="u-ta-center">
    <Spinner size="xxlarge" />
  </div>
)

const FolderCheckbox = ({ onClick, checked, mixed, disabled, ...props }) => (
  <IconButton size="small" onClick={onClick}>
    <Checkbox
      checked={checked}
      mixed={mixed}
      disabled={disabled}
      disableRipple={true}
      {...props}
    />
  </IconButton>
)

const FolderRow = ({ name, partialSync, isIncluded, toggleInclusion }) => (
  <ListItem divider button onClick={toggleInclusion}>
    <ListItemIcon>
      <Icon icon={FileTypeFolderIcon} width="24" height="24" />
    </ListItemIcon>
    <ListItemText>
      <Typography variant="body1">{name}</Typography>
    </ListItemText>
    <FolderCheckbox checked={isIncluded} disabled={!partialSync} />
  </ListItem>
)

const FoldersList = ({
  folders,
  partialSync,
  excluded,
  isIncluded,
  toggleInclusion,
  toggleAllInclusion
}) => {
  const { t } = useI18n()
  const hasFolders = useMemo(() => folders.length > 0, [folders])
  const classes = useMemo(
    () => ({
      root: cx('u-ph-1-half u-fz-tiny', hasFolders && 'u-pv-half'),
      action: 'u-mv-0'
    }),
    [hasFolders]
  )
  const style = useMemo(() => ({
    backgroundColor: 'var(--defaultBackgroundColor)'
  }))

  return (
    <Card className="u-mt-1 u-p-0">
      <CardHeader
        title={
          <Typography variant="subtitle1" color="textSecondary">
            {t('configureDevice.my_cozy')}
          </Typography>
        }
        action={
          hasFolders && (
            <FolderCheckbox
              data-testid="toggle-all-inclusion"
              checked={excluded.length !== folders.length}
              mixed={excluded.length > 0 && excluded.length !== folders.length}
              disabled={!partialSync}
              onClick={toggleAllInclusion}
            />
          )
        }
        classes={classes}
        style={style}
      />
      {hasFolders ? (
        <CardContent className="u-p-0">
          <List dense>
            {folders.map(folder => (
              <FolderRow
                key={folder.id}
                name={folder.name}
                partialSync={partialSync}
                isIncluded={isIncluded(folder)}
                toggleInclusion={() => toggleInclusion(folder)}
              />
            ))}
          </List>
        </CardContent>
      ) : (
        <CardContent className="u-ta-center">
          <Icon
            icon={FileTypeFolderIcon}
            width="64"
            height="64"
            className="u-o-50"
          />
          <Typography variant="body1" color="textSecondary">
            {t('configureDevice.no_folders')}
          </Typography>
        </CardContent>
      )}
    </Card>
  )
}

const ConfigureDeviceSyncDialog = ({
  device,
  cancelAction,
  onDeviceConfigured
}) => {
  const { t } = useI18n()
  const client = useClient()

  const [loaded, setLoaded] = useState(false)
  const [wasLoading, setWasLoading] = useState(false)
  const [partialSync, setPartialSync] = useState(false)
  const [wasExcluded, setWasExcluded] = useState([])
  const [excluded, setExcluded] = useState([])
  const updateExcluded = useCallback(newExcluded => {
    setExcluded(newExcluded)
    setPartialSync(newExcluded.length !== 0)
  }, [])

  const foldersQuery = buildFoldersQuery({ currentFolderId: ROOT_FOLDER_ID })
  const queryResult = useQuery(foldersQuery.definition, foldersQuery.options)

  useMemo(() => {
    // We wait until the query has been reloaded (and thus data has been fetched
    // again) before marking our componant as loaded to avoid glitches between
    // stale data loaded from the store and new data fetched from the Cozy.
    if (!wasLoading && isQueryLoading(queryResult)) {
      setWasLoading(true)
    } else if (hasQueryFailed(queryResult)) {
      Alerter.error(t('configureDevice.load_error'))
    } else if (wasLoading && !loaded && !isQueryLoading(queryResult)) {
      const wasExcluded =
        queryResult.data && queryResult.data.length > 0
          ? queryResult.data.filter(
              folder =>
                folder.not_synchronized_on != null &&
                folder.not_synchronized_on.some(({ id }) => id === device.id)
            )
          : []

      if (wasExcluded.length > 0) {
        setWasExcluded(wasExcluded)
        updateExcluded(wasExcluded)
      } else {
        updateExcluded([])
      }
      setLoaded(true)
    }
  }, [device.id, loaded, queryResult, t, updateExcluded, wasLoading])

  const hasFolders = useMemo(
    () => queryResult.data && queryResult.data.length > 0,
    [queryResult]
  )
  const isIncluded = useCallback(
    folder => !excluded.find(f => f.id === folder.id),
    [excluded]
  )
  const toggleAllInclusion = useCallback(
    () =>
      updateExcluded(
        excluded.length === queryResult.data.length ? [] : queryResult.data
      ),
    [excluded, queryResult, updateExcluded]
  )
  const toggleInclusion = useCallback(
    folder => {
      updateExcluded(
        isIncluded(folder, excluded)
          ? excluded.concat(folder)
          : excluded.filter(f => f.id !== folder.id)
      )
    },
    [excluded, isIncluded, updateExcluded]
  )
  const onPartialSyncChange = useCallback(
    event => setPartialSync(event.target.value === 'true'),
    [setPartialSync]
  )
  const configureDevice = useCallback(async () => {
    const deviceToConfigure = toCozyOAuthClient(device)
    const foldersToExclude = partialSync
      ? excluded.filter(id => !wasExcluded.includes(id)).map(toCozyDirectory)
      : []
    const foldersToInclude = partialSync
      ? wasExcluded.filter(id => !excluded.includes(id)).map(toCozyDirectory)
      : wasExcluded.map(toCozyDirectory)

    try {
      await updateDirectoriesExclusions({
        deviceToConfigure,
        foldersToInclude,
        foldersToExclude,
        client
      })
    } catch (err) {
      return Alerter.error(t('configureDevice.configure_error'))
    }

    onDeviceConfigured()
  }, [
    device,
    partialSync,
    excluded,
    wasExcluded,
    onDeviceConfigured,
    client,
    t
  ])

  return (
    <FixedDialog
      open
      title={device.client_name}
      actions={
        <>
          <Button
            label={t('configureDevice.cancel')}
            theme="secondary"
            onClick={cancelAction}
          />
          <Button
            label={t('configureDevice.validate')}
            theme="primary"
            onClick={configureDevice}
          />
        </>
      }
      onClose={cancelAction}
      content={
        loaded ? (
          <>
            <ReactMarkdown source={t('configureDevice.description')} />
            <FormControl className="u-pl-half">
              <RadioGroup
                name="partialSync"
                value={String(partialSync)}
                onChange={onPartialSyncChange}
              >
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" />}
                  label={t('configureDevice.partialSync.disable')}
                />
                <FormControlLabel
                  value="true"
                  disabled={!hasFolders}
                  control={<Radio color="primary" />}
                  label={t('configureDevice.partialSync.enable')}
                />
              </RadioGroup>
            </FormControl>
            {queryResult.data && (
              <>
                <FoldersList
                  partialSync={partialSync}
                  folders={queryResult.data}
                  excluded={excluded}
                  isIncluded={isIncluded}
                  toggleInclusion={toggleInclusion}
                  toggleAllInclusion={toggleAllInclusion}
                />
              </>
            )}
          </>
        ) : (
          <FoldersLoading />
        )
      }
    />
  )
}

export default ConfigureDeviceSyncDialog
