export interface Competition {
    id: number,
    name: string,
    dbName: string,
    sortOrder: number,
    ratingUPF: boolean,
    shortName: string,
    isActive: boolean
}

export interface Record {
    id: number,
    name: string,
    dbName: string,
    sortOrder: number,
    ratingUPF: boolean,
    shortName: string
}

export interface Point {
    pointId: number;
    target: string;
    value: number;
    place: number;
}

export interface CompType{
    name: string,
    displayName: string
}

export interface TablePoint extends Competition{
    pointId?: number;
    firstPlaceValue?: number;
    secondPlaceValue?: number;
    thirdPlaceValue?: number;
    fourthPlaceValue?: number;
    fivethPlaceValue?: number;
    sixthPlaceValue?: number;
    seventhPlaceValue?: number;
    eighthPlaceValue?: number;
    ninethPlaceValue?: number;
    tenthPlaceValue?: number;
    eleventhPlaceValue?: number;
    twelvethPlaceValue?: number;
    thirteenPlaceValue?: number;
    fourteenPlaceValue?: number;
    fifteenPlaceValue?: number;
    sixteenPlaceValue?: number;
}