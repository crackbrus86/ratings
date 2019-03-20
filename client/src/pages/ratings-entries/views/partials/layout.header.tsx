import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../../actions/index.actions";
import * as Models from "../../models/index.models";
import * as Datetime from "react-datetime";

interface StateProps{
    startDate: Date,
}

interface DispatchProps{
    shellActions: typeof Actions.ShellActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        startDate: state.shell.startDate
    }),
    (dispatch): DispatchProps => ({
        shellActions: bindActionCreators(Actions.ShellActions.ActionCreators, dispatch)
    })
)(class LayoutHeader extends React.Component<StateProps & DispatchProps>{

    changeStartDate = (date?: string) => { 
        let nextDate = !isNaN(new Date(date).getTime()) ? new Date(date) : null;
        this.props.shellActions.changeStartDate(nextDate);
    }

    render(){
        return <div className="layout-header">
            <label>Станом на: </label>
            <Datetime 
                value={this.props.startDate} 
                dateFormat={'DD-MM-YYYY'} 
                timeFormat={false} 
                closeOnSelect={true} 
                onChange={(date) => this.changeStartDate(date.toString())} />
        </div>
    }
})