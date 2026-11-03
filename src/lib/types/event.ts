export interface IEvent {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
    joiningDate?: string | Date;
    email?: string;
    eventId?: string;
}