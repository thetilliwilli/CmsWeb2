"use strict";
import React from "react";
import { Link } from "react-router-dom";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

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
                    <Link to="/overseer" onClick={this.props.NavbarClose} style={{width:"100%", height:"15%", display:"flex", flexWrap:"wrap"}}>
                        <div className="OverseerIcon">
                            <img style={{maxWidth:"100%"}} src="/Static/icon/visualsMuseumIcon.png" />
                        </div>
                    </Link>
                    <div style={{width:"100%"}}>
                        <MenuItem style={{margin:"auto"}} onClick={this.props.NavbarClose}><DivLink to="/tag">Электронные этикетки</DivLink></MenuItem>
                    </div>
                    <div style={{width:"100%"}}>
                        <MenuItem style={{width:"100%"}} onClick={this.props.NavbarClose}><DivLink to="/tuple">Энциклопедия оружия</DivLink></MenuItem>
                    </div>
                    <div style={{width:"100%"}}>
                        <MenuItem style={{width:"100%"}} onClick={this.props.NavbarClose}><DivLink to="/golo">Сенсорные этикетки</DivLink></MenuItem>
                        <Divider />
                    </div>

                    <div style={{width:"100%", marginTop:"8px", display:"flex", flexWrap:"wrap"}}>
                        <span style={{width:"60%", margin:"auto", color:"lightgrey", fontFamily:"Roboto"}} >Предприятия</span>
                    </div>
                    <div style={{width:"100%"}}>
                        <MenuItem style={{width:"100%"}} onClick={this.props.NavbarClose}><DivLink to="/designer">Конструкторы</DivLink></MenuItem>
                    </div>
                    <div style={{width:"100%"}}>
                        <MenuItem style={{width:"100%"}} onClick={this.props.NavbarClose}><DivLink to="/bureau">Предприятия</DivLink></MenuItem>
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