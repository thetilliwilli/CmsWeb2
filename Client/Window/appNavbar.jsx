"use strict";
import React from "react";
import { Link } from "react-router-dom";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

function DivLink(p) {
    return (
        <Link className="DivLink" to={p.to}>
            <div>{p.children}</div>
        </Link>
    );
}
class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Drawer
                docked={false}
                width={260}
                open={this.props.isNavbarOpen}
                onRequestChange={ open => open ? this.props.NavbarOpen() : this.props.NavbarClose()}
            >
            <div style={{display:"flex", flexWrap:"wrap"}}>
                    <div style={{width:"100%", height:"15%", display:"flex"}} >
                        <div style={{width:"50%",margin:"16px auto 16px auto", boxShadow:"0px 0px 10px 2px lightgrey", borderRadius:"25px"}}>
                            <img style={{maxWidth:"100%"}} src="/Static/icon/visualsMuseumIcon.png" />
                        </div>
                    </div>
                    <div style={{width:"100%"}}>
                        <MenuItem style={{margin:"auto"}} onClick={this.props.NavbarClose}><DivLink to="/tag">Электронные этикетки</DivLink></MenuItem>
                    </div>
                    <div style={{width:"100%"}}>
                        <MenuItem style={{width:"100%"}} onClick={this.props.NavbarClose}><DivLink to="/tuple">Энциклопедия оружия</DivLink></MenuItem>
                    </div>
                    <div style={{width:"100%"}}>
                        <MenuItem style={{width:"100%"}} onClick={this.props.NavbarClose}><DivLink to="/golo">Голографические этикетки</DivLink></MenuItem>
                    </div>
            </div>
            </Drawer>
        );
    }
}

//CONTAINER-------------------------------------------------------------------------------------------------
import {connect} from "react-redux";
import * as ac from "../App/ac.js";
const S2P = state => ({
    isNavbarOpen: state.tagDomain.isNavbarOpen
});
const D2P = dsp => ({
    NavbarOpen: () => dsp(ac.NavbarOpen()),
    NavbarClose: () => dsp(ac.NavbarClose()),
});
export default connect(S2P, D2P)(AppNavbar);