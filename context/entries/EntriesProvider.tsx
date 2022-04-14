import { FC, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../apis';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIALSTATE: EntriesState = {
  entries: []
}

export const EntriesProvider: FC = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIALSTATE)

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries")
    dispatch({ type: "[Entry] Initial-data", payload: data })
  }

  useEffect(() => {
    refreshEntries();
  }, [])


  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      status: "pending",
      createdAt: Date.now()
    }

    dispatch({ type: "[Entry] Add Entry", payload: newEntry })
  }

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] UPDATED", payload: entry })
  }


  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}