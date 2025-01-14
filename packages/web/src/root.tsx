import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";

const user: { role: 'admin' | 'student' | 'teacher' | 'secretary' | 'manager' } = {
    role: 'student'
  };

export default function Root() {
      return (
        <>
        <Layout userRole={user.role}>
            <Outlet/>
        </Layout>
        </>
      )
}

export function Error() {
    const location = useLocation();

    return (
        <>
        <Layout userRole={user.role}>
            Aie une erreur s'est produite ! La page {location.pathname} est introuvable.
        </Layout>
        </>
      )
}