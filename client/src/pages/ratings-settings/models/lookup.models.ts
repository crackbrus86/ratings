export interface Competition {
    id: number,
    name: string,
    dbName: string,
    sortOrder: number
}

export interface Point {
    pointId: number;
    target: string;
    value: number;
    place: number;
}

export interface TablePoint extends Competition{
    pointId?: number;
    firstPlaceValue?: number;
    secondPlaceValue?: number;
    thirdPlaceValue?: number;
}