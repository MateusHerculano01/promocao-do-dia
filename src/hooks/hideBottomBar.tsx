import React, {
  createContext,
  useContext,
  useState,
  ReactNode
} from "react";

type HideBottomBarProviderProps = {
  children: ReactNode;
}

type HideContextData = {
  hideBottomBarState: boolean;
  setHideBottomBarState: React.Dispatch<React.SetStateAction<boolean>>;
}

const HideBottomBarContext = createContext<HideContextData>({} as HideContextData);

function HideBottomBarProvider({ children }: HideBottomBarProviderProps) {
  const [hideBottomBarState, setHideBottomBarState] = useState(false);

  return (
    <HideBottomBarContext.Provider value={{ hideBottomBarState, setHideBottomBarState }}>
      {children}
    </HideBottomBarContext.Provider>
  )
}

function hideBottomBar() {
  const context = useContext(HideBottomBarContext);

  return context;
}

export { HideBottomBarContext, HideBottomBarProvider, hideBottomBar }