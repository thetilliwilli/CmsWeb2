import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';

export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
        props.RegCom(this);
        
        this.ChangeImage = this.ChangeImage.bind(this);
        this.state = {imageSrc: ""};
    }

    ChangeImage(newSrc){
        this.setState({imageSrc: newSrc});
    }

    Data(){ return {src: this.state.imageSrc} }

    render() {
        return (
            <div className="GoloCard">
                <CardHeader  subtitle="ВИДЕО" />
                <UploadImage onFileChanged={this.ChangeImage} imageSrc={this.state.imageSrc}/>
            </div>
        );
    }
}

// Avatar.defaultProps = {
//     imageHref: "/static/img/defaultGoloAvatar.jpg"
// };

class UploadImage extends React.Component {
    constructor(props) {
        super(props);

        this.OnFileSelected = this.OnFileSelected.bind(this);
        this.OnImageClick = this.OnImageClick.bind(this);

        this.fileUploadInput = null;
        this.videoElement = null;
    }

    OnFileSelected(event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        let self = this;
        reader.onload = function (event) {
            self.props.onFileChanged(event.target.result);
            self.videoElement.load();
        };

        reader.readAsDataURL(selectedFile);
    }

    OnImageClick(){
        this.fileUploadInput.click();
    }

    render() {
        return (
            <div style={{minHeight:"140px"}}>
                <RaisedButton onClick={this.OnImageClick} label="Upload" />
                <video style={{height:"240px", width:"240px"}} ref={el => this.videoElement=el} controls>
                    <source src={this.props.imageSrc} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                <input ref={(input)=>{this.fileUploadInput = input;}} type="file"
                    style={{display:"none"}} onChange={this.OnFileSelected} accept=".mp4" />
            </div>
        );
    }
}