import axios, { AxiosResponse } from "axios";

export enum RequestTypes {
    POST = "POST",
    GET = "GET"
}
export interface RequestProps {
    url: string,
    type: RequestTypes,
    data?: any
}

export interface ResponseModel {
    status: boolean,
    message?: string,
    data?: any
}

export const callApi = (props: RequestProps) => {
    if (!props.url || !props.type) throw new Error("Required parameters were not send");
    switch (props.type) {
        case RequestTypes.GET:
            return axios.get(props.url, {
                params: props.data
            }).then((result) => mapToResponse(result));
        case RequestTypes.POST:
            return axios({ 
                method: 'post', 
                url: props.url, 
                data: convertToFormData(props.data)
            }).then((result) => mapToResponse(result));
        default:
            return;
    }
}

function convertToFormData(data){
    let form = new FormData()
    for ( const key in data ) {
      form.append(key, data[key]);
    }
    return form
  }

const mapToResponse = (result: AxiosResponse<any>) => {
    let response: ResponseModel = result.data;
    return response;
}

axios.interceptors.request.use(function (config) {
    addBlackOut();
    return config;
}, function (error) {

    return error;
});

axios.interceptors.response.use(function (response) {
    deleteBlackOut();
    return response;
}, function (error) {
    return error;
});

function addBlackOut() {
    if (!document.getElementsByClassName("blackout").length) {
        var blackOut = document.createElement("div");
        blackOut.className = "blackout";
        blackOut.setAttribute("style", "position: absolute; top: 0; left: 0; bottom: 0; right: 0; background-color: #353535; opacity: 0.8; z-index: 10001;");
        var spinner = document.createElement("i");
        spinner.className = "fas fa-atom fa-7x fa-spin";
        spinner.setAttribute("style", "position: absolute; top: 50%; left: 50%; color: #81f4c5; z-index: 10002;");
        blackOut.appendChild(spinner);
        document.body.appendChild(blackOut);
    }
}

function deleteBlackOut() {
    if (!!document.getElementsByClassName("blackout").length) {
        document.getElementsByClassName("blackout")[0].remove();
    }
}