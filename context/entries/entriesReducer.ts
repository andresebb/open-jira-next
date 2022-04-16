import { Entry } from "../../interfaces";
import { EntriesState } from "./EntriesProvider";

type EntriesActionType =
  | { type: "[Entry] Add Entry"; payload: Entry }
  | { type: "[Entry] UPDATED"; payload: Entry }
  | { type: "[Entry] Initial-data"; payload: Entry[] }
  | { type: "[Entry] Delete-data"; payload: { id: string } };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] Add Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
      break;
    case "[Entry] UPDATED":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    case "[Entry] Initial-data":
      return {
        ...state,
        entries: [...action.payload],
      };
    case "[Entry] Delete-data":
      console.log(action.payload.id);
      return {
        ...state,
        entries: state.entries.filter((entry) => {
          return entry._id !== action.payload.id;
        }),
      };

    default:
      return state;
  }
};
