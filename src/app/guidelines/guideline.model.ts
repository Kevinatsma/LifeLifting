export class Guideline {
    clientID: string;
    specialistID: string;
    creationDate: Date;
    lastEdited?: Date;
    guidelineID: string;
    guidelineNR: number;
    guidelineName: string;
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
    macroDistribution: [
        {
            percentage: number;
            macroValue: string;
        }
    ];
}
