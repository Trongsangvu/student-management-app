function editStudent(masv) {
    const editUrl = `editStudent.html?masv=${masv}`;

    window.location.href = editUrl;
}

function back() {
    window.location.href = '../../client/pages/studentList.html';
}

// Trích xuất ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const masv = urlParams.get('masv');
fetch(`http://localhost:3000/getStudent/${masv}`)
    .then(response => response.json())
    .then(student => {
        document.getElementById('MASV').value = student.MASV;
        document.getElementById('TENSV').value = student.TENSV;
        document.getElementById('DCSV').value = student.DCSV;
        document.getElementById('MALP').value = student.MALP;
    })
    .catch(error=> {
        console.error('There was an error fetching student data:', error);
    });


document.getElementById('studentform').addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form default behavior

    const tensv = document.getElementById('TENSV').value;
    const dcsv = document.getElementById('DCSV').value;
    const malp = document.getElementById('MALP').value;

    const data = {
        "TENSV": tensv,
        "DCSV": dcsv,
        "MALP": malp
    };

    fetch(`http://localhost:3000/students/update/${masv}`, {    
        method: 'PUT',
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
    