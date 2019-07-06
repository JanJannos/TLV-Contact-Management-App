import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddContactModal } from './AddContactModal';
import { EditContactModal } from './EditContactModal';
import { MDBCol, MDBFormInline } from 'mdbreact';

export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      addModalShow: false,
      editModalShow: false,
      filteredString: ''
    };
    this.refreshList = this.refreshList.bind(this);
  }

  refreshList() {
    fetch('http://localhost:54178/api/contact/')
      .then(response => response.json())
      .then(data => {
        this.setState({ contacts: data });
      });
  }

  componentWillMount() {
    this.refreshList();
  }

  componentWillUpdate() {
    if (this.state.deletedObject === true) {
      this.setState({ deletedObject: false });
      this.refreshList();
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  deleteEmp(contact_id) {
    if (window.confirm('Are You Sure you want to delete this person ?')) {
      fetch('http://localhost:54178/api/contact/' + contact_id, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      this.setState({ deletedObject: true });
      this.refreshList();
    }
  }

  getPersonDesc(personType, people_list) {
    for (var index in people_list) {
      var obj = people_list[index];
      if (Number(obj.PersonType) === personType) {
        return obj.PersonDescription;
      }
    }

    return '';
  }

  render() {
    const {
      _contactid,
      _firstname,
      _lastname,
      _contacttypedesc,
      _phonenumber,
      _email,
      _disablefields,
      _graduationyear,
      _subject,
      _faculty
    } = this.state;
    let addModalClose = () => {
      this.setState({ addModalShow: false, filteredString: '' });
      this.refreshList();
    };

    let editModalClose = () => {
      this.setState({ editModalShow: false, filteredString: '' });
      this.refreshList();
    };

    const { filteredString, contacts } = this.state;
    const lowercasedFilter = filteredString.toLowerCase();
    const filteredData = contacts.filter(item => {
      return Object.keys(item).some(
        key =>
          typeof item[key] === 'string' &&
          item[key].toLowerCase().includes(lowercasedFilter)
      );
    });

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
      <div>
        <Table className='mt-4' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>ContactID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>ContactType</th>
              <th>PhoneNumber</th>
              <th>Email</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(_cntct => (
              <tr key={_cntct.ContactID}>
                <td>{_cntct.ContactID}</td>
                <td>{_cntct.FirstName}</td>
                <td>{_cntct.LastName}</td>
                <td>{this.getPersonDesc(_cntct.ContactType, people_list)}</td>
                <td>{_cntct.PhoneNumber}</td>
                <td>{_cntct.Email}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className='mr-2'
                      variant='dark'
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          _contactid: _cntct.ContactID,
                          _firstname: _cntct.FirstName,
                          _lastname: _cntct.LastName,
                          _contacttypedesc: this.getPersonDesc(
                            _cntct.ContactType,
                            people_list
                          ),
                          _phonenumber: _cntct.PhoneNumber,
                          _email: _cntct.Email,
                          _disablefields: true,
                          _faculty: _cntct.Faculty,
                          _subject: _cntct.Subject,
                          _graduationyear: _cntct.GraduationYear
                          // we need to pass the params above , below
                        })
                      }
                    >
                      View
                    </Button>

                    <Button
                      className='mr-2'
                      variant='info'
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          _contactid: _cntct.ContactID,
                          _firstname: _cntct.FirstName,
                          _lastname: _cntct.LastName,
                          _contacttypedesc: this.getPersonDesc(
                            _cntct.ContactType,
                            people_list
                          ),
                          _phonenumber: _cntct.PhoneNumber,
                          _email: _cntct.Email,
                          _disablefields: 'false',
                          _faculty: _cntct.Faculty,
                          _subject: _cntct.Subject,
                          _graduationyear: _cntct.GraduationYear
                          // we need to pass the params above , below
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className='mr-2'
                      onClick={() => this.deleteEmp(_cntct.ContactID)}
                      variant='danger'
                    >
                      Delete
                    </Button>
                    <EditContactModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      contactid={_contactid}
                      firstname={_firstname}
                      lastname={_lastname}
                      contacttype={_contacttypedesc}
                      phonenumber={_phonenumber}
                      email={_email}
                      disablefields={_disablefields}
                      graduationyear={_graduationyear}
                      subject={_subject}
                      faculty={_faculty}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant='primary'
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Contact
          </Button>

          <MDBCol md='6'>
            <MDBFormInline className='md-form'>
              <input
                value={this.state.filteredString}
                onChange={this.handleChange}
                className='form-control form-control-sm w-75'
                type='text'
                placeholder='Search for anything'
                aria-label='Search'
              />
            </MDBFormInline>
          </MDBCol>

          <AddContactModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>

        <br />

        {/* <MDBInput hint="Search For Anything" value={this.state.filteredString} onChange={this.handleChange} type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" /> */}
      </div>
    );
  }

  handleChange = event => {
    this.setState({ filteredString: event.target.value });
  };
}
