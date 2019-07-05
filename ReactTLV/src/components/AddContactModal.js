/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], snackbaropen: false, snackbarmsg: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // fetch('http://localhost:54178/api/department')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({ deps: data });
    //   });
  }

  // This function makes sure to hide the Popup
  snackbarClose = event => {
    this.setState({ snackbaropen: false, person: '' });
  };

  // Execute the SAVE function
  handleSubmit(event) {
    event.preventDefault(); // prevent from submitting the page

    if (event.target.PersonType.value.toLowerCase() === 'choose person type') {
      alert('Please , choose Person type!');
      return;
    }

    fetch('http://localhost:54178/api/contact/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ContactID: null,
        FirstName: event.target.FirstName.value,
        LastName: event.target.LastName.value,
        PhoneNumber: event.target.PhoneNumber.value,
        Email: event.target.Email.value,
        ContactType: event.target.PersonType.value,
        Notes:
          event.target.Faculty !== undefined
            ? event.target.Faculty.value
            : event.target.GraduationYear !== undefined
            ? event.target.GraduationYear.value
            : event.target.Subject !== undefined
            ? event.target.Subject.value
            : ''
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

  handlePersonChange = e => {
    this.setState({ person: e.target.value });
  };

  renderSpecificColumns(type) {
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
              placeholder='Subject'
            />
          </Form.Group>
        );
    }
  }

  render() {
    const people_list = [
      {
        PersonType: '0',
        PersonDescription: 'Choose Person Type'
      },
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
              Add Contact
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  {/* FirstName */}
                  <Form.Group controlId='FirstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
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
                      defaultValue='Choose Person Type'
                      onChange={this.handlePersonChange}
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
                      type='Phone'
                      name='PhoneNumber'
                      required
                      placeholder='PhoneNumber'
                    />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group controlId='Email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='Email'
                      name='Email'
                      required
                      placeholder='Email'
                    />
                  </Form.Group>

                  {/* Optional Fields */}
                  {this.renderSpecificColumns(this.state.person)}

                  <Form.Group>
                    <Button variant='primary' type='submit'>
                      Add Contact
                    </Button>
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
