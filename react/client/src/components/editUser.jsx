import React, { useEffect, useState } from 'react';
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

const EditUser = () => {
    const [user, setUser] = useState({ name: '', email: '', age: '', password: '' });
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/getUser`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setUser({
                name: res.data.name,
                email: res.data.email,
                age: res.data.age,
                password: ''
            });
        })
        .catch(err => console.log(err));
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/updateUser`, user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            alert('User Updated');
            navigate('/'); // Navigate to home page on success
        })
        .catch(err => {
            console.log(err);
            setError('Error updating user. Please try again.');
        });
    };

    return (
        <div>
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                                <h2 className="fw-bold mb-2 text-center">Edit User</h2>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <MDBInput 
                                    wrapperClass='mb-4 w-100' 
                                    name='name'  
                                    onChange={handleChange} 
                                    label='Name' 
                                    type='text' 
                                    size="lg" 
                                    value={user.name} 
                                />
                                <MDBInput 
                                    wrapperClass='mb-4 w-100' 
                                    name='email' 
                                    onChange={handleChange} 
                                    label='Email' 
                                    type='email' 
                                    size="lg" 
                                    value={user.email} 
                                />
                                <MDBInput 
                                    wrapperClass='mb-4 w-100' 
                                    name='password' 
                                    onChange={handleChange} 
                                    label='Password' 
                                    type='password' 
                                    size="lg" 
                                    value={user.password} 
                                />
                                <MDBInput 
                                    wrapperClass='mb-4 w-100' 
                                    name='age' 
                                    onChange={handleChange} 
                                    label='Age' 
                                    type='number' 
                                    size="lg" 
                                    value={user.age} 
                                />
                                <br />
                                <MDBBtn size='lg' onClick={handleSubmit}>
                                    Update
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default EditUser;