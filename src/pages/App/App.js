import { Redirect, Route, Switch } from 'react-router-dom'
import { StudentsAll, StudentShow, StudentCreate, StudentEdit } from './Student'
import { MarksAll, MarkShow, MarkCreate, MarkEdit } from './Mark'
import { GroupsAll, GroupShow, GroupCreate, GroupEdit } from './Group'
import { LessonsAll, LessonShow, LessonCreate, LessonEdit } from './Lesson'

import { BoilerplateLayout } from 'components'
import Dashboard from './Dashboard/Dashboard'
import { UserShow } from './User'
import PATHS from '../paths'
import { SemesterProvider } from 'contexts/SemesterContext'

const {
  DASHBOARD,
  USER_SHOW,
  STUDENTS_ALL,
  STUDENT_SHOW,
  STUDENT_CREATE,
  STUDENT_EDIT,
  MARKS_ALL,
  MARK_SHOW,
  MARK_CREATE,
  MARK_EDIT,
  GROUPS_ALL,
  GROUP_SHOW,
  GROUP_CREATE,
  GROUP_EDIT,
  LESSONS_ALL,
  LESSON_SHOW,
  LESSON_CREATE,
  LESSON_EDIT
} = PATHS.AUTHENTICATED

const routes = [
  { key: 'DASHBOARD', path: DASHBOARD, component: Dashboard, exact: true },
  { key: 'USER_SHOW', path: USER_SHOW, component: UserShow, exact: true },
  {
    key: 'STUDENTS_ALL',
    path: STUDENTS_ALL,
    component: StudentsAll,
    exact: true
  },
  {
    key: 'STUDENT_SHOW',
    path: STUDENT_SHOW,
    component: StudentShow,
    exact: true
  },
  {
    key: 'STUDENT_CREATE',
    path: STUDENT_CREATE,
    component: StudentCreate,
    exact: true
  },
  {
    key: 'STUDENT_EDIT',
    path: STUDENT_EDIT,
    component: StudentEdit,
    exact: true
  },
  { key: 'MARKS_ALL', path: MARKS_ALL, component: MarksAll, exact: true },
  { key: 'MARK_SHOW', path: MARK_SHOW, component: MarkShow, exact: true },
  { key: 'MARK_CREATE', path: MARK_CREATE, component: MarkCreate, exact: true },
  { key: 'MARK_EDIT', path: MARK_EDIT, component: MarkEdit, exact: true },
  { key: 'GROUPS_ALL', path: GROUPS_ALL, component: GroupsAll, exact: true },
  { key: 'GROUP_SHOW', path: GROUP_SHOW, component: GroupShow, exact: true },
  {
    key: 'GROUP_CREATE',
    path: GROUP_CREATE,
    component: GroupCreate,
    exact: true
  },
  { key: 'GROUP_EDIT', path: GROUP_EDIT, component: GroupEdit, exact: true },
  { key: 'LESSONS_ALL', path: LESSONS_ALL, component: LessonsAll, exact: true },
  { key: 'LESSON_SHOW', path: LESSON_SHOW, component: LessonShow, exact: true },
  {
    key: 'LESSON_CREATE',
    path: LESSON_CREATE,
    component: LessonCreate,
    exact: true
  },
  { key: 'LESSON_EDIT', path: LESSON_EDIT, component: LessonEdit, exact: true }
]

const App = () => {
  return (
    <BoilerplateLayout>
      <Switch>
        {routes.map((routeProps) => (
          <Route key={routeProps.key} {...routeProps} />
        ))}
        <Redirect to={PATHS.SERVICE.NOT_FOUND} />
      </Switch>
    </BoilerplateLayout>
  )
}

export default App
