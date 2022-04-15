import { useState, ChangeEvent } from 'react';
import { Layout } from '../../components/layouts/Layout';
import { capitalize, IconButton, Card, CardActions, Button, CardContent, CardHeader, Grid, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { EntryStatus } from '../../interfaces';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from "@mui/icons-material/DeleteOutlined"

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"]


const EntriesPage = () => {

  const [inputValue, setInputValue] = useState("")
  const [status, setStatus] = useState<EntryStatus>("pending");
  const [touched, setTouched] = useState(false)

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus)
  }

  const onSave = () => {
    console.log("listo")
  }


  return <Layout title="....">
    <Grid
      container
      justifyContent="center"
      sx={{ marginTop: 2 }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardHeader title={`Entry: ${inputValue}`} subheader={`Creada hace tanto`} />
          <CardContent>
            <TextField
              sx={{ marginTop: 2, marginBottom: 1 }}
              fullWidth
              placeholder='New Entry'
              autoFocus
              multiline
              label="New Entry"
              value={inputValue}
              onChange={onTextFieldChange}
            />

            <FormControl>
              <FormLabel>State:</FormLabel>
              <RadioGroup row
                value={status}
                onChange={onStatusChange}
              >
                {
                  validStatus.map(option => (
                    <FormControlLabel key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))
                }

              </RadioGroup>
            </FormControl>

          </CardContent>
          <CardActions>
            <Button startIcon={<SaveIcon />}
              variant="contained"
              fullWidth
              onClick={onSave}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>

    <IconButton sx={{ position: "fixed", bottom: 30, right: 30, backgroundColor: "error.dark" }}>
      <DeleteIcon />
    </IconButton>
  </Layout>;
}

export default EntriesPage