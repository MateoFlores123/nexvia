// Nosotros.jsx
import { useState, useEffect, useRef } from 'react';
import styles from './Nosotros.module.css';
import { ShieldCheck, Clock3, HeartHandshake } from 'lucide-react';

const PILLARS = [
  {
    Icon: ShieldCheck,
    title: 'Calidad',
    text: 'Fabricantes seleccionados y procesos validados.',
  },
  {
    Icon: Clock3,
    title: 'Cumplimiento',
    text: 'Un proveedor que responde y cumple sus tiempos.',
  },
  {
    Icon: HeartHandshake,
    title: 'Atención personalizada',
    text: 'Entendemos tu operación y sus retos.',
  },
];

// Puedes editar / agregar / quitar preguntas libremente.
// `short` es la etiqueta corta del indice; `q` es la pregunta completa.
const FAQS = [
  {
    short: 'Por qué escogernos',
    q: '¿Por qué escogernos?',
    a: 'Porque no venimos a cerrar una venta puntual, sino a construir una relación de largo plazo. Trabajamos sobre tres pilares: calidad que se mantiene constante en cada lote, cumplimiento de los tiempos que prometemos y atención de alguien que entiende tu operación. Cuando un proveedor responde, cumple y sostiene su calidad, deja de ser un proveedor y se convierte en un aliado del negocio. Ahí es donde queremos llegar contigo.',
  },
  {
    short: 'Cambiar de proveedor',
    q: '¿Por qué deberíamos cambiar de proveedor?',
    a: 'No buscamos que cambien únicamente por precio. Queremos la oportunidad de demostrar una combinación de calidad, servicio y compromiso que realmente haga la diferencia. Sabemos que cambiar de proveedor implica un riesgo, por eso preferimos que nos evalúen por resultados, no por promesas.',
  },
  {
    short: 'Muestras',
    q: '¿Manejan muestras antes de una compra grande?',
    a: 'Sí. Preferimos que prueben el producto en su propia flota antes de comprometerse con un volumen mayor. Escríbenos y coordinamos una muestra para las unidades que quieras evaluar.',
  },
  {
    short: 'Marca nueva',
    q: 'Son una marca nueva, ¿por qué confiar?',
    a: 'Porque la confianza no se pide, se gana. Seleccionamos cuidadosamente a nuestros fabricantes y validamos los procesos antes de traer un producto. Sabemos lo que implica apostar por un nombre que recién empieza, y por eso preferimos que la relación arranque en pequeño y crezca con los resultados a la vista.',
  },
];

export default function Nosotros() {
  const sectionRef = useRef(null);
  // Cada grupo visual tiene su PROPIA referencia y su PROPIO progreso de scroll,
  // calculado segun SU posicion real en pantalla (no la de toda la seccion).
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
            window.setTimeout(() => setPhase('ready'), 1700);
          }
        });
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // --- Desintegracion por scroll: cada grupo calcula su PROPIO progreso (0 a 1) ---
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

  const stage =
    phase === 'hidden' ? styles.hidden : phase === 'entering' ? styles.anim : styles.fly;

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className={styles.nosotrosSection}
      style={{ '--p': 0 }}
    >
      {/* ---------- Lineas doradas decorativas de fondo (rompen el blanco) ---------- */}
      <svg
        className={styles.goldLines}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nosotrosGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2d27a" />
            <stop offset="50%" stopColor="#c68a2e" />
            <stop offset="100%" stopColor="#f2d27a" />
          </linearGradient>
        </defs>
        <g stroke="url(#nosotrosGold)" strokeWidth="1.4" fill="none">
          <path d="M-40,120 L560,-30" />
          <path d="M-60,330 L420,880" />
          <path d="M1480,80 L900,700" />
          <path d="M1180,-40 L1520,420" />
          <path d="M1500,560 L980,940" />
          <path d="M120,-30 L760,540" />
        </g>
      </svg>

      {/* Luces suaves para dar profundidad */}
      <span className={styles.glowWarm} aria-hidden="true" />
      <span className={styles.glowGold} aria-hidden="true" />

      <div
        ref={bannerRef}
        className={`${styles.topBanner} ${stage}`}
        style={{ '--delay': '0s', '--ey': '-40px', '--fy': '-120px', '--fs': '0.15' }}
      >
        <span className={styles.topBannerText}>Quiénes somos</span>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.left} ref={leftRef}>
            <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>

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
              Somos una empresa de importaciones que está introduciendo al mercado una nueva
              línea de repuestos para transporte pesado, desde Arequipa para todo el sur del
              país. Sabemos lo que implica confiar en una marca nueva, por eso nuestro
              compromiso es simple: demostrar con hechos la calidad de nuestro producto y el
              nivel de nuestro servicio, entrega tras entrega.
            </p>

            <div
              className={`${styles.badges} ${stage}`}
              style={{
                '--delay': '0.34s',
                '--ex': '-40px', '--ey': '30px',
                '--fx': '-120px', '--fy': '80px', '--fr': '-6deg', '--fs': '0.2',
              }}
            >
              <span className={styles.badge}>Base en Arequipa</span>
              <span className={styles.badge}>Cobertura en el sur</span>
              <span className={styles.badge}>Catálogo en crecimiento</span>
            </div>
          </div>

          {/* ---------- Los pilares como "edificios" sobre la ola (igual que el logo) ---------- */}
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
                    <span className={styles.pillarNum}>{`0${i + 1}`}</span>
                    <h3 className={styles.pillarTitle}>{title}</h3>
                    <p className={styles.pillarText}>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* La ola sobre la que reposan las tarjetas: onda oscura + trazo naranja,
                la misma relacion que tiene el logo (edificios sobre la ola). */}
            <svg
              className={`${styles.baseWave} ${stage}`}
              style={{
                '--delay': '0.62s',
                '--ex': '0px', '--ey': '24px', '--es': '0.9',
                '--fx': '0px', '--fy': '70px', '--fr': '0deg', '--fs': '0.2',
              }}
              viewBox="0 0 100 26"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="nosotrosWaveDark" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#12181b" />
                  <stop offset="60%" stopColor="#2b3439" />
                  <stop offset="100%" stopColor="#49535a" />
                </linearGradient>
              </defs>

              {/* onda oscura: las tarjetas se apoyan sobre su lomo */}
              <path
                d="M0,7 C16,-1 34,13 52,11 C72,9 88,2 100,5 L100,15 C88,12 72,19 52,21 C34,23 16,9 0,17 Z"
                fill="url(#nosotrosWaveDark)"
              />
              {/* trazo naranja por debajo, como el swoosh del logo */}
              <path
                d="M0,20 C16,12 34,26 52,24 C72,22 88,15 100,18"
                fill="none"
                stroke="#e2792c"
                strokeWidth="1.6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        {/* ---------- FAQ (acordeon) ---------- */}
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

          {/* ----- Indice (columna izquierda) ----- */}
          <div className={styles.faqAside}>
            <span className={styles.faqLabel}>Nos lo preguntan seguido</span>
            <h3 className={styles.faqHeading}>
              Preguntas
              <br />
              <span className={styles.faqHeadingGold}>frecuentes</span>
            </h3>

            <ul className={styles.faqIndex} role="tablist" aria-label="Preguntas frecuentes">
              {FAQS.map((item, i) => (
                <li key={item.q}>
                  <button
                    type="button"
                    role="tab"
                    id={`faq-tab-${i}`}
                    aria-selected={openFaq === i}
                    aria-controls={`faq-pane-${i}`}
                    className={`${styles.faqIndexBtn} ${openFaq === i ? styles.faqIndexActive : ''}`}
                    onClick={() => setOpenFaq(i)}
                  >
                    <span className={styles.faqIndexNum}>{`0${i + 1}`}</span>
                    <span className={styles.faqIndexText}>{item.short}</span>
                    <span className={styles.faqIndexBar} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ----- Respuesta (columna derecha) ----- */}
          <div
            className={styles.faqPane}
            id={`faq-pane-${openFaq}`}
            role="tabpanel"
            aria-labelledby={`faq-tab-${openFaq}`}
            key={openFaq} /* fuerza la animacion de entrada al cambiar */
          >
            <span className={styles.faqPaneNum} aria-hidden="true">
              {`0${openFaq + 1}`}
            </span>

            <h4 className={styles.faqPaneQ}>{FAQS[openFaq].q}</h4>

            <span className={styles.faqPaneRule} aria-hidden="true" />

            <p className={styles.faqPaneA}>{FAQS[openFaq].a}</p>

            <div className={styles.faqPaneFoot}>
              <span className={styles.faqPaneSign}>NEXVIA</span>
              <a href="#contacto" className={styles.faqPaneCta}>
                Conversemos
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}