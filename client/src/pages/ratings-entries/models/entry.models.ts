export interface RatingEntry{
    ratingEntryId: number,
    fullname: string,
    division: string,
    type: string,
    event: string,
    place: number,
    eventDate: Date,
    gender: string,
    compType: string,
    wilks: number,
    region: string,
    coach?: string,
    fst?: string,
    school?: string,
    regions?: string[]
}

export interface GetEntries_Contract{
    year: number
}

export interface DeleteEntry_Contract{
    ratingEntryId: number
}