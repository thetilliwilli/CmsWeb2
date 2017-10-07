import React from "react";
import AppHeader from "../Window/AppHeader.jsx";
import AppNavbar from "../Window/AppNavbar.jsx";
import AppFooter from "../Window/AppFooter.jsx";
import MainRouting from "../Component/mainRouting.jsx";
import MainLayout from "../Component/mainLayout.jsx";

export default class App extends React.Component
{
    constructor(props){
        super(props);
    }


    componentDidMount(){
        window.addEventListener("dragenter", this.PreventDefaultBehaviour);
        window.addEventListener("dragover", this.PreventDefaultBehaviour);
        window.addEventListener("drop", this.PreventDefaultBehaviour);
    }

    PreventDefaultBehaviour(event){
        event.stopPropagation();
        event.preventDefault();
    }

    render(){
        return (
            <MainLayout
                topBarResident={AppHeader}
                sideBarResident={AppNavbar}
                bottomBarResident={AppFooter}
                pageContentResident={MainRouting}
            />
        );
    }
}