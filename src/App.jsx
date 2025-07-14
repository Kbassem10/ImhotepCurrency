import { useState } from 'react'
import imhotepCCLogo from "./assets/icc.png"
import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="app-header">
        <Header />
      </header>
      <main className="app-main">
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </main>
      <footer className="app-footer">
        <Footer />
      </footer>
    </>
  )
}

export default App
