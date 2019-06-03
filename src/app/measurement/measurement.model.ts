export class Measurement {
    id?: string;
    clientID: string;
    specialistID: string;
    measurementID: string;
    created: Date;
    edited?: Date;
    perimeters?: Perimeters;
    skinfolds?: Skinfolds;
    weight?: number;
}

export class Perimeters {
    head: number;
    neck: number;
    armRelaxed: number;
    armFlexed: number;
    forearm: number;
    wrist: number;
    thorax: number;
    waist: number;
    hip: number;
    thighMid: number;
    thighMax: number;
    calf: number;
    ankle: number;
}

export class Skinfolds {
    triceps: number;
    biceps: number;
    subescapular: number;
    crestaIliaca: number;
    supraespinal: number;
    abdominal: number;
    frontalThigh: number;
    skinfoldCalf: number;
}
