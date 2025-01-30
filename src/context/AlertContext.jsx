import { createContext, useContext, useEffect, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const alertInitialData = {
    type: "",
    message: "",
  };

  const [alertData, setAlertData] = useState(alertInitialData);

  useEffect(() => {    
    if(alertData.message !== "") {
      setTimeout(closeAlert, 10000);
    }
  }, [alertData])

  const closeAlert = () => {
    setAlertData(alertInitialData);
  };

  const contextValue = {
    alertData,
    setAlertData,
    closeAlert,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

function useAlertContext() {
  return useContext(AlertContext);
}

export { AlertProvider, useAlertContext };
