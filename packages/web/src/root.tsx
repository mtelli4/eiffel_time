// web/src/root.tsx
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UserProvider, useUser } from "./context/UserContext";

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
  const location = useLocation();
  const { role } = useUser();

  return (
    <>
      <Layout userRole={role}>
        Aie une erreur s'est produite ! La page {location.pathname} est introuvable.
      </Layout>
    </>
  );
}
