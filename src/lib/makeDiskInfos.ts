import { DiskInfos, DiskInfosRaw } from 'lib/types'

const FallbackQuota = 1e11

const convertBytesToGB = (bytes: number): number => bytes * 1e-9

const formatDecimals = (value: number, fractionDigits = 2): string =>
  `${value % 1 ? value.toFixed(fractionDigits) : value}`

const computeDiskInfos = (
  usage: number,
  quota = FallbackQuota
): DiskInfosRaw => ({
  diskQuota: convertBytesToGB(quota),
  diskUsage: convertBytesToGB(usage),
  percentUsage: (usage / quota) * 100
})

const makeDiskInfos = (
  usage: number | string,
  quota?: number | string
): DiskInfos =>
  Object.fromEntries(
    Object.entries(computeDiskInfos(+usage, quota ? +quota : undefined)).map(
      ([key, value]: [string, number]) =>
        key === 'percentUsage'
          ? [key, Math.round(value).toString()]
          : [[key.replace('disk', 'humanDisk')], formatDecimals(value)]
    )
  ) as DiskInfos

export { FallbackQuota, makeDiskInfos }
