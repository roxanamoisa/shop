import React, { Component } from 'react';
import Modal from 'react-modal';

/*import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
  } from 'react-modal-bootstrap';*/

class NewModal extends Component {

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
                <button type="button" className="btn btn-sm btn-danger" onClick={this.openModal}>Delete</button>

                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    isOpen={this.state.isOpen}
                    onRequestHide={this.hideModal}>

                    <div className="modal-content">
                
                        <div className="modal-header">
                            <div onClick={this.hideModal}/>
                            <div>Please confirm</div>
                        </div>

                        <div  className="modal-body">
                            <p> Are you sure you want to delete?</p>
                        </div>

                        <div className="modal-footer">
                            <button className='btn btn-default' onClick={this.hideModal}>
                                Cancel
                            </button>
                            <button className='btn btn-primary' onClick={this.props.onModalDelete}>
                                Yes
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default NewModal;