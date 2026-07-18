// Footer.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, Mail, MapPin, X as CloseIcon } from 'lucide-react';
import styles from './Footer.module.css';

/* Lucide 1.0 eliminó los íconos de marcas (Facebook, Instagram, LinkedIn, etc.)
   por temas de trademark, así que estos van como SVG propios y livianos. */
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" {...props}>
      <path
        d="M15 8.5h2V5.5h-2c-2.2 0-4 1.8-4 4V12H9v3h2v6h3v-6h2.4l.6-3H14V9.5c0-.55.45-1 1-1z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="7" r="1.15" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <line x1="7.5" y1="10" x2="7.5" y2="16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7.5" cy="7" r="1" fill="currentColor" />
      <path
        d="M11 16.5V10M11 12.8c0-1.55 1.2-2.8 2.75-2.8S16.5 11.25 16.5 12.8v3.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// TODO: reemplaza por tus datos reales (mismos que Contacto.jsx)
const WHATSAPP_NUMBER = '51999999999';
const CONTACT_INFO = {
  phone: '+51 999 999 999',
  email: 'contacto@nexvia.com',
  reclamosEmail: 'reclamos@nexvia.com',
  location: 'Arequipa   , Perú',
};
const BRAND = 'Nexvia';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Oferta', href: '#oferta' },
  { label: 'Contacto', href: '#contacto' },
];

/* =====================================================================
   Modal genérico: overlay + panel, cierra con click afuera, Escape,
   y bloquea el scroll del body mientras está abierto.
===================================================================== */
function Modal({ title, onClose, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // enfoca el panel para lectores de pantalla / navegación por teclado
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="footer-modal-title"
        ref={panelRef}
        tabIndex={-1}
      >
        <div className={styles.modalHead}>
          <h3 id="footer-modal-title" className={styles.modalTitle}>{title}</h3>
          <button
            type="button"
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Cerrar"
          >
            <CloseIcon size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

/* =====================================================================
   Contenido: Términos y condiciones
   TODO: reemplaza este texto por el redactado/revisado con tu asesor legal.
===================================================================== */
function TerminosContent() {
  return (
    <div className={styles.legalText}>
      <p>
        Al acceder y utilizar el sitio web de {BRAND} aceptas los presentes
        Términos y Condiciones. Si no estás de acuerdo con alguno de los
        puntos aquí descritos, te pedimos no continuar usando este sitio.
      </p>

      <h4>1. Objeto</h4>
      <p>
        {BRAND} importa y comercializa repuestos de suspensión (bolsas de
        aire, amortiguadores y líneas afines) para vehículos de transporte
        pesado. La información publicada en este sitio tiene fines
        informativos y no constituye una oferta vinculante hasta la
        confirmación expresa de una cotización.
      </p>

      <h4>2. Cotizaciones y precios</h4>
      <p>
        Los precios, disponibilidad de stock y especificaciones técnicas
        mostrados pueden variar sin previo aviso. Toda compra queda sujeta a
        la confirmación de stock y condiciones comerciales vigentes al
        momento de la venta.
      </p>

      <h4>3. Uso del sitio</h4>
      <p>
        El usuario se compromete a utilizar el sitio de forma lícita, sin
        vulnerar derechos de terceros ni la normativa aplicable, y a no
        emplear los formularios de contacto con fines distintos a los
        previstos (consultas, cotizaciones y reclamos).
      </p>

      <h4>4. Propiedad intelectual</h4>
      <p>
        Marcas, logotipos, textos e imágenes de este sitio son propiedad de
        {' '}{BRAND} o de sus proveedores y no pueden reproducirse sin
        autorización previa.
      </p>

      <h4>5. Modificaciones</h4>
      <p>
        {BRAND} puede actualizar estos Términos en cualquier momento. La
        versión vigente será siempre la publicada en este sitio.
      </p>

      <p className={styles.legalMeta}>Última actualización: julio de 2026.</p>
    </div>
  );
}

/* =====================================================================
   Contenido: Política de privacidad
   TODO: ajusta según la base legal real de tratamiento de datos (Ley N.º
   29733 de Protección de Datos Personales, Perú) y tus proveedores.
===================================================================== */
function PrivacidadContent() {
  return (
    <div className={styles.legalText}>
      <p>
        En {BRAND} tratamos tus datos personales conforme a la Ley N.º 29733,
        Ley de Protección de Datos Personales, y su reglamento.
      </p>

      <h4>1. Datos que recopilamos</h4>
      <p>
        Cuando completas nuestros formularios de contacto o del Libro de
        Reclamaciones podemos recopilar: nombre, apellidos, número de
        contacto, correo electrónico y el contenido de tu mensaje o reclamo.
      </p>

      <h4>2. Finalidad</h4>
      <p>
        Usamos estos datos exclusivamente para responder tus consultas,
        elaborar cotizaciones, gestionar reclamos y, si nos lo autorizas,
        enviarte comunicaciones comerciales.
      </p>

      <h4>3. Conservación</h4>
      <p>
        Conservamos tus datos mientras exista una relación comercial o legal
        vigente, y por el plazo adicional que exija la normativa aplicable
        (por ejemplo, los reclamos registrados en el Libro de Reclamaciones).
      </p>

      <h4>4. Tus derechos</h4>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, cancelación y
        oposición (derechos ARCO) escribiéndonos a{' '}
        <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>.
      </p>

      <h4>5. Terceros</h4>
      <p>
        No vendemos tus datos personales. Solo los compartimos con
        proveedores logísticos o tecnológicos estrictamente necesarios para
        prestarte el servicio solicitado.
      </p>

      <p className={styles.legalMeta}>Última actualización: julio de 2026.</p>
    </div>
  );
}

/* =====================================================================
   Libro de Reclamaciones — formulario funcional (referencia: modelo de
   Hoja de Reclamación de INDECOPI, Perú). Al enviar, arma el reclamo y
   lo despacha por correo para que quede constancia formal.
   TODO: si tienes backend, reemplaza el envío por mailto con una
   llamada a tu API para guardar el reclamo con número correlativo.
===================================================================== */
const initialReclamo = {
  tipoDocumento: 'DNI',
  numeroDocumento: '',
  nombre: '',
  telefono: '',
  email: '',
  bienContratado: '',
  montoReclamado: '',
  tipo: 'Reclamo',
  detalle: '',
  pedido: '',
  acepto: false,
};

function LibroReclamacionesContent() {
  const [form, setForm] = useState(initialReclamo);
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.numeroDocumento.trim()) next.numeroDocumento = 'Ingresa tu número de documento';
    if (!form.nombre.trim()) next.nombre = 'Ingresa tu nombre completo';
    if (!form.telefono.trim()) next.telefono = 'Ingresa un teléfono de contacto';
    if (!form.email.trim()) next.email = 'Ingresa un correo de contacto';
    if (!form.bienContratado.trim()) next.bienContratado = 'Indica el producto o servicio';
    if (!form.detalle.trim()) next.detalle = 'Describe tu reclamo o queja';
    if (!form.pedido.trim()) next.pedido = 'Indica qué solicitas como solución';
    if (!form.acepto) next.acepto = 'Debes confirmar que la información es verdadera';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fecha = new Date().toLocaleDateString('es-PE');
    const cuerpo =
      `LIBRO DE RECLAMACIONES — ${BRAND}\n` +
      `Fecha: ${fecha}\n\n` +
      `--- Datos del consumidor ---\n` +
      `Documento: ${form.tipoDocumento} ${form.numeroDocumento}\n` +
      `Nombre: ${form.nombre}\n` +
      `Teléfono: ${form.telefono}\n` +
      `Correo: ${form.email}\n\n` +
      `--- Detalle ---\n` +
      `Bien contratado: ${form.bienContratado}\n` +
      `Monto reclamado: ${form.montoReclamado || 'No indica'}\n` +
      `Tipo: ${form.tipo}\n` +
      `Descripción: ${form.detalle}\n\n` +
      `--- Pedido del consumidor ---\n` +
      `${form.pedido}`;

    const asunto = `Libro de Reclamaciones - ${form.tipo} de ${form.nombre}`;
    const url = `mailto:${CONTACT_INFO.reclamosEmail}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    window.location.href = url;

    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className={styles.reclamoDone}>
        <p>
          Tu reclamo quedó registrado y se abrió tu cliente de correo para
          enviarlo a <strong>{CONTACT_INFO.reclamosEmail}</strong>. Si no se
          abrió automáticamente, escríbenos directamente a ese correo con el
          detalle de tu reclamo.
        </p>
        <p className={styles.legalMeta}>
          Conforme al Código de Protección y Defensa del Consumidor, tienes
          derecho a una respuesta en un plazo no mayor a 30 días calendario.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.reclamoForm} onSubmit={handleSubmit} noValidate>
      <p className={styles.legalHint}>
        Este es tu Libro de Reclamaciones Virtual. Complétalo si tienes una
        disconformidad con un producto o servicio (reclamo) o con la
        atención recibida (queja).
      </p>

      <div className={styles.reclamoRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="tipoDocumento">Tipo de documento</label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            className={styles.input}
            value={form.tipoDocumento}
            onChange={handleChange}
          >
            <option value="DNI">DNI</option>
            <option value="CE">Carné de extranjería</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="RUC">RUC</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="numeroDocumento">N.º de documento</label>
          <input
            id="numeroDocumento"
            name="numeroDocumento"
            type="text"
            className={`${styles.input} ${errors.numeroDocumento ? styles.inputError : ''}`}
            value={form.numeroDocumento}
            onChange={handleChange}
          />
          {errors.numeroDocumento && <span className={styles.error}>{errors.numeroDocumento}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
          value={form.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
      </div>

      <div className={styles.reclamoRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            className={`${styles.input} ${errors.telefono ? styles.inputError : ''}`}
            value={form.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="reclamoEmail">Correo</label>
          <input
            id="reclamoEmail"
            name="email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="bienContratado">Producto o servicio</label>
        <input
          id="bienContratado"
          name="bienContratado"
          type="text"
          placeholder="Ej. Bolsa de aire ref. 1R14-039"
          className={`${styles.input} ${errors.bienContratado ? styles.inputError : ''}`}
          value={form.bienContratado}
          onChange={handleChange}
        />
        {errors.bienContratado && <span className={styles.error}>{errors.bienContratado}</span>}
      </div>

      <div className={styles.reclamoRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="montoReclamado">Monto reclamado (S/, opcional)</label>
          <input
            id="montoReclamado"
            name="montoReclamado"
            type="text"
            placeholder="Ej. 450.00"
            className={styles.input}
            value={form.montoReclamado}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="tipo">Tipo</label>
          <select
            id="tipo"
            name="tipo"
            className={styles.input}
            value={form.tipo}
            onChange={handleChange}
          >
            <option value="Reclamo">Reclamo — disconformidad con el producto/servicio</option>
            <option value="Queja">Queja — disconformidad con la atención</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="detalle">Detalle del reclamo o queja</label>
        <textarea
          id="detalle"
          name="detalle"
          rows={3}
          className={`${styles.input} ${styles.textarea} ${errors.detalle ? styles.inputError : ''}`}
          value={form.detalle}
          onChange={handleChange}
        />
        {errors.detalle && <span className={styles.error}>{errors.detalle}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="pedido">Pedido (¿qué solución esperas?)</label>
        <textarea
          id="pedido"
          name="pedido"
          rows={2}
          className={`${styles.input} ${styles.textarea} ${errors.pedido ? styles.inputError : ''}`}
          value={form.pedido}
          onChange={handleChange}
        />
        {errors.pedido && <span className={styles.error}>{errors.pedido}</span>}
      </div>

      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          name="acepto"
          checked={form.acepto}
          onChange={handleChange}
        />
        <span>Declaro que la información proporcionada es verdadera.</span>
      </label>
      {errors.acepto && <span className={styles.error}>{errors.acepto}</span>}

      <button type="submit" className={styles.reclamoSubmit}>
        Enviar reclamo
      </button>
    </form>
  );
}

/* =====================================================================
   Footer
===================================================================== */
export default function Footer() {
  const [activeModal, setActiveModal] = useState(null); // null | 'terminos' | 'privacidad' | 'libro'
  const year = new Date().getFullYear();

  const close = useCallback(() => setActiveModal(null), []);

  const modalContent = {
    terminos: { title: 'Términos y condiciones', body: <TerminosContent /> },
    privacidad: { title: 'Política de privacidad', body: <PrivacidadContent /> },
    libro: { title: 'Libro de Reclamaciones', body: <LibroReclamacionesContent /> },
  };

  return (
    <footer className={styles.footer}>
      <span className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top}>
          {/* ---------- Marca ---------- */}
          <div className={styles.brandCol}>
            <span className={styles.logo}>
              {BRAND}
              <span className={styles.logoDot} aria-hidden="true" />
            </span>
            <p className={styles.tagline}>
              Repuestos de suspensión para transporte pesado, importados con
              respaldo técnico y stock disponible en Arequipa.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* ---------- Navegación ---------- */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Navegación</h4>
            <ul className={styles.linkList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Legal ---------- */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Legal</h4>
            <ul className={styles.linkList}>
              <li>
                <button type="button" className={styles.linkBtn} onClick={() => setActiveModal('terminos')}>
                  Términos y condiciones
                </button>
              </li>
              <li>
                <button type="button" className={styles.linkBtn} onClick={() => setActiveModal('privacidad')}>
                  Política de privacidad
                </button>
              </li>
              <li>
                <button type="button" className={styles.linkBtn} onClick={() => setActiveModal('libro')}>
                  Libro de Reclamaciones
                </button>
              </li>
            </ul>
          </div>

          {/* ---------- Contacto ---------- */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Contacto</h4>
            <ul className={styles.contactList}>
              <li>
                <Phone size={15} strokeWidth={2} />
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className={styles.link}>
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <Mail size={15} strokeWidth={2} />
                <a href={`mailto:${CONTACT_INFO.email}`} className={styles.link}>
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <MapPin size={15} strokeWidth={2} />
                <span className={styles.link}>{CONTACT_INFO.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- Línea de ruta: guiño al rubro logístico ---------- */}
        <div className={styles.routeLine} aria-hidden="true">
          <span className={styles.routeDot} />
        </div>

        {/* ---------- Barra inferior ---------- */}
        <div className={styles.bottom}>
          <span>© {year} {BRAND}. Todos los derechos reservados.</span>
          <span className={styles.bottomSecondary}>Distribuidores Sur del Peru</span>
        </div>
      </div>

      {activeModal && (
        <Modal title={modalContent[activeModal].title} onClose={close}>
          {modalContent[activeModal].body}
        </Modal>
      )}
    </footer>
  );
}