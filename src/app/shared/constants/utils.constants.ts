import { Appointment } from "./../../../app/booking/appointment.model";
import moment from 'moment';

export const defaultEvent: Appointment = {
    accepted: true,
    clientID: 'testId',
    color: {primary: '#e74c3c', secondary: '#f58f84'},
    contactMethod: null,
    created: new Date(),
    start: new Date(),
    end: moment(moment.now()).add(48, 'hours'),
    rejected: false
}

export interface IStartDate {
    startMinutes?: string | Date;
    startHours?: string | Date;
    startDay?: string | Date;
    startMonth?:  string | Date;
    startYear?:  string | Date;
  }
  export interface IEndDate {
    endMinutes?: string | Date;
    endHours?: string | Date;
    endDay?: string | Date;
    endMonth?:  string | Date;
    endYear?:  string | Date;
  }