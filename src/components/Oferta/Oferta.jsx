import styles from './Oferta.module.css';

/* Reemplaza las rutas de imagen por las reales (colocalas en /public/oferta/).
   Si aun no tienes foto, la tarjeta se ve bien igual con su color de fondo. */
const PRODUCTOS = [
  {
    codigo: '1R14-039',
    nombre: 'Bolsa de aire Yitao',
    descripcion:
      'Nuestra referencia mas comercial para embalaje y proteccion. Resistencia y uniformidad en cada unidad.',
    img: '/oferta/bolsa-1r14-039.jpg',
  },
  {
    codigo: '68046-7',
    nombre: 'Bolsa amortiguadora Yitao',
    descripcion:
      'Amortiguacion reforzada para cargas sensibles que necesitan un extra de proteccion en el traslado.',
    img: '/oferta/amortiguador-68046-7.jpg',
  },
];

const PILARES = [
  { titulo: 'Calidad', texto: 'Fabricantes seleccionados y procesos validados en cada lote.' },
  { titulo: 'Cumplimiento', texto: 'Tiempos que respetamos, entrega tras entrega.' },
  { titulo: 'Atencion personalizada', texto: 'Entendemos tu operacion y respondemos rapido.' },
];

export default function Oferta() {
  return (
    <section id="oferta" className={styles.ofertaSection}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Nuestra oferta</span>
          <h2 className={styles.title}>
            Empezamos con bolsas de aire,
            <br />
            y nuestro catalogo sigue creciendo
          </h2>
          <p className={styles.lead}>
            Hoy importamos bolsas de aire marca Yitao para embalaje y amortiguacion.
            Poco a poco sumamos mas soluciones para acompañar el crecimiento de tu negocio.
          </p>
        </header>

        <div className={styles.grid}>
          {PRODUCTOS.map((p) => (
            <article key={p.codigo} className={styles.card}>
              <div
                className={styles.media}
                style={{ backgroundImage: `url(${p.img})` }}
              >
                <span className={styles.codigo}>Ref. {p.codigo}</span>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.marca}>Yitao</span>
                <h3 className={styles.cardTitle}>{p.nombre}</h3>
                <p className={styles.cardText}>{p.descripcion}</p>
                <a
                  href="#contacto"
                  className={styles.cardLink}
                  aria-label={`Cotizar ${p.nombre}`}
                >
                  Cotizar &rarr;
                </a>
              </div>
            </article>
          ))}

          {/* Tarjeta "creciendo" */}
          <article className={`${styles.card} ${styles.cardSoon}`}>
            <div className={styles.cardBody}>
              <span className={styles.soonBadge}>Proximamente</span>
              <h3 className={styles.cardTitle}>Mas soluciones en camino</h3>
              <p className={styles.cardText}>
                Ampliamos nuestro catalogo constantemente. Cuentanos que necesitas y
                lo buscamos para ti.
              </p>
              <a href="#contacto" className={styles.cardLink}>
                Escribenos &rarr;
              </a>
            </div>
          </article>
        </div>

        <ul className={styles.pilares}>
          {PILARES.map((pilar) => (
            <li key={pilar.titulo} className={styles.pilar}>
              <span className={styles.pilarTitulo}>{pilar.titulo}</span>
              <span className={styles.pilarTexto}>{pilar.texto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
