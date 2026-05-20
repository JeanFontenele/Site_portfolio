import { useState, useRef, useEffect } from 'react'
import './components.css'
import perfil from '../assets/images/perfil.jpg'

export default function Header({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const iconeMenu = useRef(null)
  const menuNav = useRef(null)

  useEffect(()=>{
    if(iconeMenu.current){
      iconeMenu.current.addEventListener('click',()=>{
        let menu = menuNav.current
        if(!open){
          menu.style.opacity = '1'
          menu.style.left = '50%'
          menu.style.transform = "translateX(-50%)"
        }else{
          menu.style.opacity = '0'
          menu.style.left = '0'
          menu.style.transform = "translateX(-1000px)"
        }
      })
    }
  })



  return (
    <div>
      <header className="hero-header">
        <div className='layer'>
          <nav className="nav">
            <div style={{display:'flex',gap:'24px'}} className='container'>
              <div style={{width:'50%'}} className="brand">Portfolio</div>
              
              <ul ref={menuNav} className={`nav-links ${open ? 'open' : ''}`}>
                <li><a title='sobre' onClick={() => onNavigate("sobre")} href="#about">Sobre</a></li>
                <li><a title='projetos' onClick={() => onNavigate("projetos")} href="#projects">Projetos</a></li>
                <li><a title='contato' onClick={() => onNavigate("contato")} href="#contact">Contato</a></li>
              </ul>

              <div style={{width:'50%',textAlign:'right',marginTop:'-10px'}}>
                <button ref={iconeMenu} className={`hamburger ${open ? 'open' : 'close'}`} onClick={() => setOpen(!open)} aria-label="Menu">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>{/*container*/}
          </nav>

          <div className='container'>
            <div className="hero-content">
              <div className="hero-left">
                <h1>Jean Fontenele <br />Desenvolvedor Full-Stack</h1>
                <br />
                <p className="hero-sub">Desenvolvedor de sites, sistemas e aplicativos com aplicação das tecnologias javascript, ReactJS, React Native, NodeJS, PHP, MySql, MongoDB</p>
                <br />
                <div className="hero-actions">
                  <a onClick={() => onNavigate("projetos")} className="btn primary" href="#projects">Ver projetos</a>
                  <div>
                    <a className="btn" href="src/assets/Curriculo.pdf" download>Download CV</a>
                    <a href="src/assets/Curriculum_in_english.pdf" download></a>
                  </div>
                </div>
              </div>

              <div className="hero-right">
                <div className="photo-box">
                  <img src={perfil} alt="Jean Fontenele desenvolvedor" />
                </div>
              </div>
            </div>
          </div>{/*container*/}
        </div>{/*layer*/}
      </header>
    </div>
  )
}
