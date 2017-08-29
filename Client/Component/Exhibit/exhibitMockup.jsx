import React from "react";


export default class ExhibitMockup extends React.Component
{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        alert("Mount");
    }

    componentWillUnmount(){
        alert("Unmount");
    }

    render(){
        return <div>Its exhibit mockup</div> ;
    }
}