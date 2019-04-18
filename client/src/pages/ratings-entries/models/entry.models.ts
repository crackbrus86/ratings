export interface RatingEntry{
    ratingEntryId: number,
    fullname: string,
    division: string,
    type: string,
    event: string,
    place: number,
    eventDate: Date,
    gender: string,
    compType: string
}

export interface GetEntries_Contract{
    year: number
}

export interface DeleteEntry_Contract{
    ratingEntryId: number
}