import React from 'react';
import {Switch, Redirect} from "react-router-dom";

const contents = [
    "/ExhibitCreatorPage",
    "/ExhibitOverview",
    "/MockupCreatePage",
    "/ExhibitMockupOverviewPage"
];

export default function PageSelector(p){
    return <Redirect to={contents[p.pageIndex]}/>;
}