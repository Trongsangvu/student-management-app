function editClass(malp) {
    const editUrl = `editClass.html?malp=${malp}`;

    window.location.href = editUrl;
}

function back() {
    window.location.href = '../../client/pages/class.html';
}

// Trích xuất ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const malp = urlParams.get('malp');
fetch(`http://localhost:3000/getClass/${malp}`)
    .then(response => response.json())
    .then(classs => {
        document.getElementById('MALP').value = classs.MALP;
        document.getElementById('TENLP').value = classs.TENLP;
        document.getElementById('NK').value = classs.NK;
    })
    .catch(error=> {
        console.error('There was an error fetching class data:', error);
    });


document.getElementById('studentform').addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form default behavior

    const newClass = document.getElementById('TENLP').value;
    const newNk = document.getElementById('NK').value;

    const data = {
        "TENLP": newClass,
        "NK": newNk
    };

    fetch(`http://localhost:3000/class/update/${malp}`, {    
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
    