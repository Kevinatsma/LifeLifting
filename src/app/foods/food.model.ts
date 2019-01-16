export class Food {
    productID: string;
    productName: string;
    productCategory: string;
    preparations: [];
    portion: {
        amount: number,
        unit: string
    };
}
