import imhotepCCLogo from "../assets/icc.png"
import '../App.css'

export default function Header() {

  return (
    <>
      <div>
        <a href="https://imhotepcc.vercel.app/" target="_blank">
          <img src={imhotepCCLogo} className="logo react" alt="Imhotep Currency logo" />
        </a>
      </div>
      <h1>Imhotep Currency Convertor</h1>
      <p className="read-the-docs">
        Fast, reliable currency conversion
      </p>
    </>
  )
}

