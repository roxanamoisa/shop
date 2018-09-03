import React, { Component } from 'react';
import Modal from 'react-modal';
import { SketchPicker } from 'react-color';

class EditModal extends Component {
    tempColor = '#FF0000';
    newSL = this.props.shoppingList;

    state = {
        isOpen: false
    };

    openModal = () => {
        this.setState({
          isOpen: true
        });
    };

    hideModal = () => {
        this.setState({
          isOpen: false
        });
    };

    render() {

        
        return (
            <div>
                <button type="button" className="btn btn-sm btn-success" onClick={this.openModal}>Edit</button>

                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    isOpen={this.state.isOpen}
                    onRequestHide={this.hideModal}>

                    <div className="modal-content">
                
                        <div className="modal-header">
                            <div onClick={this.hideModal}/>
                            <div>Edit mode</div>
                        </div>

                        <div  className="modal-body">
                            <p> Select a new color for the shopping list</p>
                        </div>

                        <div className="modal-footer">
                            <button className='btn btn-default' onClick={this.hideModal}>
                                Cancel
                            </button>
                            <button className='btn btn-primary' onClick={this.hideModal}>
                                Yes
                            </button>
                        </div>

                        <div>
                        <SketchPicker color={ this.newSL.color } 
                        onChangeComplete={(newColor) => {
                            //this.tempColor = newColor;
                            this.newSL.color = newColor;

                            //this.props.changeToColor(newColor.hex);
                            this.props.onChangeSL(this.newSL);
                        }}
                        />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default EditModal;