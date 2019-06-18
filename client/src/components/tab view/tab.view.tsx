import * as React from "react";
import * as Tab from "./tab";
import * as classnames from "classnames";

interface TabViewProps{
    children: React.ComponentElement<Tab.TabProps, Tab>[]
}

interface TabViewState{
    activeTab: string
}

class TabView extends React.Component<TabViewProps, TabViewState>{
    constructor(props){
        super(props);
        this.state = {
            activeTab: this.props.children[0].props.label
        }
    }

    onClickTabItem = (label: string) => {
        this.setState({activeTab: label});
    }

    render(){
        return <div className="tabs">
            <ul className="tab-list">
                {
                    this.props.children.map((child, index) => 
                    <li key={index} 
                    className={classnames({'tab-list-item': true, 'tab-list-active': child.props.label == this.state.activeTab})} 
                    onClick={() => this.onClickTabItem(child.props.label)}>{child.props.title}</li>)
                }
            </ul>
            <div className="tab-content">
                {
                    this.props.children.map((child) => {
                        if(child.props.label == this.state.activeTab) return child;
                    })
                }
            </div>
        </div>
    }
}

export = TabView;