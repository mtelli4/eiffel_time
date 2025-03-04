import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { UserProvider, useUser } from './context/UserContext'
import { useEffect, useMemo } from 'react'
import { useTheme } from '../../shared/src/hooks/useTheme'
import { useDateFormat } from '../../shared/src/hooks/useDateFormat'
import { useLanguage } from '../../shared/src/hooks/useLanguage'

export default function Root() {
  return (
    <UserProvider>
      <InnerRoot />
    </UserProvider>
  )
}

function InnerRoot() {

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}')
    } catch (error) {
      console.error('Error parsing user data:', error)
      return {}
    }
  }, [])

  return (
    <>
      <Layout userRole={user.statut}>
        <Outlet />
      </Layout>
    </>
  )
}

export function Error() {
  return (
    <UserProvider>
      <InnerError />
    </UserProvider>
  )
}

function InnerError() {
  // const location = useLocation()
  const { role } = useUser()

  const { theme, setTheme } = useTheme()
  const { dateFormat, setDateFormat } = useDateFormat()
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    setTheme(theme)
    setDateFormat(dateFormat)
    setLanguage(language)
  }, [theme, dateFormat, language])
  

  return (
    <>
      <Layout userRole={role}>
        Aie une erreur s'est produite ! La page {location.pathname} est
        introuvable.
      </Layout>
    </>
  )
}
