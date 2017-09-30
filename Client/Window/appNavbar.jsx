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
                width={200}
                open={this.props.isNavbarOpen}
                onRequestChange={ open => open ? this.props.NavbarOpen() : this.props.NavbarClose()}
            >
                <MenuItem onClick={this.props.NavbarClose}><DivLink to="/TAG">Электронные этикетки</DivLink></MenuItem>
                <MenuItem onClick={this.props.NavbarClose}><DivLink to="/WIKI">Энциклопедия оружия</DivLink></MenuItem>
            </Drawer>
        );
    }
}

//CONTAINER-------------------------------------------------------------------------------------------------
import {connect} from "react-redux";
import * as ac from "../App/ac.js";
const S2P = state => ({
    isNavbarOpen: state.isNavbarOpen
});
const D2P = dsp => ({
    NavbarOpen: () => dsp(ac.NavbarOpen()),
    NavbarClose: () => dsp(ac.NavbarClose()),
});
export default connect(S2P, D2P)(AppNavbar);