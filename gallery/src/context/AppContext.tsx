import { createContext, useContext, useState } from "react";
import { ApplicationStateEnum } from "../types";
import { IAppProviderState } from "./types";

const AppContext = createContext<IAppProviderState>({
  activeState: ApplicationStateEnum.MENU,
  setActiveState: null,
  activeTopic: "",
  setActiveTopic: null,
  menuVisible: true,
  setMenuVisibility: null,
});

interface IAppProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const AppProvider = ({ children }: IAppProviderProps) => {
  const [menuVisible, setMenuVisibility] = useState(true);
  const [activeState, setActiveState] = useState<ApplicationStateEnum>(
    ApplicationStateEnum.MENU
  );

  const [activeTopic, setActiveTopic] = useState<string>("");

  const value = {
    activeState,
    setActiveState,
    activeTopic,
    setActiveTopic,
    menuVisible,
    setMenuVisibility,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
