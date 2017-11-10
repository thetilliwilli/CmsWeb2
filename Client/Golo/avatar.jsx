import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';

import {DEFAULT_IMAGE_AVATAR} from "../Module/consts.js";

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
        return (
            <div style={{height:"240px", display:"flex", flexWrap:"wrap", marginLeft:"10px"}}>
                <div style={{width:"100%"}} >
                    <RaisedButton onClick={this.OnImageClick} label="ВЫБРАТЬ" />
                    <RaisedButton onClick={this.props.ResetVideo} label="УДАЛИТЬ" />
                </div>
                <div style={{width:"100%"}}>
                    <video style={{maxHeight:"200px"}} ref={el => el && el.load()} controls>
                        <source src={this.props.imageSrc} type="video/mp4"/>
                        Ваш браузер не поддерживает видео
                    </video>
                    <input ref={(input)=>{this.fileUploadInput = input;}} type="file"
                        style={{display:"none"}} onChange={this.OnFileSelected} accept=".mp4" />
                </div>
            </div>
        );
    }
}

export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
        props.RegCom(this);
        
        this.ChangeImage = this.ChangeImage.bind(this);
        this.ResetVideo = this.ResetVideo.bind(this);
        this.state = {imageSrc: props.imageHref};
    }

    ChangeImage(newSrc){
        this.setState({imageSrc: newSrc});
    }

    Data(){ return {src: this.state.imageSrc} }

    ResetVideo(){ this.setState({imageSrc: ""}); }

    render() {
        return (
            <div className="GoloCard">
                <CardHeader  subtitle="ВИДЕО" style={{padding:"6px 16px 6px 16px"}} />
                <UploadImage onFileChanged={this.ChangeImage} imageSrc={this.state.imageSrc} ResetVideo={this.ResetVideo} />
            </div>
        );
    }
}