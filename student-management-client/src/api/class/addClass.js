document.getElementById('studentform').addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form default behavior

    const malp = document.getElementById('MALP').value;
    const tenlp = document.getElementById('TENLP').value;
    const nk = document.getElementById('NK').value;

    const data = {
        "MALP": malp,
        "TENLP": tenlp,
        "NK": nk
    };

    fetch('http://localhost:3000/class', {    
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
