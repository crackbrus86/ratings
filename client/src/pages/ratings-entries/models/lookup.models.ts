export interface Competition {
    id: number,
    name: string,
    dbName: string,
    sortOrder: number
}

export interface Record {
    id: number,
    name: string,
    dbName: string,
    sortOrder: number
}

export interface Division {
    name: string,
    displayName: string
}

export interface CompetitionType {
    name: string,
    displayName: string
}