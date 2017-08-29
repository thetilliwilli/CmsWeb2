import React, {Component} from 'react';
import {Switch, Redirect} from "react-router-dom";
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import PageSelector from "../Routing/pageSelector.jsx";

const recentsIcon = <FontIcon className="material-icons">NEW</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">OVERVIEW</FontIcon>;
const mockupNew = <FontIcon className="material-icons">MOCKUP</FontIcon>;
const mockupOverview = <FontIcon className="material-icons">MOCKUP</FontIcon>;

class AppFooter extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 0,
          };
        this.Select = this.Select.bind(this);
    }

    Select(index){
        this.setState({selectedIndex: index});
        this.props.ChangePage(index);
    }
    
    render(){
        return (
            <Paper zDepth={1}>
                <PageSelector pageIndex={this.state.selectedIndex} />
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem label="Создать экспонат" icon={recentsIcon} onClick={() => this.Select(0)} />
                    <BottomNavigationItem label="Обзор экспонатов" icon={favoritesIcon} onClick={() => this.Select(1)} />
                    <BottomNavigationItem label="Создать шаблон" icon={mockupNew} onClick={() => this.Select(2)} />
                    <BottomNavigationItem label="Выбрать шаблон" icon={mockupOverview} onClick={() => this.Select(3)} />
                </BottomNavigation>
            </Paper>
        );
    }
}

export default AppFooter;