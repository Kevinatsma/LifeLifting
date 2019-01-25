export class Guideline {
    clientID: string;
    productID: string;
    productName: string;
    productCategory: string;
    preparations: [];
    portion: {
        amount: number,
        unit: string
    };
}
