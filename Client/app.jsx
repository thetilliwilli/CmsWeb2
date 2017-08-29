import React from "react";
import RMC from "./Component/rmc.jsx";
import MainLayout from "./Component/Layout/mainLayout.jsx";

import AppHeader from "./Component/App/AppHeader.jsx";
import AppNavbar from "./Component/App/AppNavbar.jsx";
import AppFooter from "./Component/App/AppFooter.jsx";

import PageSelectorRouting from "./Component/Routing/pageSelectorRouting.jsx";

export default class App extends React.Component
{
    constructor(props){
        super(props);
        this.state = {pageIndex: 0};
        this.ChangePage = this.ChangePage.bind(this);
    }

    ChangePage(pageIndex){
        this.setState({pageIndex: pageIndex});
    }

    render(){
        const ReadyAppFooter = <AppFooter ChangePage={this.ChangePage} />;
        const ReadyPageSelectorRouting = <PageSelectorRouting pageIndex={this.state.pageIndex} />;
        return (
            <MainLayout
                topBarResident={AppHeader}
                sideBarResident={AppNavbar}
                bottomBarResident={ReadyAppFooter}
                pageContentResident={ReadyPageSelectorRouting}
            />
        );
    }
}