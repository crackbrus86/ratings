import * as React from "react";

export interface HelloProps{ userName: string; }

export class Hello extends React.Component<HelloProps>{
    constructor(props){
        super(props);
    }

    render(){
        return <h1>{`Hello ${this.props.userName}`}</h1>
    }
}