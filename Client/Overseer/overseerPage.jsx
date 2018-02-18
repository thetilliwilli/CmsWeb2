"use strict";

import React from "react";

import GeneralView from "./generalView.jsx";
import DetailView from "./detailView.jsx";

export default class OverseerPage extends React.Component
{
    constructor(props){
        super(props);

        this.state = {detailView: null};

        this.SetDetailView = this.SetDetailView.bind(this);
        this.ResetDetailView = this.ResetDetailView.bind(this);
    }

    SetDetailView(type){
        //Если пришло сообщение от одной и той же категории второй раз значит надо свернуть список
        if(this.state.detailView === type)
            this.setState({detailView: null});
        else
            this.setState({detailView: type});
    }

    ResetDetailView(){
        this.setState({detailView: null});
    }

    render(){
        if(!this.props.data.statuses)
            return <div>Идет загрузка данных</div>;

        const statusList = this.props.data.statuses.find( i => i.type===this.state.detailView);

        return (
            <div style={{height:"100%", width:"100%", display:"flex", flexWrap:"wrap"}} >
                <GeneralView detailType={this.state.detailView} data={this.props.data} listData={statusList} SetDetailView={this.SetDetailView} />
            </div>
        );
    }
}