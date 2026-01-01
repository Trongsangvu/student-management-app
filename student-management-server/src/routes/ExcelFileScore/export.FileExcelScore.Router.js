const express = require('express');
const db = require('../server/controllers/connectdb');
const router = express.Router();
const excel = require('exceljs');

router.get('/', (req, res) => {
    const query = `
        SELECT DIEMSV.MASV, DIEMSV.MAMH, MONHOC.TENMH, DIEMSV.DIEM
        FROM DIEMSV
        JOIN MONHOC 
        ON DIEMSV.MAMH = MONHOC.MAMH
    `
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error query database:', err);
        }

        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Score');

        // Add headers to the worksheet
        const headers = Object.keys(result[0]);
        worksheet.addRow(headers);

        // Add data to the worksheet
        result.forEach((row) => {
        const values = Object.values(row);
        worksheet.addRow(values);
        });

        // Set the response headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=diemSinhVien.xlsx');

        // Write the workbook to the response
        workbook.xlsx.write(res)
        .then(() => {
            res.end();
        })
        .catch((writeErr) => {
            console.error('Error writing Excel file:', writeErr);
            res.status(500).send('Internal Server Error');
        });
        });

});

module.exports = router;
