export class Guideline {
    clientID: string;
    specialistID: string;
    creationDate: Date;
    lastEdited?: Date;
    gID: string;
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
    macroDistribution: {
        proteinValue: number;
        carbValue: number;
        fatValue: number;
    };
    formulaData: {
        maxCalories: number,
        fatPercentageRegular?: number,
        fatPercentageAthlete?: number,
        bmi: number,
    };
}
