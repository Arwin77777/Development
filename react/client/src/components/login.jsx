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
import { useDispatch } from 'react-redux';
import { storeToken } from './actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      const { token, role } = res.data;
      // localStorage.setItem('token', token);

      await dispatch(storeToken(token)); 

      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/editUser');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        switch (err.response.data.error) {
          case 'Invalid credentials':
            setError('Password is incorrect.');
            break;
          case 'User not found':
            setError('No account found with this email.');
            break;
          default:
            setError(err.response.data.error);
        }
      } else {
        setError('Failed to login. Please try again.');
      }
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4 w-100' onChange={(e) => setEmail(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4 w-100' onChange={(e) => setPassword(e.target.value)} label='Password' id='formControlLg1' type='password' size="lg" />
                <Link to='/signup'>New User?</Link>
                <br />
                <MDBBtn size='lg' type="submit">
                  Login
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
