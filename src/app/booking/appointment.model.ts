export class Appointment {
    accepted?: boolean;
    rejected?: boolean;
    created?: Date;
    edited?: boolean;
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
    members?: Array<string>;
    meetMethod?: string;
    contactMethod?: string;
    onlineAppointmentPhone?: {
      phoneAreaCode: string,
      phoneRest: number
    };
    whatsappNumber?: string;
    skypeName?: string;
    faceToFacePhone?: number;
    location?: string;
}
