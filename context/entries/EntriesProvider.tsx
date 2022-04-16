import { FC, useReducer, useEffect } from 'react';
import { useSnackbar } from 'notistack';

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

  const { enqueueSnackbar } = useSnackbar();


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

  const updateEntry = async ({ _id, description, status }: Entry, showSnackBar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: "[Entry] UPDATED", payload: data })

      if (showSnackBar) {
        enqueueSnackbar("Entry updated", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        })
      }


    } catch (error) {
      console.log(error)
    }
  }

  const deleteEntry = async (id: string) => {
    await entriesApi.delete(`/entries/${id}`)
    dispatch({ type: "[Entry] Delete-data", payload: { id } })

    enqueueSnackbar("Entry Deleted", {
      variant: "success",
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right"
      }
    })
  }


  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry,
      deleteEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}