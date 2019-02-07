export class Mealplan {
    clientID: string;
    specialistID: string;
    creationDate: Date;
    lastEdited?: Date;
    mealplanID: string;
    mealplanNR: number;
    mealplanName: string;
    mealTimes: [{}];
}
