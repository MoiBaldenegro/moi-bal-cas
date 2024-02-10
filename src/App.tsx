import { useState } from 'react'
import './App.css'
import styles from "./app.module.css"




function App() {
  const simbolos = ['A', 'B', 'C', 'D', 'E'];
  const [resultado, setResultado]   = useState({
    lineOne: [],
    linetwo: [],
    lineThree: [],
  });

  const girar = () => {
    console.log(resultado)
    const carrete1 = [obtenerResultado(), obtenerResultado(), obtenerResultado(), obtenerResultado(), obtenerResultado()]
    const carrete2 = [obtenerResultado(), obtenerResultado(), obtenerResultado(), obtenerResultado(), obtenerResultado()]
    const carrete3 = [obtenerResultado(), obtenerResultado(), obtenerResultado(), obtenerResultado(), obtenerResultado()]

    mostrarResultado(carrete1, carrete2, carrete3);
  };

  const obtenerResultado = () => {
    return simbolos[Math.floor(Math.random() * simbolos.length)];
  };

  const mostrarResultado = (carrete1, carrete2, carrete3) => {
    setResultado({ 
      lineOne: carrete1,
      linetwo: carrete2,
      lineThree: carrete3
  });
  };

  return (
    <div className={styles.container}>
      <header>
      <h1>MOI   BAL   MEL</h1>
      </header>
      <main>
      <div className={styles.column}>

          {resultado.lineOne.map((item)=> 
                (
              <span>{item}</span>
              )
                 )}
            </div>

            <div className={styles.column}>

          {resultado.linetwo.map((item)=> 
                (
              <span>{item}</span>
               )
             )}
            </div>
            <div className={styles.column}>


          {resultado.lineThree.map((item)=> 
          (
              <span>{item}</span>
          )
          )}
            </div>


      
      </main>
      <button onClick={girar}>Giro</button>

      
    </div>
  );
};

export default App
