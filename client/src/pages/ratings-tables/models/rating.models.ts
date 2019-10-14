export interface Rating{
    id: number,
    ratingType: string,
    title: string,
    organization: string,
    type: "athlete" | "coach" | "region" | "fst" | "school" | "referee"
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

export interface GetRatingsByYear_Contract{
    year: number
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
    MinSchool = "minSchool",
    MinReferee = "minReferee"
}