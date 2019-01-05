export interface Roles {
    member?: boolean;
    specialist?: boolean;
    admin?: boolean;
 }

 export interface BasicData {
    age?: number;
    gender?: string;
    country?: string;
    phoneNumber?: number;
    mainGoal?: string;
    heardFromUs?: string;
 }

export class User {
    uid: string;
    sID?: string;
    cID?: string;
    displayName: string;
    email: string;
    isClient: boolean;
    isSpecialist: boolean;
    photoURL?: string;
    roles?: Roles;
    basicData?: BasicData;
    packageChoice?: string;
    specialist?: string;
    appointment?: string;
    signupCompleted?: boolean;
}
