function editSubject(mamh) {
    const editUrl = `editSubject.html?mamh=${mamh}`;

    window.location.href = editUrl;
}

function back() {
    window.location.href = '../../client/pages/subject.html';
}

// Trích xuất ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const mamh = urlParams.get('mamh');
fetch(`http://localhost:3000/getSubject/${mamh}`)
    .then(response => response.json())
    .then(student => {
        document.getElementById('MAMH').value = student.MAMH;
        document.getElementById('TENMH').value = student.TENMH;
        document.getElementById('SOTC').value = student.SOTC;
    })
    .catch(error=> {
        console.error('There was an error fetching student data:', error);
    });


document.getElementById('studentform').addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form default behavior

    const tenmh = document.getElementById('TENMH').value;
    const sotc = document.getElementById('SOTC').value;

    const data = {
        "TENMH": tenmh,
        "SOTC": sotc
    };

    fetch(`http://localhost:3000/subject/update/${mamh}`, {    
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
    