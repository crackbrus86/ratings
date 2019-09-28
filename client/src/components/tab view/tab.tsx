import * as React from "React";

class Tab extends React.Component<Tab.TabProps>{
    onClick = () => {
        this.props.onClick(this.props.label);
    }

    render(){
        return <>{this.props.children}</>
    }
}

namespace Tab{
    export interface TabProps{
        title: string,
        label: string,
        onClick?: (label: string) => void
    }
}

export default Tab;