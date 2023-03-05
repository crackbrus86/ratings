import * as React from "react";
import Tab from "./tab";
import * as classnames from "classnames";

interface TabViewProps{
    children: React.ComponentElement<Tab.TabProps, Tab>[] | React.ComponentElement<Tab.TabProps, Tab>
}

interface TabViewState{
    activeTab: string,
    children: React.ComponentElement<Tab.TabProps, Tab>[]
}

class TabView extends React.Component<TabViewProps, TabViewState>{

    constructor(props){
        super(props);
        const children = [].concat(props.children);
        this.state = {
            activeTab: children[0].props.label,
            children: [...children]
        }
    }

    onClickTabItem = (label: string) => {
        this.setState({activeTab: label});
    }

    render(){
        return <div className="tabs">
            <ul className="tab-list">
                {
                    this.state.children.map((child, index) => 
                    <li key={index} 
                    className={classnames({'tab-list-item': true, 'tab-list-active': child.props.label == this.state.activeTab})} 
                    onClick={() => this.onClickTabItem(child.props.label)}>{child.props.title}</li>)
                }
            </ul>
            <div className="tab-content">
                {
                    this.state.children.map((child) => {
                        if(child.props.label == this.state.activeTab) return child;
                    })
                }
            </div>
        </div>
    }
}

export default TabView;