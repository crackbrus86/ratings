import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../../models/index.models";
import * as Actions from "../../actions/index.actions";
import Table from "../../../../components/table/table";
import {ColumnModel, ColumnTypes} from "../../../../components/table/column";

interface StateProps{
    ratings: Models.Rating[]
}

interface DispatchProps{
    actions: typeof Actions.RatingsActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState):StateProps => ({
        ratings: state.ratings.upfRatings
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.RatingsActions.ActionCreators, dispatch)
    })
)(class UPFRatings extends React.Component<StateProps & DispatchProps>{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.actions.loadUPFRatings();
    }

    render(){
        return <div  className="ratings">
            <Table 
                items={this.props.ratings}
                columns={[
                    {
                        title: "П.І.П",
                        field: "fullname",
                        width: "300px",
                    },
                    {
                        title: "К-ть очок",
                        field: "rating",
                        width: "100px"
                    },
                    {
                        title: "",
                        width: "*"
                    }
                ] as ColumnModel[]}
             />
        </div>
    }
})