import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      console.log(parsedJson);
      const res = await axios.post('http://127.0.0.1:5000/bfhl', parsedJson);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or server error');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedOptions.includes('User ID')) {
      filteredResponse.userid = response.userid;
    }
    if (selectedOptions.includes('Roll Number')) {
      filteredResponse.roll_number = response.roll_number;
    }
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
    );
  };

  return (
    <div className="App">
      <h1>{response?.roll_number || 'BFHL Challenge'}</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {response && (
        <>
          <label>Select Response to Display:</label>
          <select multiple={true} onChange={handleOptionChange}>
            <option value="Roll Number">Roll Number</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
