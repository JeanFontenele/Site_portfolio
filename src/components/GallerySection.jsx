import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

import dashboard from '../assets/images/secao_meus_projetos/dashboard.png';
import dashboard2 from '../assets/images/secao_meus_projetos/dashboard2.png';
import dashboard3 from '../assets/images/secao_meus_projetos/dashboard3.png';
import dashboard4 from '../assets/images/secao_meus_projetos/dashboard4.png';
import dashboard5 from '../assets/images/secao_meus_projetos/dashboard5.png';
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
import site_agencia_web from '../assets/images/secao_meus_projetos/site_agencia_web.png';
import site_agencia_web2 from '../assets/images/secao_meus_projetos/site_agencia_web2.png';
import site_agencia_web3 from '../assets/images/secao_meus_projetos/site_agencia_web3.png';
import site_agencia_web4 from '../assets/images/secao_meus_projetos/site_agencia_web4.png';
import site_agencia_web5 from '../assets/images/secao_meus_projetos/site_agencia_web5.png';
import site_agencia_web6 from '../assets/images/secao_meus_projetos/site_agencia_web6.png';
import site_institucional from '../assets/images/secao_meus_projetos/site_institucional.png';
import site_institucional2 from '../assets/images/secao_meus_projetos/site_institucional2.png';
import site_institucional3 from '../assets/images/secao_meus_projetos/site_institucional3.png';
import site_institucional4 from '../assets/images/secao_meus_projetos/site_institucional4.png';
import site_institucional5 from '../assets/images/secao_meus_projetos/site_institucional5.png';
import site_institucional6 from '../assets/images/secao_meus_projetos/site_institucional6.png';
import site_institucional7 from '../assets/images/secao_meus_projetos/site_institucional7.png';
import site_institucional8 from '../assets/images/secao_meus_projetos/site_institucional8.png';
import site_institucional9 from '../assets/images/secao_meus_projetos/site_institucional9.png';
import e_commerce_tecnologia from '../assets/images/secao_meus_projetos/e-commerce_tecnologia.png';
import e_commerce_tecnologia2 from '../assets/images/secao_meus_projetos/e-commerce_tecnologia2.png';
import e_commerce_tecnologia3 from '../assets/images/secao_meus_projetos/e-commerce_tecnologia3.png';
import e_commerce_tecnologia4 from '../assets/images/secao_meus_projetos/e-commerce_tecnologia4.png';

const projectData = {
  projeto1: {
    id: 'projeto1',
    title: 'Projeto Portal de Notícias',
    description: 'Portal de notícias com Node.js, Express e front-end responsivo',
    images: [
      portal_de_noticias,
      portal_de_noticias2,
      portal_de_noticias3,
      portal_de_noticias4,
      portal_de_noticias5,
      portal_de_noticias6,
    ],
  },
  projeto2: {
    id: 'projeto2',
    title: 'Projeto Site de Arquitetura e Design',
    description: 'Site comercial institucional para escritório de arquitetura e interiores',
    images: [
      site_arquitetura,
      site_arquitetura2,
      site_arquitetura3,
      site_arquitetura4,
      site_arquitetura5,
      site_arquitetura6,
      site_arquitetura7,
    ],
  },
  projeto3: {
    id: 'projeto3',
    title: 'Projeto Dashboard Financeiro',
    description: 'Dashboard interativo para gestão e administração financeira, com informações da bolsa de valores em PHP',
    images: [
      dashboard,
      dashboard2,
      dashboard3,
      dashboard4,
      dashboard5
    ],
  },
  projeto4: {
    id: 'projeto4',
    title: 'Projeto Agência Web',
    description: 'Site de agência web e marketing digital',
    images: [
      site_agencia_web,
      site_agencia_web2,
      site_agencia_web3,
      site_agencia_web4,
      site_agencia_web5,
      site_agencia_web6
    ],
  },
  projeto5: {
    id: 'projeto5',
    title: 'Projeto Site Institucional',
    description: 'Site de empresa desenvolvedora de softwares',
    images: [
      site_institucional,
      site_institucional2,
      site_institucional3,
      site_institucional4,
      site_institucional5,
      site_institucional6,
      site_institucional7,
      site_institucional8,
      site_institucional9
    ],
  },
  projeto6: {
    id: 'projeto6',
    title: 'Projeto Site E-commerce',
    description: 'Site de e-commerce para produtos de tecnologia',
    images: [
      e_commerce_tecnologia,
      e_commerce_tecnologia2,
      e_commerce_tecnologia3,
      e_commerce_tecnologia4
    ],
  },
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 350 : direction < 0 ? -350 : 0,
    opacity: 0,
    scale: 0.94,
    filter: 'blur(4px)',
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 32, mass: 0.8 },
      opacity: { duration: 0.28, ease: 'easeOut' },
      scale: { duration: 0.28, ease: 'easeOut' },
      filter: { duration: 0.2 },
    },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction > 0 ? -350 : direction < 0 ? 350 : 0,
    opacity: 0,
    scale: 0.94,
    filter: 'blur(4px)',
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 32, mass: 0.8 },
      opacity: { duration: 0.22, ease: 'easeIn' },
      scale: { duration: 0.22, ease: 'easeIn' },
      filter: { duration: 0.18 },
    },
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export default function GallerySection(props) {
  const { projeto, onClose } = props;
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [[page, direction], setPage] = useState([0, 0]);

  // Suporta tanto prop como string quanto como objeto { projeto: '...' }
  const projectKey = typeof projeto === 'object' && projeto !== null
    ? (projeto.projeto || projeto.id || '')
    : (projeto || '');

  useEffect(() => {
    if (projectKey && projectData[projectKey]) {
      setSelectedProject(projectKey);
      setPage([0, 0]);
      setOpen(true);
    }
  }, [projectKey]);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const currentProject = selectedProject ? projectData[selectedProject] : null;
  const images = currentProject?.images || [];
  const numImages = images.length;

  const imageIndex = numImages > 0
    ? ((page % numImages) + numImages) % numImages
    : 0;

  const nextImage = useCallback(() => {
    if (numImages <= 1) return;
    setPage(([prevPage]) => [prevPage + 1, 1]);
  }, [numImages]);

  const prevImage = useCallback(() => {
    if (numImages <= 1) return;
    setPage(([prevPage]) => [prevPage - 1, -1]);
  }, [numImages]);

  const goToImage = useCallback((targetIndex) => {
    if (targetIndex === imageIndex || numImages <= 1) return;
    const diff = targetIndex - imageIndex;
    const dir = diff > 0 ? 1 : -1;
    setPage(([prevPage]) => [prevPage + diff, dir]);
  }, [imageIndex, numImages]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleClose, nextImage, prevImage]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && currentProject && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="modal-galeria"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 25 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header da Galeria */}
            <div className="modal-galeria-header">
              <div className="modal-header-info">
                <span className="modal-tag">Galeria do Projeto</span>
                <h2 className="galeria-title">{currentProject.title}</h2>
              </div>
              <motion.button
                type="button"
                className="x-fechar"
                onClick={handleClose}
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Fechar galeria"
              >
                ✕
              </motion.button>
            </div>

            {/* Carrossel de Imagens */}
            <div className="modal-galeria-body">
              {numImages > 1 && (
                <motion.button
                  type="button"
                  className="carousel-btn prev"
                  onClick={prevImage}
                  whileHover={{ scale: 1.12, x: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Imagem anterior"
                >
                  ◀
                </motion.button>
              )}

              <div className="carousel-viewport">
                <AnimatePresence custom={direction} mode="popLayout" initial={false}>
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.65}
                    onDragEnd={(_e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold || offset.x < -60) {
                        nextImage();
                      } else if (swipe > swipeConfidenceThreshold || offset.x > 60) {
                        prevImage();
                      }
                    }}
                    className="carousel-slide"
                  >
                    <img
                      src={images[imageIndex]}
                      alt={`${currentProject.title} - Imagem ${imageIndex + 1}`}
                      className="carousel-image"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {numImages > 1 && (
                <motion.button
                  type="button"
                  className="carousel-btn next"
                  onClick={nextImage}
                  whileHover={{ scale: 1.12, x: 3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Próxima imagem"
                >
                  ▶
                </motion.button>
              )}
            </div>

            {/* Rodapé da Galeria */}
            <div className="modal-galeria-footer">
              <div className="Indicador-img">
                {imageIndex + 1} / {numImages}
              </div>

              {numImages > 1 && (
                <div className="galeria-dots">
                  {images.map((_, idx) => (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() => goToImage(idx)}
                      className={`galeria-dot ${idx === imageIndex ? 'active' : ''}`}
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Ir para a imagem ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="modal-nav-hint">
                <span>Navegue com setas ou arraste</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}