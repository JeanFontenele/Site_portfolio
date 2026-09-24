//Customizei um hook para utilizar o IntersectionObserver no componente da página para observar as seções e aplicar as animações.
import { useState, useEffect, useRef } from "react";

const useIntersectionObserver = (options) => {

    const [isIntersecting, setIsIntersecting] = useState(false)
    const targetRef = useRef([])

    useEffect(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            setIsIntersecting(entry.isIntersecting)
        }, options)

        const currentTarget = targetRef.current

        if(currentTarget){
            observer.observe(currentTarget)
        }

        return () => {
            if(currentTarget){
                observer.unobserve(currentTarget)
            }
        }
    },[options])

    return [ targetRef, isIntersecting ]

}

export default useIntersectionObserver;

/*

import React, { useRef, useEffect } from 'react';

function App() {
  // 1. Inicializa o ref como um array vazio
  const sectionsRef = useRef([]);

  useEffect(() => {
    // 3. Acessa os elementos do DOM
    console.log(sectionsRef.current); // Aqui está o seu array de seções
    
    sectionsRef.current.forEach((section, index) => {
      console.log(`Seção ${index + 1}:`, section);
      // Exemplo: aplicar estilos
      // section.style.border = '1px solid red';
    });
  }, []);

  return (
    <div>
      { 2. Função de callback na ref para preencher o array }
      <section ref={(el) => (sectionsRef.current[0] = el)}>Seção 1</section>
      <section ref={(el) => (sectionsRef.current[1] = el)}>Seção 2</section>
      <section ref={(el) => (sectionsRef.current[2] = el)}>Seção 3</section>
    </div>
  );
}

export default App;



EXEMPLO DE LISTAS DINAMICAS MAP
const data = [1, 2, 3, 4];
const sectionsRef = useRef([]);

// ... dentro do return
{data.map((item, index) => (
  <section 
    key={item} 
    ref={(el) => (sectionsRef.current[index] = el)}
  >
    Seção {item}
  </section>
))}


*/