import { useState, useEffect } from 'react';
import { Home, Users, Tag, Image, MessageCircle } from 'lucide-react';
import logo from '../../assets/logo.jpeg';
import styles from './Navbar.module.css';

const LINKS = [
  { label: 'Inicio', href: '#home', Icon: Home },
  { label: 'Nosotros', href: '#nosotros', Icon: Users },
  { label: 'Oferta', href: '#oferta', Icon: Tag },
  { label: 'Contacto', href: '#contacto', Icon: Image },
];

const WHATSAPP_NUMBER = '51999999999'; // TODO: reemplaza por el numero real

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={styles.navbar}>
        <div className={`${styles.logoBox} ${scrolled ? styles.logoBoxScrolled : ''}`}>
          <img src={logo} alt="NEXVIA" className={styles.logoImg} />
        </div>

        <div className={`${styles.menuBox} ${scrolled ? styles.menuBoxScrolled : ''}`}>
          <nav className={styles.linksWrap}>
            <ul className={styles.links}>
              {LINKS.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a href={href}>
                    <Icon size={15} className={styles.linkIcon} strokeWidth={2} />
                    <span className={styles.linkLabel}>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* En mobile este botón se oculta (ver Navbar.module.css) y en su
              lugar aparece la burbuja flotante .whatsappFloat de abajo */}
          <a
            className={styles.whatsappBtn}
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
          >
            <MessageCircle size={16} className={styles.whatsappIcon} strokeWidth={2.2} />
            <span className={styles.whatsappLabel}>WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Burbuja flotante de WhatsApp — solo visible en mobile, fija en la
          esquina inferior derecha, siempre presente sin importar el scroll. */}
      <a
        className={styles.whatsappFloat}
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
      >
        <MessageCircle size={26} strokeWidth={2.2} />
      </a>
    </>
  );
}