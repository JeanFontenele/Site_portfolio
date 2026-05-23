import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import dashboard from '../assets/images/secao_meus_projetos/dashboard.png'
import dashboard2 from '../assets/images/secao_meus_projetos/dashboard2.png'
import dashboard3 from '../assets/images/secao_meus_projetos/dashboard3.png'
import portal_de_noticias from '../assets/images/secao_meus_projetos/portal_de_noticias.png'
import portal_de_noticias2 from '../assets/images/secao_meus_projetos/portal_de_noticias2.png'
import portal_de_noticias3 from '../assets/images/secao_meus_projetos/portal_de_noticias3.png'
import portal_de_noticias4 from '../assets/images/secao_meus_projetos/portal_de_noticias4.png'
import portal_de_noticias5 from '../assets/images/secao_meus_projetos/portal_de_noticias5.png'
import portal_de_noticias6 from '../assets/images/secao_meus_projetos/portal_de_noticias6.png'
import site_arquitetura from '../assets/images/secao_meus_projetos/site_arquitetura.png'
import site_arquitetura2 from '../assets/images/secao_meus_projetos/site_arquitetura2.png'
import site_arquitetura3 from '../assets/images/secao_meus_projetos/site_arquitetura3.png'
import site_arquitetura4 from '../assets/images/secao_meus_projetos/site_arquitetura4.png'
import site_arquitetura5 from '../assets/images/secao_meus_projetos/site_arquitetura5.png'
import site_arquitetura6 from '../assets/images/secao_meus_projetos/site_arquitetura6.png'
import site_arquitetura7 from '../assets/images/secao_meus_projetos/site_arquitetura7.png'


const imagesProjeto3 = [dashboard,dashboard2,dashboard3]
const imagesProjeto1 = [portal_de_noticias,portal_de_noticias2,portal_de_noticias3,portal_de_noticias4,portal_de_noticias5,portal_de_noticias6]
const imagesProjeto2 = [site_arquitetura,site_arquitetura2,site_arquitetura3,site_arquitetura4,site_arquitetura5,site_arquitetura6,site_arquitetura7]
let images = []

export default function GallerySection(props){
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const galeria = useRef(null)
    
    const projeto = props
    
    useEffect(() => {
        if (projeto.projeto === 'projeto1' || projeto.projeto === 'projeto2' || projeto.projeto === 'projeto3') {
            setOpen(true);
            //document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            if(projeto.projeto === 'projeto3'){
                images = imagesProjeto3
            }
            if(projeto.projeto === 'projeto1'){
                images = imagesProjeto1
            }
            if(projeto.projeto === 'projeto2'){
                images = imagesProjeto2
            }
        }
        
    }, [projeto]);
    

    const nextImage = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    

    return (
        <>
            {open && (
                <div ref={galeria} className="modal-galeria">
                    <h2 className="galeria-title">Galeria</h2>
                    {/* Botão fechar */}
                    <div
                    onClick={() => setOpen(false)}
                    className="x-fechar"
                    >
                    ✕
                    </div>

                    <ImageModal
                        open={open}
                        index={index}
                        nextImage={nextImage}
                        prevImage={prevImage}
                    />
                </div>
            )}
        </>
    );
}

function ImageModal({ open, index, nextImage, prevImage }) {

    return (
        <AnimatePresence>
        {open && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-pai"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="modal-filha"
                >

                    {/* Carrossel */}
                    <div className="modal-filha2">
                    {/* Seta esquerda */}
                        <span
                            onClick={prevImage}
                            className="seta-esquerda"
                        >
                            ◀
                        </span>

                        {/* Imagem */}
                        <div className="modal-filha3">
                            <AnimatePresence mode="wait">
                            <motion.img
                                key={images[index]}
                                src={images[index]}
                                alt="gallery"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}
                                className="width-image"
                            />
                            </AnimatePresence>
                        </div>

                        {/* Seta direita */}
                        <span
                            onClick={nextImage}
                            className="seta-direita"
                        >
                            ▶
                        </span>
                    </div>

                    {/* Indicador */}
                    <div className="Indicador-img">
                    {index + 1} / {images.length}
                    </div>
                </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    );
}