document.addEventListener('DOMContentLoaded', () => {
    const exportScores = document.getElementById('exportscore');
    exportScores.addEventListener('click', () => {
        fetch('http://localhost:3000/exportScore', {
            method: 'GET'
        })
        .then(response => response.blob())
        .then(blob => {

            // Create URL for the Excel file
            const url = window.URL.createObjectURL(blob);

            // Create a tag <a> to download the excel file
            const a = document.createElement('a');
            a.href = url;
            a.download = 'diem_sinh_vien.xls';
            document.body.appendChild(a);
            a.click();

            // Delete the URL path and tag a after downloading is complete 
            window.URL.revokeObjectURL(url);
        })
        .catch (error => {
            console.error('Error when exporting excel file:', error);
        });
    });
});