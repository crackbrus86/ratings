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
    shortName: string,
    isActive: boolean
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

export interface Rating{
    id: number,
    ratingType: string,
    title: string,
    organization: string,
    type: "athlete" | "coach" | "region" | "fst" | "school" | "referee",
    isActive: boolean
}