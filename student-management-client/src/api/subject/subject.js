
const tableBody = document.querySelector('.table-body');
const loading =  document.getElementById('loading');
async function fetchData() {
    try {
        const responseAPI = await fetch('http://localhost:3000/subjects');
        const subjects = await responseAPI.json();

        tableBody.innerHTML = 
        subjects.map(
            (subject) => `
                <tr>
                  <td onclick="sortTable(0)">${subject.MAMH}</td>
                  <td onclick="sortTable(1)">${subject.TENMH}</td>
                  <td onclick="sortTable(2)">${subject.SOTC}</td>
                  <td style="display: flex; flex-direction: row; justify-content: flex-end; width: 150px">
                    <button style="width: 65px; font-size: 12px; justify-content: center" onclick="editSubject('${subject.MAMH}')">Edit</button>
                    
                    <button style="width: 65px; font-size: 12px; justify-content: center; margin-left: 9px" onclick="deleteSubject('${subject.MAMH}')">Delete</button>
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

  

