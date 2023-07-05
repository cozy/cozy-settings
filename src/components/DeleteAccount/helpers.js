export const sendDeleteAccountRequest = async client => {
  return await client
    .getStackClient()
    .fetchJSON('POST', '/settings/instance/deletion')
}
