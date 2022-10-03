export interface DiskInfos {
  humanDiskQuota: string
  humanDiskUsage: string
  percentUsage: string
}

export interface DiskInfosRaw {
  diskQuota: number
  diskUsage: number
  percentUsage: number
}
