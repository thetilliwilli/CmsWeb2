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
                {
                    this.state.detailView
                        ? <DetailView data={statusList} ResetDetailView={this.ResetDetailView}  />
                        : <GeneralView data={this.props.data} SetDetailView={this.SetDetailView} />
                }
            </div>
        );
    }
}