export class Mealplan {
    clientID: string;
    specialistID: string;
    creationDate: Date;
    lastEdited?: Date;
    mealplanID: string;
    mealplanNR: number;
    mealplanName: string;
    idealWeight: number;
    idealKiloOfMuscle: number;
    target: string;
    totalTarget: number;
    targetDuration: number;
    increaseCalories: boolean;
    increaseAmount: number;
    factorCalorie: number;
    activities: [
        {
            activityID: number;
            activityLevel: string;
            activityDuration: number;
            activityPerWeek: number;
        }
    ];
    macroDistribution: {
        proteinValue: number;
        carbValue: number;
        fatValue: number;
    };
}
