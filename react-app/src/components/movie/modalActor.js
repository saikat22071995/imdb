import React from 'react'
import { Button,Modal } from 'react-bootstrap';
import ActorForm from '../actor/actorForm'
class ModalActor extends React.Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

      
    
      render() {
        
    
        return (
          <React.Fragment>
           
    
            <Button onClick={this.handleShow}>
              Add Actor
            </Button>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Actor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ActorForm handleSubmit={this.props.handleFormSubmit}/>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </React.Fragment>
        );
      }
}
export default ModalActor 