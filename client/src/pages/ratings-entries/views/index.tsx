import * as React from "react";
import TabView from "../../../components/tab view/tab.view";
import Tab from "../../../components/tab view/tab";
import Modal from "../../../components/modal/modal";
import * as Datetime from "react-datetime";
import * as moment from "moment";

interface ModalProps{
    isVisible: boolean,
    onClose: () => void
}
const MiniModal = (props: ModalProps) => {
    if(!props.isVisible) return null;
    return <Modal>
        <div style={{width: "300px"}}>Hi!</div>
        <button onClick={() => props.onClose()}>Close</button>
    </Modal>
}

interface RatingEntriesIndexState{
    showModal: boolean,
    businessDate: Date
}

export default class RatingEntriesIndex extends React.Component<any, RatingEntriesIndexState>{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            businessDate: new Date()
        }
    }

    showModal = () => this.setState({showModal: true});
    hideModal = () => this.setState({showModal: false});
    changeBusinessDate = (date?: string) => { 
        let newBusinessDate = !isNaN(new Date(date).getTime()) ? new Date(date) : null;
        this.setState({businessDate: newBusinessDate});
    }

    render(){
        return <>
            <TabView>
                <Tab title="Записи рейтингів" label="ratingEntries"><div>
                    <p>123</p>
                    <div><button onClick={this.showModal}>Show Modal</button></div>
                </div></Tab>
                <Tab title="Рейтинги ФПУ" label="fpuRatings"><div>234
                    <Datetime 
                    value={this.state.businessDate} 
                    dateFormat={'DD-MM-YYYY'} 
                    timeFormat={false} 
                    closeOnSelect={true} 
                    onChange={(date) => this.changeBusinessDate(date.toString())} />
                    </div></Tab>
            </TabView>
            <MiniModal isVisible={this.state.showModal} onClose={this.hideModal} />
        </>
    }
}