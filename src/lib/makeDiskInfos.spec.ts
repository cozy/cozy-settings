import { makeDiskInfos } from './makeDiskInfos'

it('computes disk percent with a quota', () => {
  expect(makeDiskInfos('0', '5368709120')).toStrictEqual({
    humanDiskQuota: '5',
    humanDiskUsage: '0',
    percentUsage: '0'
  })
  expect(makeDiskInfos('115600793', '5000000000')).toStrictEqual({
    humanDiskQuota: '4.66',
    humanDiskUsage: '0.11',
    percentUsage: '2'
  })
  expect(makeDiskInfos('22115600793', '90000000000')).toStrictEqual({
    humanDiskQuota: '83.82',
    humanDiskUsage: '20.60',
    percentUsage: '25'
  })
  expect(makeDiskInfos('5000000000', '5000000000')).toStrictEqual({
    humanDiskQuota: '4.66',
    humanDiskUsage: '4.66',
    percentUsage: '100'
  })
  expect(makeDiskInfos('75000000000', '107374182400')).toStrictEqual({
    humanDiskQuota: '100',
    humanDiskUsage: '69.85',
    percentUsage: '70'
  })
})

it('computes disk percent without a quota', () => {
  expect(makeDiskInfos('1156007930', '')).toStrictEqual({
    humanDiskQuota: '100',
    humanDiskUsage: '1.08',
    percentUsage: '1'
  })
  expect(makeDiskInfos('0', undefined)).toStrictEqual({
    humanDiskQuota: '100',
    humanDiskUsage: '0',
    percentUsage: '0'
  })
  expect(makeDiskInfos('0', 0)).toStrictEqual({
    humanDiskQuota: '100',
    humanDiskUsage: '0',
    percentUsage: '0'
  })
})
