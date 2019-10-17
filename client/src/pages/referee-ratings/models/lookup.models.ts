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

export interface Rating{
    id: number,
    ratingType: string,
    title: string,
    organization: string,
    type: "athlete" | "coach" | "region" | "fst" | "school" | "referee",
    isActive: boolean
}