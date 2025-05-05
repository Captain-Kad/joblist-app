import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Header.css'

const Header = () => {
  return (
    <>
      <div className="bg-primary text-white py-3">
        <div className="container">
          <h1 className='fs-2 fw-bold mb-0'>Joblist</h1>
        </div>
      </div>
    </>
  );
};

export default Header;
