import { PageWrapper } from '@qonsoll/react-design'
import { SignupForm } from 'domains/Session/components'
import { useHandleError } from 'hooks'
import { useSessionActions } from 'domains/Session/hooks'

const SignUpWithEmail = () => {
  // [ADDITIONAL_HOOKS]
  const onError = useHandleError()
  const { signup } = useSessionActions()

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: 'Реєєстрація через електронну пошту',
        subTitle: 'Будь ласка заповніть наступні поля',
        marginBottom: 40
      }}
      contentWidth={['100%', '100%', 400]}
    >
      <SignupForm onError={onError} signup={signup} />
    </PageWrapper>
  )
}

export default SignUpWithEmail
