import imhotepCCLogo from "../assets/icc.png"
import '../App.css'

export default function Header() {

  return (
    <header className="app-header">
      <div>
        <a href="https://imhotepcc.vercel.app/" target="_blank">
          <img src={imhotepCCLogo} className="logo react" alt="Imhotep Currency logo" />
        </a>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">Imhotep Currency Convertor</h1>
      <p className="read-the-docs text-lg sm:text-xl mb-8">
        Fast, reliable currency conversion
      </p>
    </header>
  )
}

