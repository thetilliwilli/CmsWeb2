import React from "react";
import RMC from "../rmc.jsx";
import {Card, CardTitle} from "material-ui/Card";

export default class MainLayout extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="MainLayout">
                
                <div className="TopBar">
                    <this.props.topBarResident />
                </div>

                <div className="MiddleBar">
                    <div className="PageContent">
                        <this.props.pageContentResident />
                    </div>
                </div>

                <div name="BottomBar">
                    <this.props.bottomBarResident />
                </div>

                {/* <div className="SideBar"> <this.props.sideBarResident /> </div> */}
            </div>
        );
    }
}