document.getElementById('signup-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const age = document.getElementById('signup-age').value;
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            age: age
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.error); });
            }
            return response.json();
        })
        .then(data => {
            if (data.message === 'User created successfully') {
                alert('User created successfully');
                window.location.href = '/client/login.html';
            } else {
                console.error('Failed to create user:', data.message);

            }
        })
        .catch(error => {
            console.log('Error:', error.message);
            alert(error.message);
        });
    console.log(name, email, password, age);
});