export interface RefereeEntry{
    id: number,
    fullname: string,
    event: string,
    activity: number,
    eventDate: Date
}

export interface GetAll_Contract{
    year: number
}

export interface Delete_Contract{
    id: number
}