import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/course',
  component: Layout,
  meta: {
    title: '课程管理',
    requiresAuth: true
  },
  children: [
    {
      path: '',
      name: 'course',
      component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
    },
    {
      path: 'create',
      name: 'course-create',
      component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue')
    },
    {
      path: ':courseId/edit',
      name: 'course-edit',
      component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
      props: true
    },
    {
      path: ':courseId/section',
      name: 'course-section',
      component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
      props: true
    },
    {
      path: ':courseId/video',
      name: 'course-video',
      component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue'),
      props: true
    }
  ]
}

export default routes
