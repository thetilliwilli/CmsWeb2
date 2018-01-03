import React from "react";
import {Card, CardTitle} from "material-ui/Card";

import ErrorInformer from "./errorInformer.jsx";
import GlobalErrorHandler from "./globalErrorHandler.jsx";
import SuccessInformer from "./successInformer.jsx";
import ImageViewer from "../Component/imageViewer.jsx";

export default class MainLayout extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="MainLayout" style={{display:"flex", height:"100%", width:"100%", flexWrap:"wrap"}}>
                    
                <div className="TopBar" style={{width:"100%", height:"7%"}}>
                    <this.props.topBarResident />
                </div>


                <div className="MiddleBar" style={{width:"100%", height:"86%", overflow:"auto"}}>
                    <this.props.pageContentResident />
                </div>

                <div name="BottomBar" style={{width:"100%", height:"7%", display:"flex"}}>
                    <this.props.bottomBarResident />
                </div>

                <div className="SideBar"> <this.props.sideBarResident /> </div>

                <ErrorInformer />
                <GlobalErrorHandler />
                <SuccessInformer />
                <ImageViewer />
            </div>
        );
    }
}