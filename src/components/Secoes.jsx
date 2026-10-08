import React, { useEffect } from 'react'
import './components.css'
import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion";
import GallerySection from './GallerySection'
import html from '../assets/images/html5-azul.png'
import css from '../assets/images/css3-azul.png'
import javascript from '../assets/images/javascript-azul.png'
import nodejs from '../assets/images/nodejs-azul.png'
import php from '../assets/images/php-azul.png'
import mysql from '../assets/images/mysql-azul.png'
import react from '../assets/images/react-azul.png'
import mongodb from '../assets/images/mongodb-azul.png'
import wordpress from '../assets/images/wordpress-azul.png'
import projeto1 from '../assets/images/projeto1.png'
import projeto2 from '../assets/images/projeto2.png'
import projeto3 from '../assets/images/projeto3.png'
import projeto4 from '../assets/images/projeto4.png'
import projeto5 from '../assets/images/projeto5.png'
import projeto6 from '../assets/images/projeto6.png'


export default function Secoes({ sectionsRef }){

    const targetRef = useRef(null)
    const targetRef2 = useRef(null)
    const targetRef3 = useRef(null)

    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        if(window.innerWidth > 500){
            gsap.to(targetRef.current, {
                x: 0,
                opacity: 1,
                scrollTrigger:{
                    trigger: targetRef.current,
                    //markers: true,
                    start: "top 200px",
                    end: "bottom 800px",
                    scrub: false
                }
            });
        }else if(window.innerWidth <= 500){
            gsap.to(targetRef.current, {
                x: 0,
                opacity: 1,
                scrollTrigger:{
                    trigger: targetRef.current,
                    //markers: true,
                    start: "top 200px",
                    end: "bottom 500px",
                    scrub: false
                }
            });
        }

        return ()=> {
            gsap.killTweensOf(targetRef.current)
        }
            //continuar ajustando a animação tanto no gsap quanto no css para ser mais rápida numa tela menor
            //dica: deixei o scrub false e precisar centralizar os elementos, ajustar o translate para os demais elementos da body para ser mais rápido
    },[])

    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        if(window.innerWidth > 500){
            gsap.to(targetRef2.current, {
                x: 0,
                opacity: 1,
                scrollTrigger:{
                    trigger: targetRef2.current,
                    //markers: true,
                    start: "top 300px",
                    end: "bottom 700px",
                    scrub: false
                }
            });
        }else{
            gsap.to(targetRef2.current, {
                x: 0,
                opacity: 1,
                scrollTrigger:{
                    trigger: targetRef2.current,
                    //markers: true,
                    start: "top 200px",
                    end: "bottom 700px",
                    scrub: false
                }
            });
        }

        return ()=> {
            gsap.killTweensOf(targetRef2.current)
        }
    },[])

    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(targetRef3.current, {
            x: 0,
            opacity: 1,
            scrollTrigger:{
                trigger: targetRef3.current,
                //markers: true,
                start: "top 500px",
                end: "bottom 700px",
                scrub: false
            }
        });
        
        return ()=> {
            gsap.killTweensOf(targetRef3.current)
        }
    },[])

    //Efeito de click no botão de visualizar projeto
    const modalImages = useRef(null)
    const [viewProjeto, setViewProjeto] = useState('')
    const projeto = viewProjeto    
    //console.log(projeto)


    




    /* ELEMENTOS HTML DO SITE */
    return(

        <div className="projects-section">
            <div className='layer-secao'></div>
            <div className='container-secoes'>
                <section ref={targetRef} className='sobremim'>
                    <div ref={sectionsRef.sobre}></div>
                    <div className='container'>
                        <h2>Sobre Mim</h2>
                        <p>Sou desenvolvedor de sites e sistemas full-stack, com atuação no desenvolvimento de soluções completas, desde a interface até a lógica de negócio e integração com banco de dados. Desenvolvo projetos utilizando diferentes tecnologias, sempre analisando o contexto e escolhendo as ferramentas que melhor se adequam às necessidades de cada aplicação, buscando desempenho, escalabilidade e boa experiência do usuário.
                        
                        Atualmente, presto serviços para a TopSaúde Hub, uma empresa voltada para o setor de saúde suplementar, que oferece soluções e produtos de software para diversas empresas do ramo. Sou apaixonado por tecnologia, movido por aprendizado contínuo e pela busca constante por boas práticas de desenvolvimento. Gosto de transformar ideias em soluções funcionais, bem estruturadas e alinhadas às necessidades do negócio, sempre focando em código limpo, organização e evolução técnica.</p>
                    </div>
                </section>{/*sobremim*/}

                <section ref={targetRef2} className='habilidades'>
                    <div className='container'>
                        <h2>Habilidades</h2>

                        <div className='grid'>
                            <p>
                                <img alt='html5' src={html}/>
                                <br />
                                HTML 5
                            </p>

                            <p>
                                <img alt='css3' src={css}/>
                                <br />
                                CSS 3
                            </p>

                            <p>
                                <img alt='javascript' src={javascript}/>
                                <br />
                                JavaScript
                            </p>

                            <p>
                                <img alt='nodejs' src={nodejs}/>
                                <br />
                                NodeJS
                            </p>

                            <p>
                                <img alt='php' src={php}/>
                                <br />
                                PHP
                            </p>

                            <p>
                                <img alt='mysql' src={mysql}/>
                                <br />
                                MySql
                            </p>

                            <p>
                                <img alt='reactjs' src={react}/>
                                <br />
                                ReactJS
                            </p>

                            <p>
                                <img alt='mongodb' src={mongodb}/>
                                <br />
                                MongoDB
                            </p>

                            <p>
                                <img alt='wordpress' src={wordpress}/>
                                <br />
                                Wordpress
                            </p>
                        </div>{/*grid*/}
                    </div>
                </section>{/*habilidades*/}

            
                <h2 className="projects-title">Meus Projetos</h2>
                <div className='container'>
                    <div ref={sectionsRef.projetos}></div>
                    <section ref={targetRef3} className="projects-grid">
                        <article id='card1' className="project-card">
                            <div style={{backgroundImage: `url(${projeto1})`}} className="project-thumb" aria-hidden="true" />
                            <h3 className="project-name">Projeto Portal de Noticias</h3>
                            <p className="project-desc">Portal de noticias feito com HTML/CSS e NodeJS.</p>
                            <p onClick={()=>setViewProjeto('projeto1')} className="project-link">Visualizar Projeto</p>
                            <a className="view-projeto" href="https://github.com/JeanFontenele/Projeto-portal-de-noticias/tree/main" target='_blank' rel="noopener noreferrer">Código Fonte</a>
                        </article>

                        <article id='card2' className="project-card">
                            <div style={{backgroundImage: `url(${projeto3})`}} className="project-thumb" aria-hidden="true" />
                            <h3 className="project-name">Projeto Dashboard</h3>
                            <p className="project-desc">Dashboard de gestão financeira com informações da bolsa de valores feita com HTML/CSS e PHP.</p>
                            <p onClick={()=>setViewProjeto('projeto3')} className="project-link">Visualizar Projeto</p>
                            <a className="view-projeto" href="https://github.com/JeanFontenele/Projeto-dashboard-administra-o-financeira" target='_blank' rel="noopener noreferrer">Código Fonte</a>
                        </article>

                        <article id='card3' className="project-card">
                            <div style={{backgroundImage: `url(${projeto2})`}} className="project-thumb" aria-hidden="true" />
                            <h3 className="project-name">Projeto Site de Arquitetura e Design</h3>
                            <p className="project-desc">Site comercial de arquitetura e design de interiores.</p>
                            <p onClick={()=>setViewProjeto('projeto2')} className="project-link">Visualizar Projeto</p>
                            <a className="view-projeto" href="https://github.com/JeanFontenele/Projeto-site-de-arquitetura-e-design-de-interiores" target='_blank' rel="noopener noreferrer">Código Fonte</a>
                        </article>

                        <article id='card1' className="project-card">
                            <div style={{backgroundImage: `url(${projeto4})`}} className="project-thumb" aria-hidden="true" />
                            <h3 className="project-name">Projeto Agência Web</h3>
                            <p className="project-desc">Site de agência web e marketing digital</p>
                            <p onClick={()=>setViewProjeto('projeto4')} className="project-link">Visualizar Projeto</p>
                            <a className="view-projeto" href="https://github.com/JeanFontenele/Projeto-portal-de-noticias/tree/main" target='_blank' rel="noopener noreferrer">Código Fonte</a>
                        </article>

                        <article id='card2' className="project-card">
                            <div style={{backgroundImage: `url(${projeto5})`}} className="project-thumb" aria-hidden="true" />
                            <h3 className="project-name">Projeto Site Institucional</h3>
                            <p className="project-desc">Site de empresa desenvolvedora de softwares</p>
                            <p onClick={()=>setViewProjeto('projeto5')} className="project-link">Visualizar Projeto</p>
                            <a className="view-projeto" href="https://github.com/JeanFontenele/Projeto-dashboard-administra-o-financeira" target='_blank' rel="noopener noreferrer">Código Fonte</a>
                        </article>

                        <article id='card3' className="project-card">
                            <div style={{backgroundImage: `url(${projeto6})`}} className="project-thumb" aria-hidden="true" />
                            <h3 className="project-name">Projeto Site E-commerce</h3>
                            <p className="project-desc">Site de e-commerce para produtos de tecnologia</p>
                            <p onClick={()=>setViewProjeto('projeto6')} className="project-link">Visualizar Projeto</p>
                            <a className="view-projeto" href="https://github.com/JeanFontenele/Projeto-site-de-arquitetura-e-design-de-interiores" target='_blank' rel="noopener noreferrer">Código Fonte</a>
                        </article>

                        <GallerySection projeto={projeto} onClose={() => setViewProjeto('')} />
                        
                    </section>
                </div>
            </div>{/*container-layer*/}
            <div ref={sectionsRef.contato}></div>

        </div>

    )

}