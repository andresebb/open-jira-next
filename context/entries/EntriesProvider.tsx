import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';


import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIALSTATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "Penditene  EStasd dejnjnefjbrf snd skndsd ",
      status: "pending",
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: "Progresooo  EStasd dejnjnefjbrf snd skndsd ",
      status: "in-progress",
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: "Finisihed   EStasd dejnjnefjbrf snd skndsd ",
      status: "finished",
      createdAt: Date.now()
    },
  ]
}

export const EntriesProvider: FC = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIALSTATE)

  return (
    <EntriesContext.Provider value={{
      ...state,
    }}>
      {children}
    </EntriesContext.Provider>
  )
}