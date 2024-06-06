document.getElementById('edit-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const password = document.getElementById('edit-password').value;
    const age = document.getElementById('edit-age').value;
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/updateUser', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password, age })
    })
        .then(res => {
            if (!res.ok)
                return res.json().then(err => { throw new Error(err.error); });
            return res.json();
        })
        .then(data => {
            if (data.message === 'User updated successfully') {
                alert('Updated Successfully');
                window.location.href = '/client/home.html';
            }
            console.log(data);

        })
        .catch(err => {
            console.error(err);
            alert(err.message);
        });
})

const token = localStorage.getItem('token');
fetch('http://localhost:3000/getUser', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        document.getElementById('edit-name').value = data.name || '';
        document.getElementById('edit-email').value = data.email || '';
        document.getElementById('edit-password').value = ''; 
        document.getElementById('edit-age').value = data.age || '';
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data');
    });