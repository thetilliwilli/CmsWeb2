import React from "react";
import RMC from "./Component/rmc.jsx";
import MainLayout from "./Component/Layout/mainLayout.jsx";
// import Lang from "./Component/Exhibit/langSelector.jsx";

import AppHeader from "./Component/App/AppHeader.jsx";
import AppNavbar from "./Component/App/AppNavbar.jsx";
import AppFooter from "./Component/App/AppFooter.jsx";

import PageSelectorRouting from "./Component/Routing/PageSelectorRouting.jsx";

export default class App extends React.Component
{
    render(){
        return (
            <MainLayout
                topBarResident={AppHeader}
                sideBarResident={AppNavbar}
                bottomBarResident={AppFooter}
                pageContentResident={PageSelectorRouting}
            />
        );
    }
}