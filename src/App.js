import img from './assets/g.png';
import './App.css';
import acronyms from './data.json'

import { useState, useEffect } from 'react'
import Content from './Components/Content'


function App() {

  const [query,setQuery] = useState('')

  const handleQuery = (e) => {
    setQuery(e.target.value)
  }

  const data = acronyms.filter((item)=>{
      if(!query)
          return null
      else if(item.acronym.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase())){
          return item
      }
    })

  return (
    <div className="App">
      <div className="header">
      <div className="heding">
      <img src={img} alt="1989 taylor swift" width="8%"/> 
      <h1>TS acronyms</h1>
      </div>
      <div className="search">
      <input type="text" value={query} onChange={handleQuery} placeholder="Enter acronym or Song"/>
      </div>
      </div>
      <div className="content">
      <Content data={data} query={query}/>
      </div>
      <div className="footer">*Check out the code at <a href="https://github.com/MitanshiKshatriya/ts-acronyms">GitHub</a></div>
    </div>
  );
}

export default App;
