export interface Activity{
    id: number
    activity: string
    coefficient: number
}

export interface Competition {
    id: number,
    name: string,
    dbName: string,
    sortOrder: number,
    ratingUPF: boolean,
    shortName: string
}