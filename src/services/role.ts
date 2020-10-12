/**
 * 角色相关请求模块
 */

import request from '@/utils/request'

export const getRoles = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}
