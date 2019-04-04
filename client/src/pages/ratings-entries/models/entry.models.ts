export interface RatingEntry{
    ratingEntryId: number,
    fullname: string,
    type: string,
    event: string,
    place: number,
    eventDate: Date
}

export interface GetEntries_Contract{
    year: number
}

export interface DeleteEntry_Contract{
    ratingEntryId: number
}