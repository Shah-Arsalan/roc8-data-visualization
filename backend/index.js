import express from 'express';
import cors from 'cors';
import XLSX from 'xlsx';
import userroute from './Routes/users.route.js'
import connectionFunc from './DatabaseConnection/database.connection.js';


const app = express();
app.use(express.json());
app.use(cors());

connectionFunc();

const workbook = XLSX.readFile("./data.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);


app.get('/api/data',(req,res)=> {
    res.json(data);
})

app.use("/users", userroute)


const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World boys!');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
