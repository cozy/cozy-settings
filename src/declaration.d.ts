declare module 'cozy-client/dist/models/instance' {
  export function makeDiskInfos(
    usage: number | string,
    quota?: number | string
  ): import('cozy-client/types/models/instance').DiskInfos
}
