import React from "react";

class ReactMockupComponent extends React.Component
{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return (
            <div className="ReactMockupComponent" style={{
                backgroundColor: this.props.color,
                border: this.props.border,
                boxSizing: this.props.boxSizing,
                position: this.props.position,
                left: this.props.x,
                top: this.props.y,
                width: this.props.width,
                height: this.props.height,
            }}>
                {this.props.name}
            </div>
        );
            
    }
}

ReactMockupComponent.defaultProps = {
    color: "white",
    border: "1px solid grey",
    boxSizing: "border-box",
    position: "relative",
    left: "0px",
    top: "0px",
    width: "100%",
    height: "100%",

    name: "ReactMockupComponent"
};

export default ReactMockupComponent;