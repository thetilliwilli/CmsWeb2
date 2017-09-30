import React from "react";
import {Card, CardTitle} from "material-ui/Card";

import ErrorInformer from "./errorInformer.jsx";
import GlobalErrorHandler from "./globalErrorHandler.jsx";

export default class MainLayout extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="MainLayout" style={{height:"100%"}}>
                
                <div className="TopBar">
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

                <div className="SideBar"> <this.props.sideBarResident /> </div>

                <ErrorInformer />
                <GlobalErrorHandler />
            </div>
        );
    }
}