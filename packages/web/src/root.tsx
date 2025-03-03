import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { UserProvider, useUser } from './context/UserContext'
import { useEffect, useMemo } from 'react'
import { useTheme } from "./hooks/useTheme";
import { useDateFormat } from "./hooks/useDateFormat";
import { useLanguage } from "./hooks/useLanguage";

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

  // const { theme, setTheme } = useTheme()
  // useEffect(() => {
  //   setTheme(theme)
  //   useDateFormat()
  //   useLanguage()
  // }, [theme])

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
  // const { theme, setTheme } = useTheme()

  return (
    <>
      <Layout userRole={role}>
        Aie une erreur s'est produite ! La page {location.pathname} est
        introuvable.
      </Layout>
    </>
  )
}
