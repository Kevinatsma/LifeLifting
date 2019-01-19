export class Exercise {
    exerciseID: string;
    exerciseName: string;
    exercisePhoto: string;
    categories: [];
    locations: [];
    portion: {
        amount: number,
        unit: string
    };
}
