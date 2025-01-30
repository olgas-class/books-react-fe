import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import SingleBookPage from "./pages/SingleBookPage";
import CreateBookPage from "./pages/CreateBookPage";
import { AlertProvider } from "./context/AlertContext";
import { GlobalContextProvider } from "./context/GlobalContext";

function App() {
  return (
    <>
      <GlobalContextProvider>
        <AlertProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/books">
                  <Route path="" element={<BooksPage />} />
                  <Route path=":slug" element={<SingleBookPage />} />
                  <Route path="create" element={<CreateBookPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AlertProvider>
      </GlobalContextProvider>
    </>
  );
}

export default App;
