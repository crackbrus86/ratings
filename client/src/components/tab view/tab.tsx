import * as React from "React";

export interface TabProps{
    title: string,
    label: string,
    onClick?: (label: string) => void
}

class Tab extends React.Component<TabProps>{
    onClick = () => {
        this.props.onClick(this.props.label);
    }

    render(){
        return <div>{this.props.children}</div>
    }
}

export default Tab;