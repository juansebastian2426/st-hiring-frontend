import { Event } from '../entities/event.ts'
import {Ticket} from "../entities/ticket.ts";

const eventAdapter = (events: unknown[]): Event[] => {
    return (events as Event[]).map(event => ({
        id: event.id,
        name: event.name,
        description: event.description,
        date: event.date,
        location: event.location,
        updatedAt: event.updatedAt,
        createdAt: event.createdAt,
        availableTickets: event.availableTickets.map((ticket: Ticket) => ({
            id: ticket.id,
            eventId: ticket.eventId,
            type: ticket.type,
            status: ticket.status,
            price: ticket.price,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        }))
    }))
}

export const getEvents = async (): Promise<Event[]> => {
    try {
        const response = await fetch('http://localhost:3000/events')
        const events = await response.json()
        return eventAdapter(events)
    } catch (error) {
        console.error(error)
        throw error
    }
}