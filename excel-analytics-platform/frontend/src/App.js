import { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');

  const handleFile = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const res = await axios.post('http://localhost:5000/upload', formData);
    setColumns(res.data.columns);
    setData(res.data.data);
  };

  const chartData = {
    labels: data.map(row => row[xAxis]),
    datasets: [
      {
        label: yAxis,
        data: data.map(row => row[yAxis]),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Excel Analytics Platform</h1>
      <input type="file" onChange={handleFile} />
      
      {columns.length > 0 && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label>X-Axis: </label>
            <select onChange={(e) => setXAxis(e.target.value)}>
              <option>Select X-Axis</option>
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>

            <label style={{ marginLeft: '20px' }}>Y-Axis: </label>
            <select onChange={(e) => setYAxis(e.target.value)}>
              <option>Select Y-Axis</option>
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
        </>
      )}

      {xAxis && yAxis && (
        <div style={{ width: '500px', margin: '40px auto' }}>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
}

export default App;