
const tableBody = document.querySelector('.table-body');
const loading =  document.getElementById('loading');
async function fetchData() {
    try {
        const responseAPI = await fetch('http://localhost:3000/students');
        const students = await responseAPI.json();

        tableBody.innerHTML = 
        students.map(
            (student) => `
                <tr>
                  <td onclick="sortTable(0)">${student.MASV}</td>
                  <td onclick="sortTable(1)">${student.TENSV}</td>
                  <td onclick="sortTable(2)">${student.MALP}</td>
                  <td onclick="sortTable(3)">${student.DCSV}</td>
                  <td style="display: flex; flex-direction: row; justify-content: flex-end; width: 150px">
                    <button style="width: 65px; font-size: 12px; justify-content: center" onclick="editStudent(${student.MASV})">Edit</button>
                    
                    <button style="width: 65px; font-size: 12px; justify-content: center; margin-left: 9px" onclick="deleteStudent(${student.MASV})">Delete</button>
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

  

