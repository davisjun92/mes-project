const express = require('express'); 
const cors = require('cors');
const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());

const productionStatus = 'Running';
const machineUtilization = '80%';
const defectRate = '2%';
const barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  data: [605, 509, 800, 810, 560, 550]
};
const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  data: [30, 50, 40, 60, 50, 70]
};

app.get('/dashboard', (req, res) => {
  res.json({
    productionStatus,
    machineUtilization,
    defectRate,
    chartData: barChartData
  });
});

let productionRecords = [
  { id: 1, productName: 'Product A', quantity: 100 },
  { id: 2, productName: 'Product B', quantity: 50 }
];

let inspections = [
  { id: 1, date: '2024-06-17', result: 'Pass' },
  { id: 2, date: '2024-06-18', result: 'Fail' }
];

app.get('/production', (req, res) => {
  res.json(productionRecords);
});

app.post('/production', (req, res) => {
  const newRecord = { id: productionRecords.length + 1, ...req.body };
  productionRecords.push(newRecord);
  res.json(newRecord);
});

app.get('/quality-control', (req, res) => {
  res.json(inspections);
});

app.post('/quality-control', (req, res) => {
  const newInspection = { id: inspections.length + 1, ...req.body };
  inspections.push(newInspection);
  res.json(newInspection);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
