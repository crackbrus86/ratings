import * as React from "react";
import {connect} from "react-redux";
import * as Datetime from "react-datetime";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";
import * as Reducers from "../reducers/index.reducer";
import {bindActionCreators} from "redux";

interface StateProps{
    startDate: Date
}

interface DispatchProps {
   shellActions: typeof Actions.ShellActions.ActionCreators;
}

const mapStateToProps = (state: Models.StoreState):StateProps => ({
    startDate: state.shell.startDate
})

const mapDispatchToProps = (dispatch): DispatchProps => ({
    shellActions: bindActionCreators(Actions.ShellActions.ActionCreators, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    function RefereeHeader(props: StateProps & DispatchProps) {
        const [startDate, setStartDate] = React.useState(props.startDate)

        React.useEffect(() => {
            props.shellActions.modifyStartDate(startDate)
        }, [startDate])
    
        return <div className="layout-header">
                <label>Станом на: </label>
                <Datetime 
                    value={startDate} 
                    dateFormat={'YYYY'} 
                    timeFormat={false} 
                    closeOnSelect={true} 
                    onChange={(date) => setStartDate(new Date(date.toString()))} />
        </div>
    }
)