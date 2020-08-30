import { Exercise } from '../exercises/exercise.model';

export class FirstConsultation {
    ficID?: string;
    mID?: string;
    clientID: string;
    specialistID: string;
    creationDate?: Date;
    edited?: Date;
    lastEdited?: Date | string;
    basicData: BasicData;
    habits: Habits;
    bodyFunctions: BodyFunctions;
    generalData: GeneralData;
    specialistNotes: string;
}

export class BasicData {
    mealplanMainGoal: string;
    sex: string;
    birthDate: any;
    height: number;
    phoneNumber: {
        areaCode: string;
        number: number;
    };
    address: string;
}

export class Habits {
    alcohol: string;
    alcoholNote?: string;
    smoke: string;
    smokeNote?: string;
    drugs: string;
    coffee: string;
    coffeeNote?: string;
    tea: string;
    teaNote?: string;
    socialLife: string;
    socialLifeNote?: number;
    stayUpLate: string;
    stayUpLateNote?: number;
    sleepingHabits: {
        wakeUpTime: string;
        sleepTime: string;
    };
    eatingHabits: {
        breakfastTime: string;
        lunchTime: string;
        dinnerTime: string;
        whoCooks: string;
        breakfastAtHome: string;
        breakfastAtHomeNote: string;
        timeForBreakfast: string;
        timeForBreakfastNote: string;
    };
    work: {
        description: string;
        schedules: {
            from: string;
            to: string;
        };
        workOnWeekends: string;
        workOnWeekendsNote?: {
            from: string;
            to: string;
        };
        homeToWork: number;
        workToHome: number;
        transportationMethod: string;
        eatDuringJob: string;
        practicalSnackDuringJob?: string;
        snacksPreference: string;
        kitchenGadgetsAtWork: string;
    };
}

export class BodyFunctions {
    diuresis: {
        urinateAmount: number;
        middleNightUrinate: string;
    };
    bowelMovements: {
        everyDay: string;
        timesPerWeek?: number;
        timesPerDay?: number;
        sameSchedule: string;
    };
    appetite: {
        hungryScale: number;
        mostHungryMoment: string;
    };
    female?: {
        firstMenstrualPeriod: number;
        regularCycle: string;
        birthControlPills: string;
        birthControlPillsNote: string;
        periodXDays: number;
        bleedingXDays: number;
        pregnancies: number;
    };
    sleep: {
        sleepingStatus: string;
        averageHours: number;
        troubleFallingAsleep: string;
        troubleFallingAsleepNote?: string;
        wakeUpEnergized: string;
    };
}

export class GeneralData {
    general: {
        healthConditions: [];
        gastritis: string;
        medication: string;
        pastTwoWeeks: [];
        dontEat: [];
        dietType: string;
    };
    dinner: {
        portion: string;
        preparedBy: string;
        eatAfterDinner: string
        eatAfterDinnerNote?: string
        shoppingLocations: [];
        whoBuys: string;
        orderOnline: string;
    };
    physicalActivity: {
        physicalActivitiesConfirmation: string;
        physicalActivities?: [
            {
                physicalActivity: Exercise | string,
                workoutScheduleFrom: string,
                workoutScheduleTo: string,
                trainingLocation: string,
                travelTime: number,
                trainingIntensity: string,
            }
        ];
        physicalActivitiesWhy?: string;
    };
    weekends: {
        wakeUpTime: string;
        orderFood: string;
        orderFoodNote?: string;
    };
    supplements: {
        supplements: string;
        supplementNote?: string;
        willingToUseSupps: string;
        eatingRecordatory: string;
    };
}
