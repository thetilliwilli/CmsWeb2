"use strict";
import React from 'react';
import {withRouter} from "react-router-dom";
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import AddIcon from "material-ui/svg-icons/content/add";
import CreateIcon from "material-ui/svg-icons/content/create";
import FilterListIcon from "material-ui/svg-icons/content/filter-list";


import util from "../Module/util.js";

const TitleToIconMap = {
    NEW: <AddIcon />,
    OVERVIEW: <FilterListIcon />,
    EDIT: <CreateIcon />,
};

class AppFooter extends React.Component
{
    constructor(props){
        super(props);
        this.Select = this.Select.bind(this);
    }

    _DefineFunctionName(currentDomain){
        switch(currentDomain)
        {
            case "tag":
                return "Exhibit";
            case "tuple": case "golo": case "designer": case "bureau":
                return currentDomain.charAt(0).toUpperCase()+currentDomain.slice(1);
            default:
                throw new Error("Такой страницы не существует. Вы будете перенаправлены на главную страницу.");
        }
    }

    Select(index){
        const currentDomain = util.CurrentDomain();
        this.props.history.push(currentDomain);//Меняем страницу
        const functionName = this._DefineFunctionName(currentDomain);
        this.props[`${functionName}ChangePage`](index);
    }

    render(){
        const currentDomain = util.CurrentDomain();
        //HACK - иногда проскакивает root Url = "http://domainAddress/" в таком случае заполняем фейковыми данными (данные о странице)
        const selectedIndex = currentDomain==="" || currentDomain==="overseer"
            ? 0
            : this.props.appState[`${currentDomain}Domain`].page;
        var pages = currentDomain==="" || currentDomain==="overseer"
            ? []
            : this.props.appState[`${currentDomain}Domain`].pages;
        const pageItems = pages.map( (i, index) => 
            <BottomNavigationItem
                key={i.subtitle}
                label={i.ruTitle}
                icon={TitleToIconMap[i.title]}
                onClick={() => this.Select(index)}
            />
        );
        return (
                <BottomNavigation selectedIndex={selectedIndex} style={{width:"100%", height:"100%", boxShadow:"0px 0px 7px 0px grey"}}>
                    {pageItems}
                </BottomNavigation>
        );
    }
}
//CONTAINER-------------------------------------------------------------------------------------------------
import {connect} from "react-redux";
import {ExhibitChangePage} from "../App/ac.js";
import {TupleChangePage} from "../App/tupleAc.js";
import {GoloChangePage} from "../App/goloAc.js";
import {DesignerChangePage} from "../App/designerAc.js";
import {BureauChangePage} from "../App/bureauAc.js";
const S2P = state => ({
    appState: state,
});
const D2P = dsp => ({
    ExhibitChangePage: index => dsp(ExhibitChangePage(index)),
    TupleChangePage: index => dsp(TupleChangePage(index)),
    GoloChangePage: index => dsp(GoloChangePage(index)),
    DesignerChangePage: index => dsp(DesignerChangePage(index)),
    BureauChangePage: index => dsp(BureauChangePage(index)),
});
export default connect(S2P, D2P)(withRouter(AppFooter));