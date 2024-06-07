import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [inputErrors, setInputErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? (checked ? 'admin' : 'user') : value
    }));
  };

  const validateInputs = () => {
    const errors = {};
    if (!user.name) errors.name = 'Name is required';
    if (!user.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Email is invalid';
    }
    if (!user.password) {
      errors.password = 'Password is required';
    } else if (user.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!user.age) {
      errors.age = 'Age is required';
    } else if (isNaN(user.age) || user.age <= 0) {
      errors.age = 'Age must be a positive number';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }
    axios.post('http://localhost:5000/signup', user).then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.token); 
      if(user.role === 'admin'){
        navigate('/dashboard');
      }
      else{
        navigate('/editUser');
      }
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
              <MDBInput 
                wrapperClass='mb-4 w-100' 
                name='name' 
                onChange={handleChange} 
                label='Name'  
                type='text' 
                size="lg"
                value={user.name} 
              />
              {inputErrors.name && <p className="text-danger">{inputErrors.name}</p>}
              <MDBInput 
                wrapperClass='mb-4 w-100' 
                name='email' 
                onChange={handleChange} 
                label='Email'  
                type='email' 
                size="lg"
                value={user.email} 
              />
              {inputErrors.email && <p className="text-danger">{inputErrors.email}</p>}
              <MDBInput 
                wrapperClass='mb-4 w-100' 
                name='password' 
                onChange={handleChange} 
                label='Password'  
                type='password' 
                size="lg"
                value={user.password} 
              />
              {inputErrors.password && <p className="text-danger">{inputErrors.password}</p>}
              <MDBInput 
                wrapperClass='mb-4 w-100' 
                name='age' 
                onChange={handleChange} 
                label='Age'  
                type='number' 
                size="lg"
                value={user.age} 
              />
              {inputErrors.age && <p className="text-danger">{inputErrors.age}</p>}
              <MDBCheckbox 
                wrapperClass='mb-4 w-100' 
                name='role' 
                onChange={handleChange} 
                label='Admin'  
                type='checkbox' 
                size="lg"
                checked={user.role === 'admin'} 
              />
              <Link to='/'>Existing User?</Link>
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