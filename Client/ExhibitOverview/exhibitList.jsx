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
        this.OnBadgeSelect = this.OnBadgeSelect.bind(this);
    }

    Filter(list, filterValue){
        
        switch(filterValue[0])
        {
            case "#"://Если первый знак Решетка то ищем по айдишнику
            case "№":
                return list.filter(i => i.id==filterValue.slice(1));
            case "?"://Если первый знак ЗнакВопроса то ищем по витрине
                return list.filter(i => i.complex==filterValue.slice(1));
            //Ищем по названию
            default: return list.filter(i => i.name.toLowerCase().indexOf(filterValue.toLowerCase())!==-1);
        }
    }

    OnBadgeSelect(event, complex){
        event.nativeEvent.preventDefault();
        event.nativeEvent.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
        this.props.OnBadgeSelect(complex);
    }

    render(){
        const filterValue = this.props.filterValue.toLowerCase();
        var items = this.Filter(this.props.exhibitList, filterValue);
        items = items.map(
            (ex)=>(
                <ListItem
                    style={{borderBottom:"1px solid lightgrey"}}
                    key={ex.id}
                    primaryText={<span>
                            <span style={{color:"lightgrey"}}>{`#${("0000" + ex.id).slice(-3)}`}</span>
                            <span>{ex.name}</span>
                            <span className="ComplexBadge" onMouseDown={e=>this.OnBadgeSelect(e, ex.complex)}>{ex.complex || "\u00a0?\u00a0"}</span>
                    </span>}
                    rightIconButton={<IconButton onClick={()=>{this.props.OnDelete(ex.id)}} iconStyle={{color:"crimson"}}><ActionDelete/></IconButton>}
                    onClick={()=>{this.props.EditExhibit(ex.id)}}
              />
            )
        );
        return (
            <List className="ExhibitOverview_ExhibitList">
                <Subheader>Список экспонатов</Subheader>
                {items}
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