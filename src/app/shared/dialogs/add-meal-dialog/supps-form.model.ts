import { Exercise } from './../../../exercises/exercise.model';

export class SuppsForm {
    guideline: any;
    supps: {
        beforeOneArr: [
            {
                product: Object;
            }
        ];
        duringOneArr: [
            {
                product: Object;
            }
        ];
        afterOneArr: [
            {
                product: Object;
            }
        ];
        beforeTwoArr?: [
            {
                product: Object;
            }
        ];
        duringTwoArr?: [
            {
                product: Object;
            }
        ];
        afterTwoArr?: [
            {
                product: Object;
            }
        ];
        beforeThreeArr?: [
            {
                product: Object;
            }
        ];
        duringThreeArr?: [
            {
                product: Object;
            }
        ];
        afterThreeArr?: [
            {
                product: Object;
            }
        ];
    };
    exercises: {
        exerciseOne: Exercise;
        exerciseTwo: Exercise;
        exerciseThree: Exercise;
    };
}
