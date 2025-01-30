import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { useGlobalContext } from "../context/GlobalContext";
import Alert from "../components/Alert";

function AppLayout() {
  const {isLoading} = useGlobalContext();

  return (
    <>
      <AppHeader />
      {
        isLoading && <div>Loading...</div>
      }

      <Alert />
      

      <main className="container">
        <Outlet />
      </main>
      <AppFooter />
    </>
  );
}

export default AppLayout;
