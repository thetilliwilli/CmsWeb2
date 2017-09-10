"use strict";
import React from "react";

import ExhibitSummary from "./exhibitSummary.jsx";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class ExhibitList extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        var tableRows = this.props.exhibitList.map(
            ex=>(
                <TableRow key={ex.id}>
                    <TableRowColumn><img src={ex.coverImage} width="50" height="50"></img></TableRowColumn>
                    <TableRowColumn>{ex.id}</TableRowColumn>
                    <TableRowColumn>{ex.name}</TableRowColumn>
                    <TableRowColumn>{ex.title}</TableRowColumn>
                </TableRow>
            )
        );
        return (
            <Table className="ExhibitOverview_ExhibitList">
                <TableHeader>
                    <TableRow>
                    <TableHeaderColumn>IMAGE</TableHeaderColumn>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>NAME</TableHeaderColumn>
                    <TableHeaderColumn>TITLE</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        );
    }
}