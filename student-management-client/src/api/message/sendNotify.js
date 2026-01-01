document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('send-notification').addEventListener('click', () => {
        sendNotification();
    });
});

function sendNotification() {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!email || !message) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }

    fetch('http://localhost:3000/sendemail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `email=${email}&message=${message}`
    })
    .then(response => response.json())
    .then(notify => {
        document.getElementById('notificationArea').innerHTML = '<p>' + notify + '</p>';
    })
    .catch (error => {
        console.error('Error:', error);
    })
}