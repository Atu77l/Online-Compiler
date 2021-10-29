import axios from "axios";
import "./App.css";
import stubs from "./stubs";
import React, { useState, useEffect } from "react";


function App() {
  const [code, setCode] = useState("");
  const [output,setOutput] = useState("Hello World!");
  const [language, setLanguage] = useState("cpp");
  
  

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  useEffect(() => {
    const defaultLang = localStorage.getItem("default-language") || "cpp";
    setLanguage(defaultLang);
  }, []);


  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
      try{
      const  { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
      }catch({response})
      {
        if(response){
          const errMsg = response.data.err.stderr;
          setOutput("not get result");
        }
      }
  };

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <div>
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => {
            const shouldSwitch = window.confirm(
              "Are you sure you want to change language? WARNING: Your current code will be lost."
            );
            if (shouldSwitch) {
              setLanguage(e.target.value);
            }
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      
      <br />
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
      <p>{output}</p>
      <p>{output}</p>
    </div>
  );
}

export default App;
