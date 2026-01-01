const loading =  document.getElementById('loading');
const tableBody = document.querySelector('.table-body');
        async function fetchData() {
            try {
                const responseAPI = await fetch('http://localhost:3000/scores');
                const scores = await responseAPI.json();
                
                tableBody.innerHTML = 
                scores.map(
                    (score) => `
                        <tr style="display: grid; grid-template-columns: 200px 200px 350px 150px 150px;">
                        <td style="text-align: center">${score.MASV}</td>
                        <td style="padding-left: 50px">${score.MAMH}</td>
                        <td style="width: 250px">${score.TENMH}</td> 
                        <td style="padding-left: 31px">${score.DIEM}</td>
                        <td style="display: flex; flex-direction: row; justify-content: flex-end; width: 150px">
                            <button style="background-color: #ccc; width: 65px; font-size: 12px; justify-content: center" onclick="editStudent(${score.MASV})">Edit</button>
                            
                            <button style="background-color: #ccc; width: 65px; font-size: 12px; justify-content: center; margin-left: 9px" onclick="deleteStudent(${score.MASV})">Delete</button>
                        </td>
                        </tr>
                        `
                        ).join('');
                    } 
                    catch (error) {
                tableBody.innerHTML = `<span style="color: red; display: block; padding: 12px;">Failed to load data. Please try again later.</span>`;
                console.error("There was an error fetching the data:", error);
            } 
            finally {
                loading.style.display = 'none';
            }


        }
        fetchData();