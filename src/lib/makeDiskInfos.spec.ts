import { makeDiskInfos } from './makeDiskInfos'

it('computes disk percent with a quota', () => {
  expect(makeDiskInfos('0', '5000000000')).toStrictEqual({
    humanDiskQuota: '5',
    humanDiskUsage: '0',
    percentUsage: '0'
  })
  expect(makeDiskInfos('115600793', '5000000000')).toStrictEqual({
    humanDiskQuota: '5',
    humanDiskUsage: '0.12',
    percentUsage: '2'
  })
  expect(makeDiskInfos('22115600793', '90000000000')).toStrictEqual({
    humanDiskQuota: '90',
    humanDiskUsage: '22.12',
    percentUsage: '25'
  })
  expect(makeDiskInfos('5000000000', '5000000000')).toStrictEqual({
    humanDiskQuota: '5',
    humanDiskUsage: '5',
    percentUsage: '100'
  })
})

it('computes disk percent without a quota', () => {
  expect(makeDiskInfos('1156007930', '')).toStrictEqual({
    humanDiskQuota: '100',
    humanDiskUsage: '1.16',
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
