import cookie from 'react-cookies'

const cookieName = 'UserInfo'
// 获取当前用户cookie
export const loginUser = () => {
  return cookie.load(cookieName)
}

// 用户登录，保存cookie
export const onLogin = (user) => {
  cookie.save(cookieName, user, { path: '/' })
}

// 用户登出，删除cookie
export const logout = () => {
  cookie.remove('userInfo')
  window.location.href = '/login'
}
