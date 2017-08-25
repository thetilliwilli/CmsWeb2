import React from "react";
import RMC from "./Component/rmc.jsx";
import MainLayout from "./Component/Layout/mainLayout.jsx";
import Lang from "./Component/Exhibit/langSelector.jsx";

export default class App extends React.Component
{
    render(){
        return (
            <MainLayout>
                <RMC name="App" color="coral" x="100" y="100" width="500">Lang</RMC>
            </MainLayout>
        );
    }
}