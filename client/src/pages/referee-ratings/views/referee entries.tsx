import * as React from "react";
import {connect} from "react-redux";
import * as Models from "../models/index.models";

interface StateProps{
    entries: Models.TestRefereeEntry[]
}

const mapStateToProps = (state: Models.StoreState): StateProps => ({
    entries: state.test.refereeEntries
});

export default connect(mapStateToProps)(
    function EntriesTable(props: StateProps){
        return <>
            {
                !!props.entries.length &&
                <ul>
                    {
                        props.entries.map((x, index) => <li key={index}>{x.name}</li>)
                    }
                </ul>
            }
        </>
    }
)