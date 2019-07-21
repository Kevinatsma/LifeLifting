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
    subscriptionValid?: boolean;
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

 export interface Formulas {
    height?: number;
    birthDate?: string;
    gender?: string;
    factorCalorie?: string;
    weight?: number;
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
    formulas?: Formulas;
}
