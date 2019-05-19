export interface Rating{
    id: number,
    ratingType: string,
    title: string,
    organization: string
}

export interface RatingEntry{
    fullname: string,
    rating: string,
    gender?: string,
    details: string,
    detailsData?: string[],
    wilks: string
}

export interface GetRatingsByGender_Contract{
    year: number,
    gender: string
}

export enum RatingTypes {
    MinAthMale = "minAthMale",
    MinAthFemale = "minAthFemale",
    UpfAthMale = "upfAthMale",
    UpfAthFemale = "upfAthFemale",
    MinCoach = "minCoach",
    UpfCoach = "upfCoach",
    MinRegion = "minRegion",
    MinFST = "minFST",
    MinSchool = "minSchool"
}