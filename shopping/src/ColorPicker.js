import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {

    state = {
        isOpen: false,
        tempColor: this.props.color
    };

    openColor = () => {
        this.setState({
          isOpen: true
        });
    };

    hideColor = () => {
        this.setState({
          isOpen: false
        });
    };

    toggleColor = () => {
        this.state.isOpen ? this.hideColor() : this.openColor();
     };

    render() {

        return (
            <span >
            
                <label>Click here to change the color: </label>
                <span className="change-color" onClick={this.toggleColor} 
                style={{background:this.state.tempColor}}></span>
                <span>
                    {this.state.isOpen ? 
                        <SketchPicker
                        color={this.props.color}
                        onChange={ 
                            //(color)=> this.props.myOnChangeComplete(color)
                            (color) => {
                                this.setState({tempColor: color.hex});
                                this.props.myOnChangeComplete(color.hex);
                            }
                            
                        }
                        />
                        : 
                        ''}                
                </span>

            </span>
        );

        
    }
}

export default ColorPicker;