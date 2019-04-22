import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as classnames from "classnames" ;

export interface SearchProps{
    className?: string,
    onChange: (v: string) => void
}

interface SearchState{
    searchValue: string
}

class Search extends React.Component<SearchProps, SearchState>{
    constructor(props){
        super(props);
        this.state = {
            searchValue: ''
        }
    }

    onUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        var value = e.target.value;
        this.setState({searchValue: value});
        this.props.onChange(value)
    }

    onReset = () => {
        this.setState({searchValue: ''});
        this.props.onChange('');
    }

    render(){
        var value = this.state.searchValue;
        return <div className={classnames("search-box", this.props.className)}>
            <FontAwesome name="search" className="search-icon" />
            <input type="text" value={value} onChange={(e) => this.onUpdate(e)} />
            { 
                this.state.searchValue && <FontAwesome name="times" className="close-icon" onClick={this.onReset} /> 
            }
        </div>
    }
}
export default Search;