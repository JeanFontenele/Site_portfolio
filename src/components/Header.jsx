import { useState, useRef, useEffect } from 'react'
import './components.css'
import perfil from '../assets/images/Foto_perfil.jpeg'
import video_header from '../assets/video/video_header.mp4'

export default function Header({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const iconeMenu = useRef(null)
  const menuNav = useRef(null)
  const conteudoHeader = useRef(null);

  useEffect(()=>{
    //resolver questão do menu nav deslizante que não funciona em telas menores de 500px
    if(iconeMenu.current){
      iconeMenu.current.addEventListener('click',()=>{
        if(conteudoHeader.current){
          let conteudo = conteudoHeader.current   
          let menu = menuNav.current
          if(!open){
            menu.style.opacity = '1'
            menu.style.left = '50%'
            menu.style.transform = "translateX(-50%)"
            conteudo.classList.remove('conteudoHeader-show')
          }else{
            menu.style.opacity = '0'
            menu.style.left = '0'
            menu.style.transform = "translateX(-100%)"
            conteudo.classList.add('conteudoHeader-show')
          }
        }
      })
    }
  })



  return (
    <div>
      <header className="hero-header">
        <div className='layer'></div>{/*layer*/}
          <nav className="nav">
            <div style={{display:'flex',gap:'24px'}} className='container'>
              <div style={{width:'50%'}} className="brand">Portfolio</div>
              
              <ul ref={menuNav} className={`nav-links ${open ? 'open' : ''}`}>
                <li><a title='sobre' onClick={() => onNavigate("sobre")} href="#about">Sobre</a></li>
                <li><a title='projetos' onClick={() => onNavigate("projetos")} href="#projects">Projetos</a></li>
                <li><a title='contato' onClick={() => onNavigate("contato")} href="#contact">Contato</a></li>
              </ul>

              <div className='box-hamburguer'>
                <button ref={iconeMenu} className={`hamburger ${open ? 'open' : 'close'}`} onClick={() => setOpen(!open)} aria-label="Menu">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>{/*container*/}
          </nav>

          
          <video className='box-video' playsInline autoPlay loop muted>
            <source src={video_header}/>
          </video>
          

          <div className='container'>
            <div ref={conteudoHeader} className="hero-content conteudoHeader-show">
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
      </header>
    </div>
  )
}
