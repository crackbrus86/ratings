interface CompetitionType{
    name: string,
    displayName: string
}

interface Competition{
    id: number,
    name: string,
    dbName: string,
    sortOrder: number,
    ratingUPF: boolean,
    shortName: string
}

interface Record{
    id: number,
    name: string,
    dbName: string,
    sortOrder: number,
    ratingUPF: boolean,
    shortName: string
}

interface Rating{
    fullname: string,
    rating: string,
    gender?: string,
    details: string,
    detailsData?: string[],
    wilks: string
}

export function getDetails(originalDetails: string, types: CompetitionType[], competitions: Competition[], records: Record[], isReferee = false, showFullName = false){

    let details = originalDetails;

    let detailsAsArray = [];

    for(var i = 0; i < competitions.length; i++){
        details = details.replace(new RegExp(` ${competitions[i].dbName}`, 'g'), !showFullName ? competitions[i].shortName : competitions[i].name);
    }

    for(var i = 0; i < records.length; i++){
        details = details.replace(new RegExp(` ${records[i].dbName}`, 'g'), !showFullName ? records[i].shortName : records[i].name);
    }

    for(var i = 0; i < types.length; i++){
        details = details.replace(new RegExp(` ${types[i].name}`, 'g'), ` - ${types[i].displayName}`);
    }

    detailsAsArray = details.split(",");

    detailsAsArray = !isReferee ? detailsAsArray.map(d => ({text: d, range: d.split(' - ')[1].split(' ')[0]})) 
                                : detailsAsArray.map(d => ({text: d, range: d.split(' - ')[0].split(' ')[0]}));

    detailsAsArray = detailsAsArray.sort((a,b) => a.range - b.range);

    detailsAsArray = detailsAsArray.map(d => `<li>${d.text}</li>`);

    return `<ul>${detailsAsArray.join('')}</ul>`;
}

export function sortUPFRating(ratingA: Rating, ratingB: Rating){
    let detailsA = ratingA.detailsData.map(x => parseInt(x.trim()));
    let detailsB = ratingB.detailsData.map(x => parseInt(x.trim()));
    let globalLength = detailsA.length >= detailsB.length ? detailsA.length : detailsB.length;
    detailsA = detailsA.sort((a,b) => a - b);
    detailsB = detailsB.sort((a,b) => a - b);
    var i = 0;
    while(i < globalLength){
        let valueA = detailsA[i] || 1000;
        let valueB = detailsB[i] || 1000;
        if(valueA == valueB) {
            ++i;
            continue;
        }
        if(valueA > valueB) return 1;
        if(valueA < valueB) return -1;
    }
    return 1;
}

export function isMatchingSearchString(search: string, field: any) {
    if (!field) field = '';
    return field.toString().toLowerCase().indexOf(search.toLowerCase()) != -1;
}