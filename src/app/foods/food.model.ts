export class Food {
    productID: string;
    productName: string;
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
}
