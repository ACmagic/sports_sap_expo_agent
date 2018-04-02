export const handleAuthLogin = token => ({ type: 'AUTH_LOGIN', payload: token })
export const handleAuthLogout = () => ({ type: 'AUTH_LOGOUT' })
