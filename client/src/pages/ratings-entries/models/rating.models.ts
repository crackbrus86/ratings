export interface Rating{
    fullname: string,
    rating: string,
    gender: string,
    details: string,
    detailsData?: string[]
}

export interface GetRatings_Contract{
    year: number
}