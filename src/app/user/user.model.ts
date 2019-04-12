export interface Roles {
    client?: boolean;
    specialist?: boolean;
    admin?: boolean;
 }

export interface Status {
    appointment?: boolean;
    appointmentAccepted?: boolean;
    appointmentCompleted?: boolean;
    accepted?: boolean;
    signUpCompleted?: boolean;
    subscriptionEnded?: boolean;
 }

 export interface BasicData {
    age?: number;
    gender?: string;
    country?: string;
    phoneNumber?: number;
    mainGoal?: string;
    heardFromUs?: string;
    currentWeight?: string;
 }

export class User {
    uid: string;
    sID?: string;
    displayName: string;
    email: string;
    photoURL?: string;
    roles?: Roles;
    status?: Status;
    basicData?: BasicData;
    packageChoice?: string;
    specialist?: string;
    signUpDate?: Date;
}
