import React, { Component } from 'react';
import Modal from 'react-modal';
import { SketchPicker } from 'react-color';
import ItemList from './ItemList';
import ColorPicker from './ColorPicker';

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
                            <div>Choose a color and a name for the shopping list</div>
                        </div>

                        <div  className="modal-body">

                            <span>
                                <label htmlFor="shoppingListId">New name: </label>

                            <input id="shoppingListId"
                                type="text"
                                defaultValue={this.props.shoppingList.name}
                                onBlur={ (event) => 
                                    {
                                        this.newSL.name = event.target.value;
                                        //this.props.onChangeSL(this.newSL);
                                    }
                                }
                            />
                        </span>

                            <div>
                            <ColorPicker 
                            color={this.newSL.color}
                            myOnChangeComplete={ (newColor) => {
                                this.newSL.color = newColor;
                                //this.props.onChangeSL(this.newSL);
                            } }
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

                            </div>

                            <div className="modal-footer">
                                <button className='btn btn-default' onClick={this.hideModal}>
                                    Cancel
                                </button>
                                <button className='btn btn-primary' onClick={() => {
                                    this.hideModal();
                                    this.props.onChangeSL(this.newSL);
                                }}>
                                    OK
                                </button>
                            </div>

                    </div>
                </Modal>
            </div>
        );
    }
}

export default EditModal;