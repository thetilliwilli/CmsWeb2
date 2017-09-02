import React from "react";
import RMC from "../rmc.jsx";
import {Card, CardTitle} from "material-ui/Card";
import Grid from 'material-ui/Grid';

export default class MainLayout extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="MainLayout" style={{height:"100%"}}>
                
                <div className="TopBar" style={{height:"10%"}}>
                    <this.props.topBarResident />
                </div>

                <div className="MiddleBar" style={{height:"80%"}}>
                    <div className="PageContent" style={{height:"100%", overflow:"auto"}}>
                        <this.props.pageContentResident />
                    </div>
                </div>

                <div name="BottomBar" style={{height:"5%"}}>
                    <this.props.bottomBarResident />
                </div>

                {/* <div className="SideBar"> <this.props.sideBarResident /> </div> */}
            </div>
        );
    }
}