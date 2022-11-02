// 获取 token
export const getItem = () => {
  return localStorage.getItem('TOKEN')
}

// 存储 token
export const setItem = (token) => {
  return localStorage.setItem('TOKEN', token)
}

// 清除 token
export const removeItem = () => {
  return localStorage.removeItem('TOKEN')
}
