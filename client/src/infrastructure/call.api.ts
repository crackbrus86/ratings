import axios from "axios";

export enum RequestTypes{
    POST = "POST",
    GET = "GET"
}
export interface RequestProps{
    url: string,
    type: RequestTypes,
    data?: any
}

export interface ResponseModel{
    status: boolean,
    message?: string,
    data?: any
}

export const callApi = (props: RequestProps) => {
    if(!props.url || !props.type) throw new Error("Required parameters were not send");
    switch(props.type){
        case RequestTypes.GET:
            return axios.get(props.url, {
                params: props.data
            });
        case RequestTypes.POST:
            return axios.post(props.url, props.data);
        default:
            return;
    }
}