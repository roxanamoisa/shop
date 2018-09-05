import React, { Component } from 'react';
import Modal from 'react-modal';
import { SketchPicker } from 'react-color';
import ItemList from './ItemList';

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
                            <p> Choose a color and a name for the shopping list</p>
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
                            this.newSL.color = newColor.hex;

                            //this.props.changeToColor(newColor.hex);
                            this.props.onChangeSL(this.newSL);
                        }}
                        />
                        </div>

                        <div>
                            <ItemList
                                items={this.props.items}

                                onItemsChanged={this.props.onItemsChanged}

                                isReadOnly={false}
                                >
                            </ItemList>
                        </div>

                        <span>
                            New name:

                            <input
                            type="text"
                            defaultValue={this.props.shoppingList.name}
                            onBlur={ (event) => 
                                {
                                    this.newSL.name = event.target.value;
                                    this.props.onChangeSL(this.newSL);
                                }
                            }
                            />
                        </span>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default EditModal;