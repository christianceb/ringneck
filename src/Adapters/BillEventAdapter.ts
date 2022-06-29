import { EventInput } from "@fullcalendar/react";
import IFcEventAdapter from "./IFcEventAdapter";

export default class BillEventAdapter implements IFcEventAdapter {
    get(): EventInput[] {
        return [{
            title: 'Event1',
            start: '2022-02-24'
          },
          {
            title: 'Event2',
            start: '2022-02-25'
          }];
    }
}