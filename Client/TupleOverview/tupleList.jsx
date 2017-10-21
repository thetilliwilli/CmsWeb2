"use strict";
import React from "react";

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete";
import Subheader from 'material-ui/Subheader';

class TupleList extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        const filterValue = this.props.filterValue.toLowerCase();
        var tableRows = this.props.tupleList.filter( i => filterValue[0]==="#" || filterValue[0]==="№"//Если первый знак Решетка то ищем по айдишнику
            ? i.id==filterValue.slice(1)
            : i.name.toLowerCase().indexOf(filterValue.toLowerCase())!==-1
        );
        tableRows = tableRows.map(
            (ex)=>(
                <ListItem
                    style={{borderBottom:"1px solid lightgrey"}}
                    key={ex.id}
                    primaryText={<span> <span style={{color:"lightgrey"}}>{`#${("0000" + ex.id).slice(-3)}`}</span> <span>{ex.name}</span> </span>}
                    rightIconButton={<IconButton onClick={()=>{this.props.OnDelete(ex.id)}} iconStyle={{color:"crimson"}}><ActionDelete/></IconButton>}
                    onClick={()=>{this.props.EditTuple(ex.id)}}
              />
            )
        );
        return (
            <List className="TupleOverview_TupleList">
                <Subheader>Список экспонатов</Subheader>
                {tableRows}
            </List>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/tupleAc.js";
const D2P = dsp => ({
    EditTuple: (tupleId) => dsp(ac.EditTuple(tupleId))
});
export default connect(null, D2P)(TupleList);