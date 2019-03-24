export class Appointment {
    callMethod?: string;
    phoneNumber?: string;
    whatsappNumber?: string;
    skypeName?: string;
    title?: string;
    start?: any;
    end?: any;
    eventID?: string;
    color?: {
        primary: string,
        secondary: string
    };
    draggable?: boolean;
    resizable?: {
      beforeStart?: boolean,
      afterEnd?: boolean
    };
    specialistID?: string;
    clientID?: string;
}
