import { createContext } from 'react'

interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  setIsAddingEntry: (arg: boolean) => void
  openSideMenu: () => void;
  closeSideMenu: () => void;
  startDragging: () => void;
  endDragging: () => void;
  isDragging: boolean;
}

export const UIContext = createContext({} as ContextProps)

