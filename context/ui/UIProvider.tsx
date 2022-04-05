import { FC, useReducer } from 'react';

import { UIContext, uiReducer } from "./"

export interface UIState {
  sideMenuOpen: boolean;
}
const UI_INITIALSTATE: UIState = {
  sideMenuOpen: false
}

export const UIProvider: FC = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIALSTATE)

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" })
  }

  const closeSideMenu = () => {
    dispatch({ type: "UI - Close Sidebar" })
  }


  return (
    <UIContext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu
    }}>
      {children}
    </UIContext.Provider>
  )
}
