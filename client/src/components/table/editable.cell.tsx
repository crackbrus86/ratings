import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import { any } from "prop-types";

interface EditableCellProps{
    value: any,
    onChange: (v: string) => void
}

interface EditableCellState{
    value: any,
    editMode: boolean
}

class EditableCell extends React.Component<EditableCellProps, EditableCellState>{
    constructor(props){
        super(props);
        this.state = {
            value: null,
            editMode: false
        }
    }

    enableEditMode = () => {
        this.setState({editMode: true});
    }

    cancelEditMode = () => {
        this.setState({editMode: false, value: this.props.value});
    }

    onEdit = (value: string) => {
        this.setState({value: value});
    }

    onSave = () => {
        this.props.onChange(this.state.value);
        this.cancelEditMode();
    }

    componentDidMount(){
        this.setState({value: this.props.value})
    }

    render(){
        return <div className="editable-cell">
        {
            !this.state.editMode &&
            <div>{this.state.value}<FontAwesome name="pen" className="editable-cell-icon edit" onClick={this.enableEditMode} /></div>
        }
        {
            this.state.editMode &&
            <div>
                <input type="text" value={this.state.value} className="editable-cell-input" onChange={(e) => this.onEdit(e.target.value)} />
                <FontAwesome name="times" className="editable-cell-icon close" onClick={this.cancelEditMode} />
                <FontAwesome name="check" className="editable-cell-icon check" onClick={this.onSave} />
            </div>
        }
        </div>
    }
}
export default EditableCell;