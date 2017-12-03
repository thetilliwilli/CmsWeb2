"use strict";
import React from "react";

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete";
import Subheader from 'material-ui/Subheader';

class DesignerList extends React.Component
{
    constructor(props){
        super(props);
    }

    Filter(list, filterValue){
        
        switch(filterValue[0])
        {
            case "#":
            case "№"://Если первый знак Решетка то ищем по айдишнику
                return list.filter(i => i.id==filterValue.slice(1));
            case "?"://Если первый знак ЗнакВопроса то ищем по витрине
                return list.filter(i => i.bureau==filterValue.slice(1));
            default://Ищем по названию
                return list.filter(i => i.fullName.toLowerCase().indexOf(filterValue.toLowerCase())!==-1);
        }
    }

    OnBadgeSelect(event, bureau){
        event.stopPropagation();
        this.props.OnBadgeSelect(bureau);
    }

    BIRQM(ex){
        return ex.bureau === 0
            ? ex.bureau
            : ex.bureau || "\u00a0?\u00a0";
    }

    render(){
        const filterValue = this.props.filterValue.toLowerCase();
        var items = this.Filter(this.props.designerList, filterValue);
        items = items.map(
            (ex)=>(
                <ListItem
                    style={{borderBottom:"1px solid lightgrey"}}
                    key={ex.id}
                    rightIconButton={<IconButton onClick={()=>{this.props.OnDelete(ex.id)}} iconStyle={{color:"crimson"}}><ActionDelete/></IconButton>}
                    onClick={()=>{this.props.EditDesigner(ex.id)}}
                >
                    <span>
                        <span style={{color:"lightgrey"}}>{`#${("0000" + ex.id).slice(-3)}`}</span>
                        <span>{"\u00a0\u00a0"}{ex.fullName}</span>
                        <span className="ComplexBadge" onClick={e=>this.OnBadgeSelect(e, ex.bureau)}>{this.BIRQM(ex)}</span>
                    </span>
                </ListItem>
            )
        );
        return (
            <List className="DesignerOverview_DesignerList">
                <Subheader>Список экспонатов</Subheader>
                {items}
            </List>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/designerAc.js";
const D2P = dsp => ({
    EditDesigner: (designerId) => dsp(ac.EditDesigner(designerId)),
});
export default connect(null, D2P)(DesignerList);