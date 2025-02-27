import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UserProvider, useUser } from "./context/UserContext";
import { useEffect } from "react";
import useAuthCheck from "../../shared/src/hooks/useAuthCheck";
import { useTheme } from "./hooks/useTheme";
import { useDateFormat } from "./hooks/useDateFormat";
import { useLanguage } from "./hooks/useLanguage";

export default function Root() {
  return (
    <UserProvider>
      <InnerRoot />
    </UserProvider>
  );
}

function InnerRoot() {
  const { role } = useUser();
  return (
    <>
      <Layout userRole={role}>
        <Outlet />
      </Layout>
    </>
  );
}

export function Error() {
  return (
    <UserProvider>
      <InnerError />
    </UserProvider>
  );
}

function InnerError() {
  const location = useLocation();
  const { role } = useUser();
  const { theme, setTheme } = useTheme()
  // useAuthCheck()

  useEffect(() => {
    setTheme(theme)
    useDateFormat()
    useLanguage()
  }, [theme])

  return (
    <>
      <Layout userRole={role}>
        Aie une erreur s'est produite ! La page {location.pathname} est introuvable.
      </Layout>
    </>
  );
}
