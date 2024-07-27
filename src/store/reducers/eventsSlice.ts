import {Event} from "../../entities/event.ts";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type EventsState = {
    items: Event[]
}
const initialState: EventsState = { items: [] };

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvents(state, action: PayloadAction<Event[]>) {
            state.items = action.payload
        },
        addNewEvent(state, action: PayloadAction<Event>) {
            state.items.push(action.payload)
        }
    }
})

export const { addEvents, addNewEvent } =
    eventsSlice.actions;

export const reducer = eventsSlice.reducer;