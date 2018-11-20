import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Contact extends Component {
  state = {
    isOpen: false
  };
  handleShowClick = e => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  handleDelete = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (e) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };
  render() {
    const { contact } = this.props;
    const contactDetail = this.state.isOpen ? (
      <ul className="list-group">
        <li className="list-group-item">Email:{contact.email}</li>
        <li className="list-group-item">Phone:{contact.phone}</li>
      </ul>
    ) : null;
    const iconClass = !this.state.isOpen
      ? 'fas fa-sort-down'
      : 'fas fa-sort-up';
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {contact.name}
                <i
                  onClick={this.handleShowClick}
                  className={iconClass}
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={() => this.handleDelete(contact.id, dispatch)}
                />
                <Link to={`contact/edit/${contact.id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {contactDetail}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
export default Contact;
