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
            ex=><ExhibitSummary key={ex.id} id={ex.id} coverImage={ex.coverImage} name={ex.name} title={ex.title} />
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