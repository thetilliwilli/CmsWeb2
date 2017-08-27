import React from "react";
import RMC from "../rmc.jsx";
import {Card, CardTitle} from "material-ui/Card";

export default class MainLayout extends React.Component
{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return (
            <RMC name="MainLayout" height="100%" width="100%" hideText nobg>
                <div className="TopBar" style={{height:"5vh"}}><this.props.topBarResident /></div>

                <div className="MiddleBar" style={{height:"90vh"}}>
                    {/* <div className="PageContent" >
                        <this.props.pageContentResident />
                    </div> */}
                    <Card className="PageContent" style={{height:"100%", width:"80%", margin:"0 10% 0 10%"}}>
                        {/* <CardTitle title="PageContent" subtitle="PageContent" /> */}
                        <this.props.pageContentResident />
                    </Card>
                </div>

                {/* <RMC hide name="BottomBar" height="5vh" hideText><this.props.bottomBarResident /></RMC> */}

                <div className="SideBar" style={{position:"fixed", top:"0", left:"0", height:"100vh", width:"10vw", backgroundColor:"rgba(255,255,255,0.8)"}}>
                    <this.props.sideBarResident />
                </div>
            </RMC>
        );
    }
}

const LeftCanvas = p=><div>{p.children}</div>;
const CenterCanvas = p=><div>{p.children}</div>;
const RightCanvas = p=><div>{p.children}</div>;
const TopBar = p=><div>{p.children}</div>;
const MiddleBar = p=><div>{p.children}</div>;
const BottomBar = p=><div>{p.children}</div>;
const Navbar = p=><div>{p.children}</div>;