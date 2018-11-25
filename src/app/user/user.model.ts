export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
 }

 export interface BasicData {
    age?: number;
    sex?: string;
    countryOfResidence?: string;
    phoneNumber?: number;
    mainGoal?: string;
    heardFromUs?: string;
 }

export class User {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    roles?: Roles;
    basicData?: BasicData;
}
