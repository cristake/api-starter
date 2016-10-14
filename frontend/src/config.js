export const baseDomain = 'http://localhost:8000/'
export const apiDomain = baseDomain + 'api'
export const loginUrl = baseDomain + 'oauth/token/'

export const getHeader = function () {
  const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
  const header = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + tokenData.access_token
  }
  return header
}
