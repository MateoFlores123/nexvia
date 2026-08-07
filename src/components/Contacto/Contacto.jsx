// Contacto.jsx
import { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import styles from './Contacto.module.css';

// TODO: reemplaza por tus datos reales (mismo numero que usa el boton de WhatsApp del navbar)
const WHATSAPP_NUMBER = '51999999999';
const CONTACT_INFO = {
  phone: '+51 999 999 999',
  email: 'Comercial@nexvia.com',
  location: 'Arequipa, Perú',
};

const initialForm = { nombre: '', apellidos: '', numero: '', mensaje: '' };

export default function Contacto() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // ---------- Ensamblado / desensamblado continuo con el scroll ----------
  // --p va de 0 (seccion centrada / armada) a 1 (seccion lejos, arriba o abajo / desarmada).
  // Se recalcula en cada scroll, en ambas direcciones, asi que se arma y desarma
  // las veces que quieras al subir o bajar.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.style.setProperty('--p', 0);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const dist = Math.abs(sectionCenter - viewportCenter);
      // rango de "armado": mientras el centro de la seccion este dentro de este radio,
      // se ve completa. Fuera de ese radio empieza a desarmarse hasta desaparecer.
      const assembledRadius = vh * 0.28;
      const disassembleSpan = vh * 0.65;
      const p = Math.min(Math.max((dist - assembledRadius) / disassembleSpan, 0), 1);
      el.style.setProperty('--p', p.toFixed(4));
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.nombre.trim()) next.nombre = 'Ingresa tu nombre';
    if (!form.apellidos.trim()) next.apellidos = 'Ingresa tus apellidos';
    if (!form.numero.trim()) next.numero = 'Ingresa tu número';
    if (!form.mensaje.trim()) next.mensaje = 'Escribe tu mensaje';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const texto =
      `Hola, mi nombre es ${form.nombre} ${form.apellidos}.\n` +
      `Mi número de contacto es ${form.numero}.\n\n` +
      `Mensaje: ${form.mensaje}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setForm(initialForm);
    setErrors({});
  };

  // pequena ayuda para armar el estilo inline de cada elemento volador
  const fly = (ex, ey, er, es = 0.25) => ({
    '--ex': `${ex}px`,
    '--ey': `${ey}px`,
    '--er': `${er}deg`,
    '--es': es,
  });

  return (
    <section id="contacto" ref={sectionRef} className={styles.contactoSection} style={{ '--p': 0 }}>
      <div className={styles.wrapper}>
        {/* ---------- Izquierda: datos de contacto ---------- */}
        <div className={styles.info}>
          <span className={`${styles.eyebrow} ${styles.flyItem}`} style={fly(-120, -30, -10, 0.3)}>
            Contacto
          </span>
          <h2 className={`${styles.title} ${styles.flyItem}`} style={fly(140, -70, 10, 0.35)}>
            Hablemos de tu <span className={styles.titleGold}>próximo envío</span>
          </h2>
          <p className={`${styles.subtitle} ${styles.flyItem}`} style={fly(-110, 40, -8, 0.25)}>
            Escríbenos por el medio que prefieras. Respondemos rápido y con la
            información que necesitas para decidir con confianza.
          </p>

          <ul className={styles.infoList}>
            <li className={`${styles.infoItem} ${styles.flyItem}`} style={fly(-160, 30, -12, 0.3)}>
              <span className={styles.infoIcon}>
                <Phone size={19} strokeWidth={2} />
              </span>
              <div>
                <span className={styles.infoLabel}>Teléfono</span>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className={styles.infoValue}>
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </li>

            <li className={`${styles.infoItem} ${styles.flyItem}`} style={fly(150, 50, 10, 0.3)}>
              <span className={styles.infoIcon}>
                <Mail size={19} strokeWidth={2} />
              </span>
              <div>
                <span className={styles.infoLabel}>Correo</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className={styles.infoValue}>
                  {CONTACT_INFO.email}
                </a>
              </div>
            </li>

            <li className={`${styles.infoItem} ${styles.flyItem}`} style={fly(-140, 60, -9, 0.3)}>
              <span className={styles.infoIcon}>
                <MapPin size={19} strokeWidth={2} />
              </span>
              <div>
                <span className={styles.infoLabel}>Ubicación</span>
                <span className={styles.infoValue}>{CONTACT_INFO.location}</span>
              </div>
            </li>
          </ul>
        </div>

        {/* ---------- Derecha: formulario ---------- */}
        <div className={`${styles.formCard} ${styles.flyItem}`} style={fly(0, 90, 3, 0.15)}>
          <h3 className={`${styles.formTitle} ${styles.flyItem}`} style={fly(90, -40, 8, 0.3)}>
            Escríbenos
          </h3>
          <p className={`${styles.formHint} ${styles.flyItem}`} style={fly(-80, -20, -6, 0.25)}>
            Completa tus datos y te contactamos por WhatsApp.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={`${styles.field} ${styles.flyItem}`} style={fly(-100, 40, -8, 0.25)}>
                <label className={styles.label} htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
              </div>

              <div className={`${styles.field} ${styles.flyItem}`} style={fly(100, 40, 8, 0.25)}>
                <label className={styles.label} htmlFor="apellidos">Apellidos</label>
                <input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  className={`${styles.input} ${errors.apellidos ? styles.inputError : ''}`}
                  placeholder="Tus apellidos"
                  value={form.apellidos}
                  onChange={handleChange}
                />
                {errors.apellidos && <span className={styles.error}>{errors.apellidos}</span>}
              </div>
            </div>

            <div className={`${styles.field} ${styles.flyItem}`} style={fly(-120, 55, -7, 0.25)}>
              <label className={styles.label} htmlFor="numero">Número</label>
              <input
                id="numero"
                name="numero"
                type="tel"
                className={`${styles.input} ${errors.numero ? styles.inputError : ''}`}
                placeholder="Ej. 999 999 999"
                value={form.numero}
                onChange={handleChange}
              />
              {errors.numero && <span className={styles.error}>{errors.numero}</span>}
            </div>

            <div className={`${styles.field} ${styles.flyItem}`} style={fly(120, 60, 7, 0.25)}>
              <label className={styles.label} htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                className={`${styles.input} ${styles.textarea} ${errors.mensaje ? styles.inputError : ''}`}
                placeholder="Cuéntanos qué necesitas"
                value={form.mensaje}
                onChange={handleChange}
              />
              {errors.mensaje && <span className={styles.error}>{errors.mensaje}</span>}
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} ${styles.flyItem}`}
              style={fly(0, 90, 0, 0.3)}
            >
              <Send size={17} strokeWidth={2.2} />
              <span>Enviar por WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}