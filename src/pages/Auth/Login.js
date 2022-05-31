import { useLastSession, useSessionActions } from 'domains/Session/hooks'

import { AuthMethods } from 'domains/Session/components'
import PATHS from 'pages/paths'
import { PageWrapper } from '@qonsoll/react-design'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'

const Login = () => {
  const { t } = useTranslations()
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const lastSession = useLastSession()
  const { googleLogin } = useSessionActions()

  // [CLEAN_FUNCTIONS]
  const redirectToLoginWithEmail = () => {
    lastSession && lastSession.email
      ? history.push(`${PATHS.UNAUTHENTICATED.LOGIN_WITH_EMAIL}?email`)
      : history.push(PATHS.UNAUTHENTICATED.LOGIN_WITH_EMAIL)
  }

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: lastSession
          ? t('Вітаємо знову!') + ' 👋'
          : t('Привіт, раді знайомству!') + ' 💪',
        subTitle: lastSession
          ? t(
              'Ми вже знаємо один одного',
              'Здається ми вже знаємо один оного. Оберіть один з методів авторизації.'
            )
          : t('chooseMethodBelow', 'Обери один з методів авторизації.'),
        marginBottom: 40
      }}
      contentWidth={['100%', '100%', 400]}
    >
      <AuthMethods
        authTypeText="Авторизація"
        googleAuth={googleLogin}
        redirectToFormWithEmail={redirectToLoginWithEmail}
        authSwitchText={t('Не маєш акаунту') + '?'}
        authSwitchLinktext={t('Реєстрація')}
        authSwitchPath={PATHS.UNAUTHENTICATED.SIGNUP}
        lastSession={lastSession}
      />
    </PageWrapper>
  )
}

export default Login
