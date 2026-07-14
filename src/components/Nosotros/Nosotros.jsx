// Nosotros.jsx
import { useState, useEffect, useRef } from 'react';
import styles from './Nosotros.module.css';
import { ShieldCheck, Clock3, HeartHandshake } from 'lucide-react';

const PILLARS = [
  {
    Icon: ShieldCheck,
    title: 'Calidad',
    text: 'Fabricantes seleccionados cuidadosamente',
  },
  {
    Icon: Clock3,
    title: 'Cumplimiento',
    text: 'Un proveedor que responde y cumple sus tiempos.',
  },
  {
    Icon: HeartHandshake,
    title: 'Atencion personalizada',
    text: 'Entendemos tus procesos logisticos y tus retos.',
  },
];

// Puedes editar / agregar / quitar preguntas libremente.
// La segunda es un ejemplo: borrala si solo quieres la tuya.
const FAQS = [
  {
    q: '¿Por que deberiamos cambiar de proveedor?',
    a: 'No buscamos que cambien unicamente por precio. Queremos la oportunidad de demostrar una combinacion de calidad, servicio y compromiso que realmente haga la diferencia. Sabemos que cambiar de proveedor implica un riesgo, por eso preferimos que nos evaluen por resultados, no por promesas.',
  },
  {
    q: '¿Manejan muestras antes de una compra grande?',
    a: 'Si. Preferimos que prueben el producto en su propia operacion antes de comprometerse con un volumen mayor. Escribenos y coordinamos una muestra para tu linea de embalaje.',
  },
];

export default function Nosotros() {
  const sectionRef = useRef(null);
  // Cada grupo visual tiene su PROPIA referencia y su PROPIO progreso de scroll,
  // calculado segun SU posicion real en pantalla (no la de toda la seccion).
  // Asi cada uno se arma/desarma cuando EL esta cerca del centro de la pantalla,
  // sin importar si esta arriba (banner/titulo) o abajo (tarjetas/FAQ).
  const bannerRef = useRef(null);
  const leftRef = useRef(null);
  const pillarsRef = useRef(null);
  const faqRef = useRef(null);

  // 'hidden' -> oculto | 'entering' -> volando a su lugar | 'ready' -> listo (reacciona al scroll)
  const [phase, setPhase] = useState('hidden');
  const [openFaq, setOpenFaq] = useState(0);

  // --- Entrada: cuando la seccion aparece en pantalla, los elementos "vuelan" a su sitio ---
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setPhase('ready');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setPhase('entering');
            io.disconnect();
            // al terminar las animaciones de entrada, pasa a reaccionar al scroll
            window.setTimeout(() => setPhase('ready'), 1700);
          }
        });
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // --- Desintegracion por scroll: cada grupo calcula su PROPIO progreso (0 a 1)
  // segun que tan lejos esta SU propio centro del centro de la pantalla.
  // 0 = centrado y armado. 1 = lejos (arriba o abajo) y desarmado.
  // Se actualiza en cada scroll, asi se arma y desarma las veces que subas o bajes.
  useEffect(() => {
    if (phase !== 'ready') return;

    const refs = [bannerRef, leftRef, pillarsRef, faqRef];

    let raf = 0;
    const update = () => {
      raf = 0;
      const wh = window.innerHeight || 1;
      const assembledRadius = wh * 0.32; // zona donde se ve completamente armado
      const span = wh * 0.7;             // que tan rapido pasa de armado a desarmado

      refs.forEach((ref) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - wh / 2);
        const p = Math.min(Math.max((dist - assembledRadius) / span, 0), 1);
        node.style.setProperty('--p', p.toFixed(4));
      });
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [phase]);

  // clase segun la fase: oculto -> animacion de entrada -> transform por scroll
  // (todos los grupos comparten la MISMA clase .fly; cada uno lee su propio
  // --p, seteado localmente en su ref por el efecto de arriba)
  const stage =
    phase === 'hidden' ? styles.hidden : phase === 'entering' ? styles.anim : styles.fly;

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className={styles.nosotrosSection}
      style={{ '--p': 0 }}
    >
      {/* Definicion del recorte en forma de ola (como el logo).
          clipPathUnits="objectBoundingBox" -> el path va de 0 a 1
          y se adapta automaticamente al tamano real del grupo de tarjetas. */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="nosotrosWaveClip" clipPathUnits="objectBoundingBox">
            <path d="M0,-0.6 L1,-0.6 L1,0.94 C0.97,0.955 0.90,0.99 0.85,0.99 C0.6,0.99 0.35,0.82 0.15,0.82 C0.10,0.82 0.04,0.87 0,0.90 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        ref={bannerRef}
        className={`${styles.topBanner} ${stage}`}
        style={{ '--delay': '0s', '--ey': '-40px', '--fy': '-120px', '--fs': '0.15' }}
      >
        <span className={styles.topBannerText}>Quienes somos</span>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.left} ref={leftRef}>
            <h2
              className={`${styles.title} ${stage}`}
              style={{
                '--delay': '0.1s',
                '--ex': '90px', '--ey': '-50px', '--er': '8deg', '--es': '0.9',
                '--fx': '160px', '--fy': '-110px', '--fr': '12deg', '--fs': '0.35',
              }}
            >
              La confianza no se pide,
              <br />
              <span className={styles.titleGold}>se gana.</span>
            </h2>

            <div
              className={`${styles.divider} ${stage}`}
              style={{
                '--delay': '0.18s',
                '--ex': '-60px', '--ey': '20px', '--er': '-6deg',
                '--fx': '-120px', '--fy': '40px', '--fr': '-10deg', '--fs': '0.2',
              }}
            >
              <span className={styles.dividerLine} />
              <svg
                className={styles.dividerCross}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="3" y1="3" x2="21" y2="21" stroke="#12181b" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="21" y1="3" x2="3" y2="21" stroke="#d4af37" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className={styles.dividerLine} />
            </div>

            <p
              className={`${styles.lead} ${stage}`}
              style={{
                '--delay': '0.26s',
                '--ex': '-50px', '--ey': '40px', '--er': '-4deg',
                '--fx': '-140px', '--fy': '70px', '--fr': '-8deg', '--fs': '0.2',
              }}
            >
              Somos una empresa de importaciones que esta introduciendo al mercado una nueva
              linea de bolsas de aire para embalaje y proteccion. Sabemos lo que implica confiar
              en una marca nueva, por eso nuestro compromiso es simple: demostrar con hechos la
              calidad de nuestro producto y el nivel de nuestro servicio, envio tras envio.
            </p>
          </div>

          {/* ---------- Tarjetas con corte de ola + curva naranja (estilo logo) ---------- */}
          <div className={styles.pillarsShowcase} ref={pillarsRef}>
            <div className={styles.right}>
              {PILLARS.map(({ Icon, title, text }, i) => (
                <div
                  key={title}
                  className={`${styles.pillarWrap} ${stage}`}
                  data-index={i}
                  style={{
                    '--delay': `${0.34 + i * 0.1}s`,
                    '--ex': `${i === 0 ? 40 : i === 1 ? 0 : -40}px`,
                    '--ey': '60px',
                    '--er': `${i === 0 ? 6 : i === 1 ? 0 : -6}deg`,
                    '--fx': `${i === 0 ? 60 : i === 1 ? 0 : -80}px`,
                    '--fy': `${160 + i * 20}px`,
                    '--fr': `${i === 0 ? 14 : i === 1 ? -8 : 16}deg`,
                    '--fs': '0.3',
                  }}
                >
                  <div className={styles.pillarIconWrap}>
                    <Icon size={20} strokeWidth={2} className={styles.pillarIcon} />
                  </div>
                  <div className={styles.pillarCard}>
                    <h3 className={styles.pillarTitle}>{title}</h3>
                    <p className={styles.pillarText}>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ceja decorativa: separada de las tarjetas por un espacio en blanco,
                con forma real de ceja (gruesa al centro, afilada en las puntas). */}
            <svg
              className={`${styles.eyebrowWave} ${stage}`}
              style={{
                '--delay': '0.5s',
                '--ex': '0px', '--ey': '20px', '--es': '0.15',
                '--fx': '0px', '--fy': '60px', '--fr': '0deg', '--fs': '0.2',
              }}
              viewBox="0 0 100 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="nosotrosOrangeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2f363b" />
                  <stop offset="55%" stopColor="#454d53" />
                  <stop offset="100%" stopColor="#5a636a" />
                </linearGradient>
              </defs>
              {/* Misma curva (mismo ritmo x: 0 -> 15% pico -> 85% valle -> 100% repunte)
                  que el clip-path de las tarjetas, para que encaje en forma. */}
              <path
                d="M0,19 C4,13 10,4 15,4 C35,4 60,36 85,36 C90,36 97,30 100,27 L100,47 C97,50 90,56 85,56 C60,56 35,24 15,24 C10,24 4,33 0,39 Z"
                fill="url(#nosotrosOrangeGradient)"
              />
            </svg>
          </div>
        </div>

        {/* ---------- FAQ rediseñado (acordeon) ---------- */}
        <div
          ref={faqRef}
          className={`${styles.faqBlock} ${stage}`}
          style={{
            '--delay': '0.3s',
            '--ey': '60px',
            '--fx': '0px', '--fy': '120px', '--fr': '4deg', '--fs': '0.15',
          }}
        >
          <span className={styles.faqDecor} aria-hidden="true">?</span>

          <div className={styles.faqHead}>
            <span className={styles.faqLabel}>Nos lo preguntan seguido</span>
            <h3 className={styles.faqHeading}>Preguntas frecuentes</h3>
          </div>

          <ul className={styles.faqList}>
            {FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <li
                  key={i}
                  className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                >
                  <button
                    type="button"
                    className={styles.faqTrigger}
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    <span className={styles.faqQ}>{item.q}</span>
                    <span className={styles.faqChevron} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div className={styles.faqPanel}>
                    <div className={styles.faqPanelInner}>
                      <p className={styles.faqA}>{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}