"use strict";
import React from "react";
import {List, ListItem} from 'material-ui/List';


export default class InstSelector extends React.Component
{
    SelectedStyle(id){
        return this.props.selectedInstId === id
            ? { border:"1px solid lightgrey", }
            : { border:"1px solid rgba(0,0,0,0)" };
    }

    render(){
        const typeFilter = this.props.domain === "tag"
            ? "exhibit"
            : this.props.domain;
        const il = this.props.items
            .filter(ex => ex.type ? ex.type === typeFilter : false)
            .filter(i => this.props.filterValue
                    ? i.description ? i.description.indexOf(this.props.filterValue) !== -1 : false
                    : true
            )
            .map(i => 
                <ListItem
                    key={i.id}
                    primaryText={i.hardname || `#${i.id}`}
                    secondaryText={i.description || `Без описания`}
                    onClick={() => this.props.OnSelect(i.id)}
                    style={this.SelectedStyle(i.id)}
                />
            );
        return (
            <div style={{display:"flex", flexWrap:"wrap", overflow:"auto"}}>
                <List style={{height:"100%", width:"100%", paddingTop:"0px"}} >{/* paddingTop чтобы убить дефолтное смещение у List'a */}
                    {il}
                </List>
            </div>
        );
    }
}