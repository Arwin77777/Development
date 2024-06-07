import React, { useState } from 'react';
import axios from 'axios';
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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', {
      email: email,
      password: password
    }).then((res) => {
      localStorage.setItem('token', res.data.token); 
      if(res.data.role === 'admin'){
        navigate('/dashboard');
      }
      else{
        navigate('/editUser');
      }
    }).catch((err) => {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        if (err.response.data.error === 'Invalid credentials') {
          setError('Password is incorrect.');
        } else if (err.response.data.error === 'User not found') {
          setError('No account found with this email.');
        } else {
          setError(err.response.data.error);
        }
      } else {
        setError('Failed to login. Please try again.');
      }
    });
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <MDBInput wrapperClass='mb-4 w-100' onChange={(e) => setEmail(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' onChange={(e) => setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg"/>
              <Link to='/signup'>New User?</Link>
              <br />
              <MDBBtn size='lg' onClick={handleSubmit}>
                Login
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;