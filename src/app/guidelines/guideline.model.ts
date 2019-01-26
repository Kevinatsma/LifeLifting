export class Guideline {
    clientID: string;
    creationDate: Date;
    lastEdited?: Date;
    productID: string;
    productNR: number;
    productName: string;
    productCategory: string;
    preparations: [];
    portion: {
        amount: number,
        unit: string
    };
}
