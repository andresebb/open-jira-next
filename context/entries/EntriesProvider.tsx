import { FC, useReducer, useEffect } from 'react';


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


  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description })
    dispatch({ type: "[Entry] Add Entry", payload: data })

  }

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: "[Entry] UPDATED", payload: data })

    } catch (error) {
      console.log(error)
    }
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