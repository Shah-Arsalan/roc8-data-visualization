import express from 'express';
import cors from 'cors';
import XLSX from 'xlsx';
import path from 'path';


const app = express();
app.use(cors());

const workbook = XLSX.readFile("./data.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);


app.get('/api/feature-totals', (req, res) => {
    const totals = data.reduce((acc, row) => {
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach(feature => {
            acc[feature] = (acc[feature] || 0) + row[feature];
        });
        return acc;
    }, {});
    res.json(totals);
});

app.get('/api/feature-time-trend/:feature', (req, res) => {
    const { feature } = req.params;
    const trend = data.map(row => ({ Day: row.Day, Value: row[feature] }));
    res.json(trend);
});


const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World boys!');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
