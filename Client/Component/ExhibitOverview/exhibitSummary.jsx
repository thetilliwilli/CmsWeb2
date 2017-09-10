"use strict";
import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
// import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const Controls = function(props){
    return (
        <div className="ExhibitSummary_Controls">
            <IconButton>
                <EditIcon />
            </IconButton>
            {/* <RaisedButton label="Edit" onClick={props.OnEdit} />
            <RaisedButton label="Delete" onClick={props.OnDelete} />
            <RaisedButton label="Edit" onClick={props.OnEdit} />
            <RaisedButton label="Edit" onClick={props.OnEdit} /> */}
        </div>
    );
}

const SummaryInfo = function(props){
    // const style={};
    return (
        <TableRow key={props.id}>
            <TableRowColumn><img src={props.coverImage} width="50" height="50"></img></TableRowColumn>
            <TableRowColumn>{props.id}</TableRowColumn>
            <TableRowColumn>{props.name}</TableRowColumn>
            <TableRowColumn>{props.title}</TableRowColumn>
        </TableRow>
    );
}

export default class ExhibitSummary extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        // coverImage={this.props.coverImage} id={this.props.id} name={this.props.name} title={this.props.title}
        return (
                <SummaryInfo {...this.props}/>
        );
    }
}