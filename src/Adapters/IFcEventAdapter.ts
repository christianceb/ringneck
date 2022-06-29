import { EventInput } from "@fullcalendar/react";

export default interface IFcEventAdapter {
    get(): EventInput
}