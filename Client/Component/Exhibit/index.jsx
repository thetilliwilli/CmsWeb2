"use strict";
import React from "react";
import LangSelector from "./langSelector.jsx";
import TitleHeader from "./titleHeader.jsx";
import ExhibitCard from "./exhibitCard.jsx";
import StaticFieldsList from "./staticFieldsList.jsx";
import {Card} from "material-ui/Card";

export default class Exhibit extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Card className="Exhibit">
                <LangSelector />
                <TitleHeader />
                <ExhibitCard />
                <StaticFieldsList />
            </Card>
        );
    }
}