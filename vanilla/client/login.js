document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.error); });
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            console.log(data.token);
            window.location.href = '/client/home.html';
            alert('Login successful!');
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert(error.message);
        });
});