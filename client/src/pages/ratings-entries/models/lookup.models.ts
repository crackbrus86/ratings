export interface Competition {
    id: number,
    name: string,
    dbName: string,
    sortOrder: number,
    ratingUPF: boolean
}

export interface Record {
    id: number,
    name: string,
    dbName: string,
    sortOrder: number,
    ratingUPF: boolean
}

export interface Division {
    name: string,
    displayName: string
}

export interface CompetitionType {
    name: string,
    displayName: string
}

export interface Region {
    id: number,
    title: string
}