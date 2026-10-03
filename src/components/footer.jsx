import './components.css'
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

export default function Footer({ sectionsRef }){

    return(

        <div>
            <footer>
                <div ref={sectionsRef.contato} style={{maxWidth:'1200px'}} className='container'>
                    <h2>Contatos</h2>
                    <div className="contatos">
                        <div className='contato-single'>
                            <div><MdOutlineMail className='icone-fontawesome'/></div>
                            <p>E-mail</p>
                            <p>jeancfsc.30@gmail.com</p>
                        </div>

                        <div className='contato-single'>
                            <div><FaWhatsapp className='icone-fontawesome'/></div>
                            <a target='_blank' href="https://api.whatsapp.com/send?phone=5521990074568&text=Ola%2C+me+fale+sobre+sua+demanda+de+site+ou+sistema+para+seu+neg%C3%B3cio%3F">
                                <p>Telefone</p>
                                <p>21 99007-4568</p>
                            </a>
                        </div>

                        <div className='contato-single'>
                            <div><AiOutlineLinkedin className='icone-fontawesome'/></div>
                            <a target='_blank' href="https://www.linkedin.com/in/jean-fontenele-06b597270/">
                                <p>Linkedin</p>
                                <p>@jean-fontenele</p>
                            </a>
                        </div>

                        <div className='contato-single'>
                            <div><FaGithub className='icone-fontawesome'/></div>
                            <a target='_blank' href="https://github.com/JeanFontenele">
                                <p>Github</p>
                                <p>@JeanFontenele</p>
                            </a>
                        </div>
                    </div>{/*contatos*/}
                </div>{/*container*/}
                <div className='copyrighter'>
                    <p>Copyright &copy; 2026 Jean Fontenele. Todos os direitos reservados.</p>
                </div>{/*copyrighter*/}
            </footer>
        </div>

    )
}