import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/dashboard.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    // const token = localStorage.getItem('token');
    const token = useSelector((state) => state.auth.token); 
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
            setIsAdmin(role === 'admin');
        }
    }, [token]);

    const handleLogout = () => {
        // localStorage.removeItem('token');
        token && dispatch({ type: 'REMOVE_TOKEN' });
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



const handleDelete = (userId) => {
    if (isAdmin) {
        axios.delete(`http://localhost:5000/deleteUser/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setUsers(users.filter(user => user._id !== userId));
            console.log('User deleted successfully');
        })
        .catch(err => {
            console.log(err);
        });
    }
};
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>{user.role}</td>
                                    <td>
                                    {user.role==='user' && 
<i className="fas fa-trash-alt" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(user._id)}></i>}
                                    </td>
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