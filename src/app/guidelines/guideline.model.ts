export class Guideline {
    clientID: string;
    specialistID: string;
    creationDate: Date;
    lastEdited?: Date;
    gID: string;
    guidelineNR: number;
    guidelineName: string;
    ficID: string;
    measurementID: string;
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
        maxCalories?: number,
        fatPercentageRegular?: number,
        fatPercentageAthlete?: number,
        bmi?: number,
        weight?: string
    };
}

export class FormulaValues {
    height?: number;
    age?: number;
    gender?: string;
    weight?: number;
    factorCalorie?: number;
    triceps?: number;
    biceps?: number;
    abdominal?: number;
    subescapular?: number;
    crestaIliaca?: number;
    supraespinal?: number;
    isAthlete?: boolean;
    calf?: number;
    frontalThigh?: number;
}
