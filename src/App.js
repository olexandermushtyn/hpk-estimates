import { GDPRPopup } from './domains/App/components'
import Navigator from './pages/Navigator'
import { TranslationsProvider } from 'contexts/Translation'
import { SemesterProvider } from 'contexts/SemesterContext'

/**
 * It returns a React component that renders a TranslationsProvider and a Navigator.
 * @returns The <TranslationsProvider> component.
 */
function App() {
  return (
    <SemesterProvider>
      <TranslationsProvider>
        <Navigator />
        <GDPRPopup />
      </TranslationsProvider>
    </SemesterProvider>
  )
}

export default App
