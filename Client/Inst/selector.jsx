"use strict";
import React from "react";
import {List, ListItem} from 'material-ui/List';


export default class InstSelector extends React.Component
{
    render(){
        const il = this.props.items
            .filter(i => this.props.filterValue
                    ? i.description ? i.description.indexOf(this.props.filterValue) !== -1 : false
                    : true
            )
            .map((i,inx) => 
                <ListItem
                    key={i.id}
                    primaryText={i.hardname || `#${i.id}`}
                    secondaryText={i.description || `Без описания`}
                    onClick={() => this.props.OnSelect(inx)}
                />
            );
        return (
            <div style={{display:"flex", flexWrap:"wrap"}}>
                <List style={{height:"100%", width:"100%"}} >
                    {il}
                </List>
            </div>
        );
    }
}