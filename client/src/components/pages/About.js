import React from 'react';

const About = () => {
  return (
    <div>
      <h1>Acerca de esta App</h1>
      <p className='my-1'>
        Esta es una aplicación full stack para guardar contactos. Realizada con
        el stack MERN.
      </p>
      <p className='bg-dark p'>
        <strong>Version: 1.0.0</strong>{' '}
        <strong style={{ float: 'right' }}>Juan Pablo Isaza</strong>
      </p>
    </div>
  );
};

export default About;
