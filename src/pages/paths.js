const PATHS = {
  CONFIG: {
    DEFAULT: '/auth',
    AFTER_LOGIN: '/groups',
    AFTER_LOGOUT: '/auth',
    AFTER_SIGNUP: '/groups'
  },
  UNAUTHENTICATED: {
    LOGIN: '/auth',
    LOGIN_WITH_EMAIL: '/auth/login-with-email',
    SIGNUP: '/auth/signup',
    SIGNUP_WITH_EMAIL: '/auth/sign-up-with-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CONFIRM_EMAIL: '/auth/confirm-email'
  },
  SERVICE: {
    ACCESS_DENIED: '/service/access-denied',
    GDPR: '/service/gdpr',
    NOT_FOUND: '/service/404',
    TERMS_AND_CONDITIONS: '/service/terms-and-conditions'
  },
  AUTHENTICATED: {
    DASHBOARD: '/dashboard',
    USER_SHOW: '/users/:userId',
    STUDENTS_ALL: '/students',
    STUDENT_SHOW: '/groups/:groupId/students/:studentId',
    STUDENT_CREATE: '/student/create',
    STUDENT_EDIT: '/groups/:groupId/students/:studentId/edit',
    MARKS_ALL: '/marks',
    MARK_SHOW: '/marks/:markId',
    MARK_CREATE: '/mark/create',
    MARK_EDIT: '/marks/:markId/edit',
    GROUPS_ALL: '/groups',
    GROUP_SHOW: '/groups/:groupId',
    GROUP_CREATE: '/group/create',
    GROUP_EDIT: '/groups/:groupId/edit',
    LESSONS_ALL: '/lessons',
    LESSON_SHOW: '/lessons/:lessonId',
    LESSON_CREATE: '/lesson/create',
    LESSON_EDIT: '/lessons/:lessonId/edit',
    EVALUATIONS_ALL: '/evaluations',
    EVALUATION_SHOW: '/evaluations/:evaluationId',
    STATUSES_ALL: '/statuses',
    STATUS_SHOW: '/statuses/:evaluationId'
  }
}

export default PATHS
