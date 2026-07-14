// Galeria.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import styles from './Galeria.module.css';

/* Coloca tus imagenes en public/galeria/ (o cambia las rutas).
   size: 'big' (2x2) | 'wide' (2 col) | 'tall' (2 filas) | 'normal'
   Ajusta libremente el orden y los tamanos. */
const IMAGES = [
  { src: '/galeria/1.jpg', alt: 'Bolsas de aire para embalaje', caption: 'Protección en cada envío', size: 'big' },
  { src: '/galeria/2.jpg', alt: 'Rollos de bolsas de aire', caption: 'Rollos continuos', size: 'normal' },
  { src: '/galeria/3.jpg', alt: 'Embalaje de productos frágiles', caption: 'Productos frágiles', size: 'tall' },
  { src: '/galeria/4.jpg', alt: 'Almacén logístico', caption: 'Listos para despacho', size: 'wide' },
  { src: '/galeria/5.jpg', alt: 'Detalle del material', caption: 'Material resistente', size: 'normal' },
  { src: '/galeria/6.jpg', alt: 'Caja protegida con air bags', caption: 'Relleno de vacíos', size: 'normal' },
  { src: '/galeria/7.jpg', alt: 'Línea de empaque', caption: 'Proceso ágil', size: 'wide' },
  { src: '/galeria/8.jpg', alt: 'Entrega segura', caption: 'Entrega sin daños', size: 'normal' },
];

export default function Galeria() {
  const gridRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(null); // indice de la imagen abierta en el lightbox

  // Reveal suave al entrar en pantalla
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length)),
    []
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % IMAGES.length)),
    []
  );

  // Teclado + bloqueo de scroll cuando el lightbox esta abierto
  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, prev, next]);

  return (
    <section id="galeria" className={styles.galeriaSection}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Galería</span>
        <h2 className={styles.title}>
          Nuestro producto <span className={styles.titleGold}>en acción</span>
        </h2>
        <p className={styles.subtitle}>
          Un vistazo a cómo protegemos cada envío: materiales, procesos y resultados.
        </p>
      </div>

      <div
        ref={gridRef}
        className={`${styles.grid} ${visible ? styles.gridVisible : ''}`}
      >
        {IMAGES.map((img, i) => (
          <figure
            key={img.src}
            className={`${styles.item} ${styles[img.size]}`}
            style={{ '--i': i }}
            onClick={() => setActive(i)}
          >
            <img src={img.src} alt={img.alt} className={styles.img} loading="lazy" />
            <span className={styles.zoomBadge} aria-hidden="true">
              <ZoomIn size={18} strokeWidth={2.2} />
            </span>
            <figcaption className={styles.caption}>{img.caption}</figcaption>
          </figure>
        ))}
      </div>

      {/* ---------- Lightbox ---------- */}
      {active !== null && (
        <div className={styles.lightbox} onClick={close} role="dialog" aria-modal="true">
          <button className={styles.lbClose} onClick={close} aria-label="Cerrar">
            <X size={26} />
          </button>

          <button
            className={`${styles.lbNav} ${styles.lbPrev}`}
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
          >
            <ChevronLeft size={30} />
          </button>

          <figure className={styles.lbFigure} onClick={(e) => e.stopPropagation()}>
            <img src={IMAGES[active].src} alt={IMAGES[active].alt} className={styles.lbImg} />
            <figcaption className={styles.lbCaption}>
              {IMAGES[active].caption}
              <span className={styles.lbCount}>
                {active + 1} / {IMAGES.length}
              </span>
            </figcaption>
          </figure>

          <button
            className={`${styles.lbNav} ${styles.lbNext}`}
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </section>
  );
}