import React, { ChangeEvent, useContext, useState } from 'react'

import { Button, Box, TextField } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlined';

import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';


export const NewEntry = () => {

  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const [inputValue, setInputValue] = useState("")
  const [touched, setTouched] = useState(false)

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSave = () => {
    if (inputValue.length === 0) return

    addNewEntry(inputValue)

    setIsAddingEntry(false)
    setInputValue("")
    setTouched(false)
  }

  const onCancel = () => {
    setIsAddingEntry(false)
    setInputValue("")
    setTouched(false)
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

      {
        isAddingEntry ? (
          <>
            <TextField
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1 }}
              placeholder="New Entry"
              autoFocus
              multiline
              label="New Entry"
              helperText={inputValue.length <= 0 && touched && "Insert a value"}
              error={inputValue.length <= 0 && touched}
              value={inputValue}
              onChange={onTextFieldChange}
              onBlur={() => setTouched(true)}
            />


            <Box display="flex" justifyContent="space-between">
              <Button variant="text" endIcon={<SaveOutlinedIcon />}
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
              <Button variant="outlined" color="secondary" endIcon={<SaveOutlinedIcon />} onClick={() => onSave()}>
                Save
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Button
              startIcon={<AddIcon />}
              fullWidth
              variant='outlined'
              onClick={() => setIsAddingEntry(true)}
            >
              Add Task
            </Button>
          </>
        )
      }
    </Box>
  )
}
