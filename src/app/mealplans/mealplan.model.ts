import { Exercise } from '../exercises/exercise.model';

export class DayForm {
    mealTimeOne: {
        meals: [
            {
                mealTitle: string;
                products: [
                    {
                        product: Object;
                    }
                ]
            }
        ]
    };
    mealTimeTwo: {
        meals: [
            {
                mealTitle: string;
                products: [
                    {
                        product: Object;
                    }
                ]
            }
        ]
    };
    mealTimeThree: {
        meals: [
            {
                mealTitle: string;
                products: [
                    {
                        product: Object;
                    }
                ]
            }
        ]
    };
    mealTimeFour: {
        meals: [
            {
                mealTitle: string;
                products: [
                    {
                        product: Object;
                    }
                ]
            }
        ]
    };
    mealTimeFive: {
        meals: [
            {
                mealTitle: string;
                products: [
                    {
                        product: Object;
                    }
                ]
            }
        ]
    };
    mealTimeSix: {
        meals: [
            {
                mealTitle: string;
                products: [
                    {
                        product: Object;
                    }
                ]
            }
        ]
    };
    mealTimeSeven: {
        meals: [
            {
                mealTitle: string;
                products: [
                    {
                        product: Object;
                    }
                ]
            }
        ]
    };
}

export interface Supplementation {
    guideline: string;
    supps: {
        beforeOne: string;
        duringOne: string;
        afterOne: string;
        beforeTwo: string;
        duringTwo: string;
        afterTwo: string;
        beforeThree: string;
        duringThree: string;
        afterThree: string;
    };
    exercises: {
        exerciseOne?: Exercise;
        exerciseTwo?: Exercise;
        exerciseThree?: Exercise;
    };
}

export class Mealplan {
    clientID: string;
    specialistID: string;
    creationDate: Date;
    lastEdited?: Date;
    mID: string;
    mealplanNR: number;
    mealplanName: string;
    mealTimes: [{}];
    mondayMeals: DayForm;
    tuesdayMeals: DayForm;
    wednesdayMeals: DayForm;
    thursdayMeals: DayForm;
    fridayMeals: DayForm;
    supplementation: Supplementation;
    extraNotes: string;
}
