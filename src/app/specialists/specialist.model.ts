export class Specialist {
    specialistID: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    description: string;
    email: string;
    phoneNumber: string;
    position: string;
    speciality: string;
    yearsOfExperience: number;
    patientsTotal: number;
    languages: [
        {
            languageValue: string;
            profficiency?: string;
        }
    ];
    timeZone: string;
    city: string;
    country: string;
    reviews?: [
        {
            reviewerName?: string;
            reviewText: string;
            reviewStars?: number;
        }
    ];
}
