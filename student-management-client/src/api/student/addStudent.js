function back() {
    window.location.href = '../../client/pages/studentList.html';
}


document.getElementById('studentform').addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form default behavior

    const masv = document.getElementById('MASV').value;
    const tensv = document.getElementById('TENSV').value;
    const dcsv = document.getElementById('DCSV').value;
    const malp = document.getElementById('MALP').value;

    const data = {
        "MASV": masv,
        "TENSV": tensv,
        "DCSV": dcsv,
        "MALP": malp
    };

    fetch('http://localhost:3000/students', {    
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
