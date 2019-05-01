export interface Rating{
    fullname: string,
    rating: string,
    gender?: string,
    details: string,
    detailsData?: string[],
    wilks: string
}

export interface GetRatings_Contract{
    year: number
}