export class Food {
    productID: string;
    productName: string;
    productPhoto: string;
    productCategory: string;
    preparations: [];
    portion: {
        amount: number,
        unit: string
    };
}
