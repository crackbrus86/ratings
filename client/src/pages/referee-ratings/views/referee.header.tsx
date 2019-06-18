import * as React from "react";
import {connect} from "react-redux";
import * as Datetime from "react-datetime";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";
import * as Reducers from "../reducers/index.reducer";
import {bindActionCreators} from "redux";

interface DispatchProps {
    testActions: typeof Actions.TestActions.ActionCreators;
}

const mapStateToProps = (state: () => Models.StoreState) => ({

})

const mapDispatchToProps = (dispatch): DispatchProps => ({
    testActions: bindActionCreators(Actions.TestActions.ActionCreators, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    function RefereeHeader(props: DispatchProps) {
        const [startDate, setStartDate] = React.useState(new Date(new Date().getFullYear(), 0, 1))

        React.useEffect(() => {
            props.testActions.getTestRefereeEntries(startDate.getFullYear());
        }, [startDate])
    
        return <div className="referee-header">
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