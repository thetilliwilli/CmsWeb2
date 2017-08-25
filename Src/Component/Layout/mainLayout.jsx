import React from "react";
import RMC from "../rmc.jsx";


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
            <div className="MainLayout">
                <LeftCanvas><RMC name="LeftCanvas" /></LeftCanvas>
                <CenterCanvas>
                    <TopBar><RMC name="TopBar" /></TopBar>
                    <MiddleBar><RMC name="MiddleBar" /></MiddleBar>
                    <BottomBar><RMC name="BottomBar" /></BottomBar>
                </CenterCanvas>
                <RightCanvas><RMC name="RightCanvas" /></RightCanvas>
            </div>
        );
    }
}

const LeftCanvas = p=><div>{p.children}</div>;
const CenterCanvas = p=><div>{p.children}</div>;
const RightCanvas = p=><div>{p.children}</div>;
const TopBar = p=><div>{p.children}</div>;
const MiddleBar = p=><div>{p.children}</div>;
const BottomBar = p=><div>{p.children}</div>;