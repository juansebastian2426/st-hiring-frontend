import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {useEffect, useState} from "react";
import {getEvents} from "../services/eventsService.ts";
import {addEvents} from "../store/reducers/eventsSlice.ts";
import {EventTable} from "./EventTable.tsx";
import {CircularProgress} from "@mui/material";

export const EventList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const events = useSelector((state: RootState) => state.events.items);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        getEvents().then(events => {
            dispatch(addEvents(events))
            setIsLoading(false)
        })
    }, [])

    if (isLoading) return (<div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
        <CircularProgress />
    </div>)

    return (
        <div>
            <EventTable events={events} />
        </div>
    )
}