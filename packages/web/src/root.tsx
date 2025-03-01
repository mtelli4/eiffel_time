// web/src/root.tsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { UserProvider, useUser } from './context/UserContext'
import { useEffect, useMemo } from 'react'

export default function Root() {
  return (
    <UserProvider>
      <InnerRoot />
    </UserProvider>
  )
}

function InnerRoot() {
  // const { role } = useUser()
  // const navigate = useNavigate();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}')
    } catch (error) {
      console.error('Error parsing user data:', error)
      return {}
    }
  }, [])

  // console.log(user);

  // useEffect(() => {
  //   if (!user || Object.keys(user).length === 0) {
  //     window.location.href = '/signin'
  //   }
  // }, [user])

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
  const location = useLocation()
  const { role } = useUser()

  return (
    <>
      <Layout userRole={role}>
        Aie une erreur s'est produite ! La page {location.pathname} est
        introuvable.
      </Layout>
    </>
  )
}
