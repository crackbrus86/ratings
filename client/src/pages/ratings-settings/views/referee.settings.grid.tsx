import * as React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as Models from "../models/index.models"
import * as Actions from "../actions/index.actions"
import Table from "../../../components/table/table"
import { ColumnModel, ColumnTypes } from "../../../components/table/column"

interface StateProps{
    refereeSettings: Models.RefereeSetting[]
}

interface DispatchProps{
    refereeSettingsActions: typeof Actions.RefereeSettingsActions.ActionCreators
}

const mapStateToProps = (state: Models.StoreState): StateProps => ({
    refereeSettings: state.refereeSettings.settings
})

const mapDispatchToProps = (dispatch): DispatchProps => ({
    refereeSettingsActions: bindActionCreators(Actions.RefereeSettingsActions.ActionCreators, dispatch)
})

function refereeSettingGrig(props: StateProps & DispatchProps){
    return <>
    <Table items={props.refereeSettings} columns={[
                {
                    title: "Вид діяльності",
                    field: "activity",
                    width: "300px"
                },
                {
                    title: "Коефіцієнт",
                    field: "coefficient",
                    type: ColumnTypes.Input,
                    width: "120px",
                    onChange: (item: Models.RefereeSetting) => props.refereeSettingsActions.updateRefereeSetting(item)
                },
                {
                    title: "",
                    width: "*"
                }
            ] as ColumnModel[]} />
    </>
}

export default connect(mapStateToProps, mapDispatchToProps)(refereeSettingGrig)