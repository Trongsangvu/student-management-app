function back() {
    window.location.href = '../../client/pages/studentScore.html';
}

document.getElementById('studentform').addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form default behavior

    const masv = document.getElementById('MASV').value;
    const mamh = document.getElementById('MAMH').value;
    const diem = document.getElementById('DIEM').value;

    const data = {
        "MASV": masv,
        "MAMH": mamh,
        "DIEM": diem
    };

    fetch('http://localhost:3000/scores', {    
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }) 
    
    .then(result => {
      console.log(result); 
    })
    .catch(error => console.error('failed:', error));
});
