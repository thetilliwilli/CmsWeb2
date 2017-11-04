"use strict";
import React from "react";

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete";
import Subheader from 'material-ui/Subheader';

class GoloList extends React.Component
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
        event.stopPropagation();
        this.props.OnBadgeSelect(complex);
    }

    render(){
        const filterValue = this.props.filterValue.toLowerCase();
        var items = this.Filter(this.props.goloList, filterValue);
        items = items.map(
            (ex)=>(
                <ListItem
                    style={{borderBottom:"1px solid lightgrey"}}
                    key={ex.id}
                    rightIconButton={<IconButton onClick={()=>{this.props.OnDelete(ex.id)}} iconStyle={{color:"crimson"}}><ActionDelete/></IconButton>}
                    onClick={()=>{this.props.EditGolo(ex.id)}}
                >
                    <span>
                        <span style={{color:"lightgrey"}}>{`#${("0000" + ex.id).slice(-3)}`}</span>
                        <span>{"\u00a0\u00a0"}{ex.name}</span>
                        <span className="ComplexBadge" onClick={e=>this.OnBadgeSelect(e, ex.complex)}>{ex.complex || "\u00a0?\u00a0"}</span>
                        {this.props.complex && this.props.complex !== ex.complex//если не пустая строка то
                            ? <span className="ComplexBadgeChanger" onClick={e=>{e.stopPropagation();this.props.ChangeComplexRemote(ex.id, this.props.complex)}}>{"\u279e\u00a0"}{this.props.complex}</span>
                            : null
                        }
                    </span>
                </ListItem>
            )
        );
        return (
            <List className="GoloOverview_GoloList">
                <Subheader>Список экспонатов</Subheader>
                {items}
            </List>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/goloAc.js";
const D2P = dsp => ({
    EditGolo: (goloId) => dsp(ac.EditGolo(goloId)),
    ChangeComplexRemote: (id, complex) => dsp(ac.GoloChangeComplex(id, complex)),
});
export default connect(null, D2P)(GoloList);