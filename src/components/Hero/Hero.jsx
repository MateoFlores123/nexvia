import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './Hero.module.css';


const HERO_IMAGE = { src: '/hero/slide-2.png', alt: 'Bolsa de aire Yitao protegiendo un producto' };

export default function Hero() {
  useEffect(() => {
    const heroHeight = window.innerHeight;
    const onScroll = () => {
      const progress = Math.min(window.scrollY / heroHeight, 1);
      document.documentElement.style.setProperty('--hero-progress', progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className={styles.heroSection}>
      <Navbar />
      <div className={styles.overlay} />

      {/* Curva: ahora ocupa toda la seccion, el viewBox en per-mille
          hace que el eje Y sea directamente el % de altura de la seccion */}
      {/* Curva naranja: la misma forma que la blanca, detras y desplazada
    un poco hacia abajo -> se asoma como sombra/contorno debajo de ella */}
      {/* Curva naranja: MISMA forma que la blanca, pero un poco mas ARRIBA (offset negativo)
    -> se ve como un borde/sombra justo pegado encima de la curva blanca */}
      <svg
        className={styles.waveAccent}
        viewBox="0 0 1440 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,650 C 480,690 960,470 1440,590 L1440,1000 L0,1000 Z" fill="#e2792c" />
      </svg>

      {/* Curva blanca principal, encima */}
      <svg
        className={styles.wave}
        viewBox="0 0 1440 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        
          <path d="M0,640 C 480,720 960,500 1440,620 L1440,1000 L0,1000 Z" fill="#FAF7D4" />

        
      </svg>
      

      {/* --- Titulo: pegado justo arriba del lado IZQUIERDO de la curva --- */}
      <div className={styles.topBlock}>
        <div className={styles.flyEyebrow}>
          <div className={styles.enterEyebrow}>
            <span className={styles.eyebrow}>
              Importaciones &middot; Calidad &middot; competitividad
            </span>
          </div>
        </div>

        <div className={styles.flyTitle}>
          <div className={styles.enterTitle}>
            <h1 className={styles.title}>
              Conectamos mercados
              <br />
              Impulsamos negocios
            </h1>
          </div>
        </div>
      </div>

      {/* --- Subtitulo + CTA: debajo del lado izquierdo de la curva, sobre blanco --- */}
      <div className={styles.bottomBlock}>
        <div className={styles.flySubtitle}>
          <div className={styles.enterSubtitle}>
            <p className={styles.subtitle}>
              Empresa Arequipeña especializada en repuestos importados para transporte pesado: Calidad constante y entregas a tiempo para tu operación
            </p>
          </div>
        </div>

        <div className={styles.flyCta}>
          <div className={styles.enterCta}>
            <div className={styles.ctaRow}>
              <a href="#oferta" className={styles.ctaPrimary}>
                Ver productos
              </a>
              <a href="#nosotros" className={styles.ctaSecondary}>
                Conocenos
              </a>
            </div>
          </div>
        </div>

        
      </div>

      

      <div className={styles.fade} />
    </section>
  );
}