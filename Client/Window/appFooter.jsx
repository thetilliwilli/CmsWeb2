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
        //HACK - иногда проскакивает root Url = "http://domainAddress/" в таком случае заполняем фейковыми данными (данные о странице)
        const selectedIndex = currentDomain==="" ? 0 : this.props.appState[`${currentDomain}Domain`].page;
        var pages = currentDomain==="" ? [] : this.props.appState[`${currentDomain}Domain`].pages;
        const pageItems = pages.map( (i, index) => 
            <BottomNavigationItem
                key={i.subtitle}
                label={i.subtitle}
                icon={<FontIcon className="material-icons">{i.title}</FontIcon>}
                onClick={() => this.Select(index)}
            />
        );
        return (
                <BottomNavigation selectedIndex={selectedIndex} style={{width:"100%", height:"100%", boxShadow:"0px 0px 7px 0px grey"}}>
                    {pageItems}
                </BottomNavigation>
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