export class Food {
    productID: number;
    productName: string;
    shoppingListName: string;
    productPhoto: string;
    categories: {
        nutritionType: string;
        productMealTimes: [
            {
                mealTimeValue: string;
            }
        ]
    };
    preparations: [];
    unit: string;
    shoppingUnit: string;
    factor: number;
}
