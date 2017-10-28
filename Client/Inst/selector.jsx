"use strict";
import React from "react";
import {List, ListItem} from 'material-ui/List';



export default class InstSelector extends React.Component
{
    render(){
        const il = this.props.items.map((i,inx) => 
            <ListItem
                key={i.id}
                primaryText={i.hardname}
                onClick={() => this.props.OnSelect(inx)}
            />
        );
        return (
            <List style={{height:"100%", width:"100%"}} >
                {il}
            </List>
        );
    }
}