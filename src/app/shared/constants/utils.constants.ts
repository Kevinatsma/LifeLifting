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