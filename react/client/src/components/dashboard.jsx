import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/dashboard.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
            setIsAdmin(role === 'admin');
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        if (isAdmin) {
            axios.get('http://localhost:5000/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
        }
    }, [isAdmin, token]);

    return (
        <div className="dashboard-container">
            {isAdmin ? (
                <>
                    <h1>User List</h1>
                    <div>
                        <a style={{cursor:'pointer',color:'red'}} onClick={handleLogout}>Logout</a>
                        <Link style={{textDecoration:'none',marginLeft:'10px'}} to='/editUser'>Edit User</Link>    
                    </div>
                    <br />
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <h1>Access Denied</h1>
            )}
        </div>
    );
}

export default Dashboard;