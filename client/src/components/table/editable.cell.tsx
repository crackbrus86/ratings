import * as React from "react";
import * as FontAwesome from "react-fontawesome";

interface EditableCellProps{
    value: any,
    onChange: (v: string) => void
}

interface EditableCellState{
    value: any,
    editMode: boolean
}

class EditableCell extends React.Component<EditableCellProps, EditableCellState>{
    private editableCellInput;

    constructor(props){
        super(props);
        this.state = {
            value: null,
            editMode: false
        }
    }

    enableEditMode = () => {
        this.setState({editMode: true}, () => this.editableCellInput.focus());
    }

    handleFocus = (event) => { 
        event.target.select();
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

    componentDidUpdate(prevProps: EditableCellProps){
        if(prevProps.value != this.props.value)
            this.setState({value: this.props.value});
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
                <input 
                    type="text" 
                    ref={(input) => this.editableCellInput = input} 
                    value={this.state.value} 
                    className="editable-cell-input" 
                    onChange={(e) => this.onEdit(e.target.value)} 
                    onFocus={this.handleFocus}
                />
                <FontAwesome name="times" className="editable-cell-icon close" onClick={this.cancelEditMode} />
                <FontAwesome name="check" className="editable-cell-icon check" onClick={this.onSave} />
            </div>
        }
        </div>
    }
}
export default EditableCell;