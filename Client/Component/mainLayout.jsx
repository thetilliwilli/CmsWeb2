import React from "react";
import {Card, CardTitle} from "material-ui/Card";

import ErrorInformer from "./errorInformer.jsx";
import GlobalErrorHandler from "./globalErrorHandler.jsx";
import SuccessInformer from "./successInformer.jsx";
import ImageViewer from "../Component/imageViewer.jsx";

import util from "../Module/util.js";

export default class MainLayout extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        const heights = util.IfLandscape({header:"7%",middle:"86%",footer:"7%"}, {header:"10%",middle:"83%",footer:"7%"});
        return (
            <div className="MainLayout" style={{display:"flex", height:"100%", width:"100%", flexWrap:"wrap"}}>
                    
                <div className="TopBar" style={{display:"flex", width:"100%", height:heights.header}}>
                    <this.props.topBarResident />
                </div>


                <div className="MiddleBar" style={{display:"flex", width:"100%", height:heights.middle, overflow:"auto"}}>
                    <this.props.pageContentResident />
                </div>

                <div name="BottomBar" style={{width:"100%", height:heights.footer, display:"flex"}}>
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