
function back() {
    window.location.href = '../../client/pages/studentScore.html';
}

function editStudent(masv) {
    const editUrl = `editScore.html?masv=${masv}`;

    window.location.href = editUrl;
}
// Trích xuất ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const masv = urlParams.get('masv');
fetch(`http://localhost:3000/getScores/${masv}`)
    .then(response => response.json())
    .then(score => {
        // Kiểm tra xem đối tượng score có giá trị không
        if (score && Object.keys(score).length > 0) {
            document.getElementById('MASV').value = score[0].MASV;
            document.getElementById('MAMH').value = score[0].MAMH;
            document.getElementById('TENMH').value = score[0].TENMH;
            document.getElementById('DIEM').value = score[0].DIEM;
        } else {
            console.error('Student data is undefined or empty.');
        }
    })
    .catch(error=> {
        console.error('There was an error fetching student data:', error);
    });


document.getElementById('studentform').addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form default behavior

    const newDiem = document.getElementById('DIEM').value;

    const data = {
        "DIEM": newDiem
    };

    fetch(`http://localhost:3000/scores/update/${masv}`, {    
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
    