
const tableBody = document.querySelector('.table-body');
const loading =  document.getElementById('loading');
async function fetchData() {
    try {
        const responseAPI = await fetch('http://localhost:3000/class');
        const classess = await responseAPI.json();

        tableBody.innerHTML = 
        classess.map(
            (classes) => `
                <tr>
                  <td>${classes.MALP}</td>
                  <td>${classes.TENLP}</td>
                  <td>${classes.NK}</td>
                  <td style="display: flex; flex-direction: row; justify-content: flex-end; width: 150px">
                    <button style="width: 65px; font-size: 12px; justify-content: center" onclick="editClass('${classes.MALP}')">Edit</button>
                    
                    <button style="width: 65px; font-size: 12px; justify-content: center; margin-left: 9px" onclick="deleteClass('${classes.MALP}')">Delete</button>
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

  

