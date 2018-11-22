export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
 }

export class User {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber?: number;
    photoURL?: string;
    roles?: Roles;
}
