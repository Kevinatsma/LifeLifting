export class Appointment {
    callMethod?: string;
    phoneNumber?: string;
    whatsappNumber?: string;
    skypeName?: string;
    title: string;
    start: Date;
    end: Date;
    color: {
        primary: string,
        secondary: string
    };
    draggable: true;
    resizable: {
      beforeStart: boolean,
      afterEnd: boolean
    };
    specialistID: string;
    clientID: string;
}
