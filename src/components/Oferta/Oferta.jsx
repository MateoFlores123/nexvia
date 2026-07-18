// Oferta.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Oferta.module.css';

/* Reemplaza las rutas por las reales (colocalas en /public/oferta/).
   Si aun no tienes foto, la tarjeta se ve bien igual con su color de fondo. */
const PRODUCTOS = [
  {
    codigo: '1R14-039',
    marca: 'Yitao',
    categoria: 'Bolsa de aire',
    nombre: 'Bolsa de aire de suspensión',
    descripcion:
      'Nuestra referencia más comercial. Suspensión neumática para transporte pesado: resistencia y uniformidad en cada unidad.',
    specs: ['Suspensión neumática', 'Alta rotación', 'Stock en Arequipa'],
    img: '/oferta/bolsa-1r14-039.jpg',
  },
  {
    codigo: '68046-7',
    marca: '',
    categoria: 'Amortiguador',
    nombre: 'Amortiguador para transporte pesado',
    descripcion:
      'Referencia comercial de alta rotación. Control de impactos y estabilidad para tu flota, kilómetro tras kilómetro.',
    specs: ['Control de impactos', 'Alta rotación', 'Stock en Arequipa'],
    img: '/oferta/amortiguador-68046-7.jpg',
  },
];

export default function Oferta() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);

  const [phase, setPhase] = useState('hidden');

  // ---------- Parallax con el cursor ----------
  // Guardamos la posicion del mouse como -1..1 en dos variables CSS (--mx, --my).
  // El CSS decide cuanto se mueve cada capa -> capas lejanas se mueven menos
  // que las cercanas, y eso es lo que crea la sensacion de profundidad.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches; // no en tactil
    if (reduce || !fine) return;

    let raf = 0;
    let mx = 0;
    let my = 0;

    const apply = () => {
      raf = 0;
      el.style.setProperty('--mx', mx.toFixed(4));
      el.style.setProperty('--my', my.toFixed(4));
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      // -1 (izquierda/arriba) .. 1 (derecha/abajo)
      mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      my = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    const onLeave = () => {
      mx = 0;
      my = 0;
      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // ---------- Entrada: los bloques "vuelan" a su sitio ----------
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
            window.setTimeout(() => setPhase('ready'), 1500);
          }
        });
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---------- Desintegracion por scroll (mismo sistema que Nosotros) ----------
  useEffect(() => {
    if (phase !== 'ready') return;

    const refs = [headRef, gridRef];
    let raf = 0;

    const update = () => {
      raf = 0;
      const wh = window.innerHeight || 1;
      const assembledRadius = wh * 0.34;
      const span = wh * 0.72;

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
      id="oferta"
      ref={sectionRef}
      className={styles.ofertaSection}
      style={{ '--p': 0, '--mx': 0, '--my': 0 }}
    >
      {/* ---------- Capas de fondo con parallax de cursor ----------
          Cada capa se mueve una cantidad distinta -> profundidad real. */}
      <div className={styles.bgPhoto} aria-hidden="true" />
      <div className={styles.bgTint} aria-hidden="true" />

      <svg
        className={styles.bgLines}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ofertaGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2d27a" />
            <stop offset="50%" stopColor="#c68a2e" />
            <stop offset="100%" stopColor="#f2d27a" />
          </linearGradient>
        </defs>
        <g stroke="url(#ofertaGold)" strokeWidth="1.3" fill="none">
          <path d="M-60,180 L520,-40" />
          <path d="M-40,420 L480,940" />
          <path d="M1500,140 L940,760" />
          <path d="M1240,-40 L1520,380" />
          <path d="M1480,620 L1020,960" />
        </g>
      </svg>

      <span className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ---------- Encabezado ---------- */}
        <header
          className={styles.head}
          ref={headRef}
        >
          <span
            className={`${styles.eyebrow} ${stage}`}
            style={{ '--delay': '0s', '--ey': '-24px', '--fy': '-70px', '--fs': '0.2' }}
          >
            Nuestra oferta
          </span>

          <h2
            className={`${styles.title} ${stage}`}
            style={{
              '--delay': '0.08s',
              '--ex': '-40px', '--ey': '-30px', '--er': '-3deg',
              '--fx': '-90px', '--fy': '-90px', '--fr': '-6deg', '--fs': '0.3',
            }}
          >
            Bolsas de aire y amortiguadores,
            <br />
            <span className={styles.titleGold}>y el catálogo sigue creciendo</span>
          </h2>

          <p
            className={`${styles.lead} ${stage}`}
            style={{
              '--delay': '0.16s',
              '--ex': '-30px', '--ey': '30px',
              '--fx': '-70px', '--fy': '60px', '--fr': '-4deg', '--fs': '0.2',
            }}
          >
            Hoy importamos repuestos de suspensión para transporte pesado. Poco a poco
            sumamos más líneas para acompañar el crecimiento de tu flota.
          </p>
        </header>

        {/* ---------- Grid de productos ---------- */}
        <div className={styles.grid} ref={gridRef}>
          {PRODUCTOS.map((p, i) => (
            <article
              key={p.codigo}
              className={`${styles.card} ${stage}`}
              style={{
                '--delay': `${0.24 + i * 0.1}s`,
                '--ex': `${i === 0 ? -40 : 0}px`,
                '--ey': '60px',
                '--er': `${i === 0 ? -4 : 4}deg`,
                '--fx': `${i === 0 ? -70 : 0}px`,
                '--fy': `${110 + i * 18}px`,
                '--fr': `${i === 0 ? -8 : 6}deg`,
                '--fs': '0.28',
              }}
            >
              <div
                className={styles.media}
                style={{ backgroundImage: `url(${p.img})` }}
              >
                <span className={styles.codigo}>Ref. {p.codigo}</span>
                <span className={styles.mediaShine} aria-hidden="true" />
              </div>

              <div className={styles.cardBody}>
                <span className={styles.marca}>
                  {p.marca ? `${p.marca} · ${p.categoria}` : p.categoria}
                </span>
                <h3 className={styles.cardTitle}>{p.nombre}</h3>
                <p className={styles.cardText}>{p.descripcion}</p>

                <ul className={styles.specs}>
                  {p.specs.map((s) => (
                    <li key={s} className={styles.spec}>
                      {s}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className={styles.cardLink}
                  aria-label={`Cotizar ${p.nombre}`}
                >
                  Cotizar
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
            </article>
          ))}

          {/* Tarjeta "creciendo" */}
          <article
            className={`${styles.card} ${styles.cardSoon} ${stage}`}
            style={{
              '--delay': '0.44s',
              '--ex': '40px', '--ey': '60px', '--er': '4deg',
              '--fx': '70px', '--fy': '150px', '--fr': '10deg', '--fs': '0.3',
            }}
          >
            <div className={styles.cardBody}>
              <span className={styles.soonBadge}>Próximamente</span>
              <h3 className={styles.cardTitle}>Más líneas en camino</h3>
              <p className={styles.cardText}>
                Ampliamos nuestro catálogo constantemente. Cuéntanos qué repuesto
                necesitas y lo buscamos para ti.
              </p>
              <a href="#contacto" className={styles.cardLink}>
                Escríbenos
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
          </article>
        </div>
      </div>
    </section>
  );
}