import React from "react";


export default class ExhibitImageGallery extends React.Component
{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        alert("Mount Gallery");
    }

    componentWillUnmount(){
        alert("Unmount Gallery");
    }

    render(){
        return <div>IMAGE GALLERY HERE</div>;
    }
}