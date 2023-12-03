import { useState } from 'react'
import Sender from './assets/sender'
import Rdt1_0 from './assets/rdt'
import Rdt2_0 from './assets/rdt_2'
import Rdt3_0 from './assets/rdt_3'
import './App.css'

function App() {
  const [selected, setSelected] = useState()

  const handleSliderChange = (event) => {
    const selected = event.target.value;
    setSelected(selected);
  };
  return (
    <div className="parent-container">
      <div className="slider-container">
        <label>
          <input
            type="radio"
            value="rdt"
            checked={selected === "rdt"}
            onChange={handleSliderChange}
          />
          RDT 1.0
        </label>
        <label>
          <input
            type="radio"
            value="rdt_2"
            checked={selected === "rdt_2"}
            onChange={handleSliderChange}
          />
          RDT 2.0
        </label>
        <label>
          <input
            type="radio"
            value="rdt_3"
            checked={selected === "rdt_3"}
            onChange={handleSliderChange}
          />
          RDT 3.0
        </label>
      </div>
      <div className="component-container">
        {selected === "rdt" && <Rdt1_0 />}
        {selected === "rdt_2" && <Rdt2_0 />}
        {selected === "rdt_3" && <Rdt3_0 />}
      </div>
    </div>  
  )
}

export default App
