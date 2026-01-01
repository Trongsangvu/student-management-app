const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = {
        "name": name,
        "password": password
    };

    fetch('http://localhost:3000/authenlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            // throw new Error('Network response was not ok');
            alert('Login failed');
        } return response.json();
    })
    .then(result => {
        console.log(result);
        window.location.href = "../../client/pages/home.html";
    })
    .catch(error => console.error('Failed:', error));

})

