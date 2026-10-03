import './indexGlobal.css'
import Header from './components/Header'
import Secoes from './components/Secoes'
import Footer from './components/footer'
import NetworkBackground from './components/NetworkBackground'
import { useRef } from 'react'

function App() {
  //Esquema de animação de scrollbar para seção especifica quando se clica no item do menu.
  const sectionsRef = {
    sobre: useRef(null),
    projetos: useRef(null),
    contato: useRef(null),
  };

  const scrollToSection = (section) => {
    const element = sectionsRef[section].current;
    const elementSobre = (section == "sobre") ? sectionsRef[section].current : '' 
    //console.log(elementSobre)
    if (element) {  
      if(elementSobre != ""){
        window.scrollTo({
          top: element.offsetTop + 550,
          behavior: "smooth",
        });
      }else{
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  };



  return (
    <div>
      <NetworkBackground />
      <Header onNavigate={scrollToSection} />
      <Secoes sectionsRef={sectionsRef} />
      <Footer sectionsRef={sectionsRef} />
    </div>
  )
}

export default App
