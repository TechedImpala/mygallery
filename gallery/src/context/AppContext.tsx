import { createContext, useContext } from "react";

const AppContext = createContext({});

interface IAppProviderProps {}

const AppProvider: React.FC = ({ children }) => {
  const;

  return (
    <AppContext.Provider value={filesResult}>{children}</AppContext.Provider>
  );
};

export const useAppContext = useContext(AppContext);

export default AppProvider;
