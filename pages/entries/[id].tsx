import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { Layout } from '../../components/layouts/Layout';
import { capitalize, IconButton, Card, CardActions, Button, CardContent, CardHeader, Grid, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { Entry, EntryStatus } from '../../interfaces';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { getFormatDistanceToNow } from '../../utils/dateFunctions';


const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"]

interface Props {
  entry: Entry
}

const EntriesPage: FC<Props> = ({ entry }) => {


  const { updateEntry, deleteEntry } = useContext(EntriesContext)

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus)
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    }

    updateEntry(updatedEntry, true)
  }


  return <Layout title={inputValue.substring(0, 20) + "..."}>
    <Grid
      container
      justifyContent="center"
      sx={{ marginTop: 2 }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardHeader title={`Entry: `} subheader={`Created ${getFormatDistanceToNow(entry.createdAt)} ago`} />
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
              helperText={isNotValid && "Enter a value"}
              onBlur={() => setTouched(true)}
              error={isNotValid}
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
              disabled={inputValue.length <= 0}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>

    <IconButton sx={{ position: "fixed", bottom: 30, right: 30, backgroundColor: "error.dark" }} onClick={() => deleteEntry(entry._id)}>
      <DeleteIcon />
    </IconButton>
  </Layout>;
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id)

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      entry: entry
    }
  }
}


export default EntriesPage