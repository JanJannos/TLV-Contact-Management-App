/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], snackbaropen: false, snackbarmsg: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * This function makes sure to hide the Popup
   */
  snackbarClose = event => {
    this.setState({ snackbaropen: false, person: '' });
  };

  /*
   * Execute the SAVE function
   */
  handleSubmit(event) {
    event.preventDefault(); // prevent from submitting the page
    fetch('http://localhost:54178/api/contact/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ContactID: event.target.ContactID.value,
        FirstName: event.target.FirstName.value,
        LastName: event.target.LastName.value,
        PhoneNumber: event.target.PhoneNumber.value,
        Email: event.target.Email.value,
        ContactType: event.target.PersonType.value,        
        Notes: event.target.Faculty !== undefined ? event.target.Faculty.value : 
             event.target.GraduationYear !== undefined ? event.target.GraduationYear.value :
          event.target.Subject !== undefined ? event.target.Subject.value : ''
      })
    })
      .then(resp => resp.json())
      .then(
        result => {
          // SUCCESS : alert(result);
          this.setState({ snackbaropen: true, snackbarmsg: result });
        },
        // FAIL : alert('Failed')
        error => this.setState({ snackbaropen: true, snackbarmsg: 'Failed!' })
      );
  }

  /*
    Change the Person type based on user click 
  */
  handlePersonChange = e => {
    this.setState({ person: e.target.value });
  };

  /**
   Show / Hide update button based if we are in View or Edit mode
   */
  renderUpdateButton() {
    if (this.props.disablefields === 'false') {
      return (
        <Button variant='primary' type='submit'>
          Update
        </Button>
      );
    }
    // else
    return null;
  }

  /*
    Render a specific column based on user's choice in the Drop Down  
  */
  renderSpecificColumns(type , graduationyear , subject , faculty) {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'Student':
        return (
          <Form.Group controlId='Faculty'>
            <Form.Label>Faculty</Form.Label>
            <Form.Control
              type='Faculty'
              name='Faculty'
              required
              defaultValue={faculty}
              disabled={this.props.disablefields !== 'false' ? true : false}
              placeholder='Faculty'
            />
          </Form.Group>
        );

      case 'Alumni':
        return (
          <Form.Group controlId='Graduation Year'>
            <Form.Label>Graduation Year</Form.Label>
            <Form.Control
              type='text'
              name='GraduationYear'
              required
              defaultValue={graduationyear}
              disabled={this.props.disablefields !== 'false' ? true : false}
              placeholder='Graduation Year'
            />
          </Form.Group>
        );
      case 'Lecturer':
        return (
          <Form.Group controlId='Subject'>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type='Subject'
              name='Subject'
              required
              defaultValue={subject}
              disabled={this.props.disablefields !== 'false' ? true : false}
              placeholder='Subject'
            />
          </Form.Group>
        );
    }
  }

  /**
   *  Render function
   */
  render() {
    const people_list = [
      {
        PersonType: '1',
        PersonDescription: 'Student'
      },
      {
        PersonType: '2',
        PersonDescription: 'Alumni'
      },
      {
        PersonType: '3',
        PersonDescription: 'Lecturer'
      }
    ];

    return (
      <div className='container'>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id='message-id'>{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key='close'
              arial-label='Close'
              color='inherit'
              onClick={this.snackbarClose}
            >
              x
            </IconButton>
          ]}
        />
        <Modal
          {...this.props}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              {this.props.disablefields !== 'false'
                ? 'User Info'
                : 'Update Contact'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  {/* ContactID */}
                  <Form.Group controlId='ContactID'>
                    <Form.Label>Contact ID</Form.Label>
                    <Form.Control
                      type='text'
                      disabled
                      required
                      defaultValue={this.props.contactid}
                      name='ContactID'
                    />
                  </Form.Group>

                  {/* FirstName */}
                  <Form.Group controlId='FirstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      disabled={
                        this.props.disablefields !== 'false' ? true : false
                      }
                      defaultValue={this.props.firstname}
                      name='FirstName'
                      required
                      placeholder='First Name'
                    />
                  </Form.Group>

                  {/* LastName */}
                  <Form.Group controlId='LastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      disabled={
                        this.props.disablefields !== 'false' ? true : false
                      }
                      defaultValue={this.props.lastname}
                      name='LastName'
                      required
                      placeholder='Last Name'
                    />
                  </Form.Group>

                  {/* Person Type */}
                  <Form.Group controlId='PersonType'>
                    <Form.Label>Person Type</Form.Label>
                    <Form.Control
                      as='select'
                      disabled
                      defaultValue={this.props.contacttype}
                    >
                      {people_list.map(ptype => (
                        <option key={ptype.PersonType}>
                          {ptype.PersonDescription}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  {/* PhoneNumber */}
                  <Form.Group controlId='PhoneNumber'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type='text'
                      name='PhoneNumber'
                      disabled={
                        this.props.disablefields !== 'false' ? true : false
                      }
                      required
                      defaultValue={this.props.phonenumber}
                      placeholder='PhoneNumber'
                    />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group controlId='Email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='Email'
                      name='Email'
                      disabled={
                        this.props.disablefields !== 'false' ? true : false
                      }
                      defaultValue={this.props.email}
                      required
                      placeholder='Email'
                    />
                  </Form.Group>

                  {/* Optional Fields */}

                  {/* Pass here params with the 3 fields  */}
                  {this.renderSpecificColumns(this.props.contacttype,this.props.graduationyear , this.props.subject , this.props.faculty )}

                  <Form.Group>
                    {/* <Button variant='primary' type='submit'>
                      Update
                    </Button> */}
                    {this.renderUpdateButton()}
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
