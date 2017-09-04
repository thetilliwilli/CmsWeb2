import React from "react";
import MainLayout from "../Component/mainLayout.jsx";
import AppHeader from "../Component/Window/AppHeader.jsx";
import AppNavbar from "../Component/Window/AppNavbar.jsx";
import AppFooter from "../Component/Window/AppFooter.jsx";
import PageSelectorRouting from "../Component/MainRouting.jsx";

export default class App extends React.Component
{
    constructor(props){
        super(props);
    }


    componentDidMount(){
        console.log("App componentDidMount");
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
                pageContentResident={PageSelectorRouting}
            />
        );
    }
}