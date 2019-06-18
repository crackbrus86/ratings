import * as Models from "../models/index.models";

const testData: Models.TestRefereeEntry[] = [
    {refereeEntryId: 1, name: "Іваненко Іван Іванович", event: "Чемпіонат світу", point: 300, date: new Date("2018-05-11 16:45:024")},
    {refereeEntryId: 2, name: "Петренко Петро Петрович", event: "Чемпіонат світу", point: 250, date: new Date("2019-05-11 09:15:048")},
    {refereeEntryId: 3, name: "Миколенко Микола Миколаєвич", event: "Чемпіонат світу", point: 180, date: new Date("2019-04-30 19:05:015")}
];

export const getTestEmployeeEntries = (year: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var data = testData.filter(x => x.date.getFullYear() == year);
            resolve(data);
        }, 2000);
    });
}