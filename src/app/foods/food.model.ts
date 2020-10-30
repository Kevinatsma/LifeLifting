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

export const nutritionTypes = [
    {value: 'pages.food.nutrition_types.protein'},
    {value: 'pages.food.nutrition_types.carbs'},
    {value: 'pages.food.nutrition_types.fat'},
    {value: 'pages.food.nutrition_types.vegetables'},
    {value: 'pages.food.nutrition_types.supps'}
];
