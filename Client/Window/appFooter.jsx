import React from 'react';
import {withRouter} from "react-router-dom";
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">NEW</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">OVERVIEW</FontIcon>;
const mockupNew = <FontIcon className="material-icons">EDIT</FontIcon>;
const mockupOverview = <FontIcon className="material-icons">MOCKUP</FontIcon>;

// const contents = [
//     "/tag/ExhibitCreatorPage",
//     "/tag/ExhibitOverview",
//     "/tag/ExhibitEdit",
//     "/tag/ExhibitMockupOverviewPage"
// ];

class AppFooter extends React.Component
{
    constructor(props){
        super(props);
        this.Select = this.Select.bind(this);
    }

    Select(index){
        const currentDomain = window.location.pathname.split("/")[1].trim().toLowerCase();
        this.props.history.push(currentDomain);//Меняем страницу
        this.props.InvokeChangePage(index);
    }

    render(){
        const currentDomain = window.location.pathname.split("/")[1].trim().toLowerCase();
        const selectedIndex = this.props.appState[`${currentDomain}Domain`].page;
        const pageItems = this.props.appState[`${currentDomain}Domain`].pages.map( (i, index) => 
            <BottomNavigationItem
                key={i.subtitle}
                label={i.subtitle}
                icon={<FontIcon className="material-icons">{i.title}</FontIcon>}
                onClick={() => this.Select(index)}
            />
        );
        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={selectedIndex}>
                    {pageItems}
                    {/* <BottomNavigationItem label="Обзор экспонатов" icon={favoritesIcon} onClick={() => this.Select(1)} />
                    <BottomNavigationItem label="Редактировать&nbsp;экспонат" icon={mockupNew} onClick={() => this.Select(2)} /> */}
                    {/* <BottomNavigationItem label="Выбрать шаблон" icon={mockupOverview} onClick={() => this.Select(3)} /> */}
                </BottomNavigation>
            </Paper>
        );
    }
}
//CONTAINER-------------------------------------------------------------------------------------------------
import {connect} from "react-redux";
import {ChangePage} from "../App/ac.js";
const S2P = state => ({
    appState: state,
});
const D2P = dsp => ({
    InvokeChangePage: index => dsp(ChangePage(index))
});
export default connect(S2P, D2P)(withRouter(AppFooter));