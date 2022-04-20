import { ApplicationStateEnum } from "../types";

export interface IAppProviderState {
  activeState: ApplicationStateEnum;
  setActiveState: React.Dispatch<
    React.SetStateAction<ApplicationStateEnum>
  > | null;
  activeTopic: string;
  setActiveTopic: React.Dispatch<React.SetStateAction<string>> | null;
  menuVisible: boolean;
  setMenuVisibility: React.Dispatch<React.SetStateAction<boolean>> | null;
}
