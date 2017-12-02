import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';

import {DEFAULT_IMAGE_AVATAR} from "../Module/consts.js";

const imageTitleStyle = {fontFamily:"Roboto", color:"lightgrey", margin:"auto"};

class UploadImage extends React.Component {
    constructor(props) {
        super(props);

        this.OnFileSelected = this.OnFileSelected.bind(this);
        this.OnImageClick = this.OnImageClick.bind(this);

        this.fileUploadInput = null;
    }

    OnFileSelected(event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        let self = this;
        reader.onload = function (event) {
            self.props.onFileChanged(event.target.result);
        };

        reader.readAsDataURL(selectedFile);
    }

    OnImageClick(){
        this.fileUploadInput.click();
    }

    render() {
        const imageSrc = this.props.imageSrc || DEFAULT_IMAGE_AVATAR;
        return (
            <div>
                <img className="DesignerCard_image" onClick={this.OnImageClick} src={imageSrc}
                    style={{marginLeft:"16px", boxShadow:"0px 0px 2px 0px grey" , maxWidth:"100px", maxHeight:"100px", backgroundSize: "contain", cursor: 'pointer'}}/>
                <input ref={(input)=>{this.fileUploadInput = input;}} type="file"
                    style={{display:"none"}} onChange={this.OnFileSelected} accept=".png,.jpg,.jpeg" />
            </div>
        );
    }
}

export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
        props.RegCom(this);
        
        this.ChangeImage = this.ChangeImage.bind(this);
        this.state = {
            imageSrcPreview: props.previewHref,
            imageSrcLogotype: props.logotypeHref,
        };
    }

    ChangeImage(newSrc, isPreview){
        this.setState({
            [isPreview ? "imageSrcPreview" : "imageSrcLogotype"]: newSrc
        });
    }

    Data(){ 
        return {
            previewSrc: this.state.imageSrcPreview,
            logotypeSrc: this.state.imageSrcLogotype
        };
    }

    render() {
        return (
            <div className="DesignerCard" >
                <CardHeader  subtitle="КАРТОЧКА" style={{padding:"6px 16px 6px 16px"}}/>
                <div style={{display:"flex", flexWrap:"wrap"}} >

                    <div style={{width:"40%", display:"flex", flexWrap:"wrap"}}>
                        <div style={imageTitleStyle}>ПРЕВЬЮ</div>
                        <UploadImage onFileChanged={e=>this.ChangeImage(e,true)} imageSrc={this.state.imageSrcPreview}/>
                    </div>

                    <div style={{width:"40%", display:"flex", flexWrap:"wrap"}}>
                        <div style={imageTitleStyle}>ЛОГОТИП</div>
                        <UploadImage onFileChanged={this.ChangeImage} imageSrc={this.state.imageSrcLogotype}/>
                    </div>

                </div>
            </div>
        );
    }
}