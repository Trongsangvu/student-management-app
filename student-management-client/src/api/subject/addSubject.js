function back() {
    window.location.href = '../../client/pages/subject.html';
}

document.getElementById('studentform').addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form default behavior

    const mamh = document.getElementById('MAMH').value;
    const tenmh = document.getElementById('TENMH').value;
    const sotc = document.getElementById('SOTC').value;

    const data = {
        "MAMH": mamh,
        "TENMH": tenmh,
        "SOTC": sotc
    };

    fetch('http://localhost:3000/subjects', {    
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
