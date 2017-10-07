"use strict";
import React from "react";

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete";
import Subheader from 'material-ui/Subheader';

class ExhibitList extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        var tableRows = this.props.exhibitList.filter(i=>i.name.toLowerCase().indexOf(this.props.filterValue.toLowerCase())!==-1);
        tableRows = tableRows.map(
            (ex)=>(
                <ListItem
                    style={{borderBottom:"1px solid lightgrey"}}
                    key={ex.id}
                    primaryText={<span> <span style={{color:"lightgrey"}}>{`#${("0000" + ex.id).slice(-3)}`}</span> <span>{ex.name}</span> </span>}
                    rightIconButton={<IconButton onClick={()=>{this.props.OnDelete(ex.id)}} iconStyle={{color:"crimson"}}><ActionDelete/></IconButton>}
                    onClick={()=>{this.props.EditExhibit(ex.id)}}
              />
            )
        );
        return (
            <List className="ExhibitOverview_ExhibitList">
                <Subheader>Список экспонатов</Subheader>
                {tableRows}
            </List>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/ac.js";
const D2P = dsp => ({
    EditExhibit: (exhibitId) => dsp(ac.EditExhibit(exhibitId))
});
export default connect(null, D2P)(ExhibitList);