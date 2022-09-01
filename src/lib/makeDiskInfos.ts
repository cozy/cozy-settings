import { DiskInfos, DiskInfosRaw } from 'lib/types'

const Gigabyte = 1073741824

const FallbackQuota = Gigabyte * 100

const convertBytesToGiB = (bytes: number): number => bytes / Math.pow(1024, 3)

const formatDecimals = (value: number, fractionDigits = 2): string =>
  `${value % 1 ? value.toFixed(fractionDigits) : value}`

const computeDiskInfos = (
  usage: number,
  quota = FallbackQuota
): DiskInfosRaw => ({
  diskQuota: convertBytesToGiB(quota),
  diskUsage: convertBytesToGiB(usage),
  percentUsage: (usage / quota) * 100
})

const makeDiskInfos = (
  usage: number | string,
  quota?: number | string
): DiskInfos =>
  Object.fromEntries(
    Object.entries(computeDiskInfos(+usage, quota ? +quota : undefined)).map(
      ([key, value]) =>
        key === 'percentUsage'
          ? [key, Math.round(value).toString()]
          : [[key.replace('disk', 'humanDisk')], formatDecimals(value)]
    )
  ) as DiskInfos

export { FallbackQuota, makeDiskInfos }
