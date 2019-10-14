export interface Competition {
    id: number,
    name: string,
    dbName: string,
    sortOrder: number,
    ratingUPF: boolean,
    shortName: string
}

export interface Record {
    id: number,
    name: string,
    dbName: string,
    sortOrder: number,
    ratingUPF: boolean,
    shortName: string
}

export interface CompetitionType {
    name: string,
    displayName: string
}