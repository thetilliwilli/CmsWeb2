import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

export default class ExhibitCard extends React.Component {
    constructor(props) {
        super(props);
        this.ChangeImage = this.ChangeImage.bind(this);
        this.state = {imageSrc: this.props.imageHref};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    ChangeImage(newSrc){
        this.setState({imageSrc: newSrc});
    }

    render() {
        return (
            <div className="ExhibitCard">
                <div className="ExhibitCard_title">{this.props.title}</div>
                <img className="ExhibitCard_image" src={this.state.imageSrc} style={{height:"200px",width:"200px", backgroundSize: "contain"}}/>
                <UploadButton onFileChanged={this.ChangeImage}/>
            </div>
        );
    }
}

ExhibitCard.defaultProps = {
    imageHref: "http://www.imasgrafica.com/images/nophotomaxi.jpg"
};

class UploadButton extends React.Component {
    constructor(props) {
        super(props);
        this.onFileSelected = this.onFileSelected.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onFileSelected(event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        let self = this;
        reader.onload = function (event) {
            self.props.onFileChanged(event.target.result);
        };

        reader.readAsDataURL(selectedFile);
    }

    render() {
        return (
            <RaisedButton className="ExhibitCard_upload" label="Choose an Image" labelPosition="before" style={{ verticalAlign: 'middle' }} containerElement="label">
                <input type="file" style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0, }} onChange={this.onFileSelected} />
            </RaisedButton>
        );
    }
}