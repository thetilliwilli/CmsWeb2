"use strict";
import React from "react";

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete";
import Subheader from 'material-ui/Subheader';

class BureauList extends React.Component
{
    constructor(props){
        super(props);
    }

    Filter(list, filterValue){
        
        switch(filterValue[0])
        {
            case "#"://Если первый знак Решетка то ищем по айдишнику
            case "№":
                return list.filter(i => i.id==filterValue.slice(1));
            //Ищем по названию
            default:
                return list.filter(i => i.fullName.toLowerCase().indexOf(filterValue.toLowerCase())!==-1);
        }
    }

    render(){
        const filterValue = this.props.filterValue.toLowerCase();
        var items = this.Filter(this.props.bureauList, filterValue);
        items = items.map(
            (ex)=>(
                <ListItem
                    style={{borderBottom:"1px solid lightgrey"}}
                    key={ex.id}
                    onClick={()=>{this.props.EditBureau(ex.id)}}
                >
                    <span>
                        <span style={{color:"lightgrey"}}>{`#${("0000" + ex.id).slice(-3)}`}</span>
                        <span>{"\u00a0\u00a0"}{ex.fullName}</span>
                    </span>
                </ListItem>
            )
        );
        return (
            <List className="BureauOverview_BureauList">
                <Subheader>Список экспонатов</Subheader>
                {items}
            </List>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/bureauAc.js";
const D2P = dsp => ({
    EditBureau: (bureauId) => dsp(ac.EditBureau(bureauId)),
});
export default connect(null, D2P)(BureauList);