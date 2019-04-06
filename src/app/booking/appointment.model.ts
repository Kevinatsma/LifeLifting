export class Appointment {
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
    meetMethod?: string;
    onlineAppointmentPhone?: string;
    whatsappNumber?: string;
    skypeName?: string;
    faceToFacePhone?: string;
    location?: string;
}
