import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Alejo Velez',
        email: 'alejo@gmail.com',
        phone: '111-111-111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Daniel Gomez',
        email: 'daniel@gmail.com',
        phone: '111-111-112',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Simon Arenas',
        email: 'simon@gmail.com',
        phone: '111-111-113',
        type: 'professional',
      },
    ],
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Añadir contacto
  const addContact = (contact) => {
    contact.id = uuidv4();
    if (contact.name && contact.email) {
      dispatch({ type: ADD_CONTACT, payload: contact });
    }
  };

  // Borrar contacto
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set del contacto actual

  // Limpiar el contacto actual

  // Actualizar contacto

  // Filtrar contactos

  // Limpiar filtro

  return (
    <ContactContext.Provider
      value={{ contacts: state.contacts, addContact, deleteContact }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
