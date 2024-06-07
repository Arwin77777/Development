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
import Popup from './toast';
import { jwtDecode } from 'jwt-decode';

const EditUser = () => {
    const [user, setUser] = useState({ name: '', email: '', age: '', password: '' });
    const [error, setError] = useState('');
    const [inputErrors, setInputErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

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
            const decodedToken = jwtDecode(token);
            setIsAdmin(decodedToken.role === 'admin');
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

    const validateInputs = () => {
        const errors = {};
        if (!user.name) errors.name = 'Name is required';
        if (!user.email) errors.email = 'Email is required';
        if (!user.age) errors.age = 'Age is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateInputs();
        if (Object.keys(errors).length > 0) {
            setInputErrors(errors);
            return;
        }
        axios.put(`http://localhost:5000/updateUser`, user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                const decodedToken = jwtDecode(token);
                if (decodedToken.role === 'admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/editUser');
                }
            }, 3000); 
        })
        .catch(err => {
            console.log(err);
            setError('Error updating user. Please try again.');
        });
    };

    const isLoggedIn = localStorage.getItem('token');

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <div style={{marginTop:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <a style={{cursor:'pointer',color:'red'}} onClick={handleLogout}>Logout</a>
                {isAdmin && <Link style={{textDecoration:'none',marginLeft:'10px'}} to='/dashboard'>Dashboard</Link>}
            </div>
            {showPopup && <Popup message="User updated successfully!" />}
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