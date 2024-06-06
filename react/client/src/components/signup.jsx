import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    age: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/signup', user).then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.token); // Save the token to localStorage
      navigate('/'); // Redirect to home page after successful signup
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to sign up due to an unexpected error.');
      }
    });
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
              {error && <p className="text-danger text-center">{error}</p>}
              <MDBInput wrapperClass='mb-4 w-100' name='name' onChange={handleChange} label='Name'  type='text' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' name='email' onChange={handleChange} label='Email'  type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' name='password' onChange={handleChange} label='Password'  type='password' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' name='age' onChange={handleChange} label='Age'  type='number' size="lg"/>
              <Link to='/login'>Existing User?</Link>
              <br />
              <MDBBtn size='lg' onClick={handleSubmit}>
                Signup
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;