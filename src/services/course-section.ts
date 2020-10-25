/**
 * 课程章节相关请求模块
 */

import request from '@/utils/request'

export const getSectionAndLesson = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}
