export class FollowUpConsultation {
    fucID: string;
    clientID: string;
    specialistID: string;
    mealplanID: string;
    creationDate?: Date;
    edited?: Date;
    dietFollowPercentage: number;
    likeMost: string;
    likeLeast: string;
    neverSeeAgain: string;
    mealplanPreferences: string;
    bowelMovementFrequency: string;
    sleepingHabits: string;
    waterIntake: string;
    activities: {
        frequency: string;
        activityType: string;
        changes: string;
        supplementation: string;
    };
    duringTheWeekend: {
        mealsPerDay: number;
        sleepingSchedule: string;
        eatingOutside: string;
        cheatMeals: string;
    };
    portionSizes: string;
    hungry: string;
    preperationTrouble: string;
    howYouFeeling: string;
    questions?: string;
    specialistNotes: string;
}
