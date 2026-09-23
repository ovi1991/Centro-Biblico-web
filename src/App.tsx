import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Horarios', href: '#horarios' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Contacto', href: '#contacto' },
]

const EVENTS = [
  {
    date: { day: '28', month: 'SEP' },
    title: 'Noche de Alabanza',
    desc: 'Una velada de adoración y oración colectiva. Ven con tu familia.',
    time: '19:00 h',
    tag: 'Adoración',
  },
  {
    date: { day: '05', month: 'OCT' },
    title: 'Estudio Bíblico Intensivo',
    desc: 'Profundizamos en el libro de Romanos. Trae tu Biblia y un corazón abierto.',
    time: '18:30 h',
    tag: 'Formación',
  },
  {
    date: { day: '12', month: 'OCT' },
    title: 'Retiro de Jóvenes',
    desc: 'Fin de semana de comunión, naturaleza y crecimiento espiritual para jóvenes.',
    time: 'Todo el día',
    tag: 'Jóvenes',
  },
  {
    date: { day: '19', month: 'OCT' },
    title: 'Culto Especial de Acción de Gracias',
    desc: 'Celebración familiar con música en vivo, testimonios y la cena del Señor.',
    time: '10:30 h',
    tag: 'Culto',
  },
]

const SERVICES = [
  { day: 'Domingo', times: ['11:00 h — Culto Principal'] },
  { day: 'Martes', times: ['19:00 h — Estudio Bíblico'] },
  { day: 'Viernes', times: ['19:30 h — Ensayo de alabanza'] },
]

const MINISTRIES = [
  { icon: '✝', title: 'Adoración', desc: 'Música y alabanza que eleva el espíritu y glorifica a Dios en cada culto.' },
  { icon: '📖', title: 'Palabra', desc: 'Enseñanza fiel y expositiva de las Escrituras cada semana.' },
  { icon: '🕊', title: 'Oración', desc: 'Grupos de intercesión que sustentan la vida de la iglesia en todo momento.' },
  { icon: '🤝', title: 'Comunidad', desc: 'Células de hogar donde crecemos juntos en fe, amistad y servicio.' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setSent(true)
    setForm({ nombre: '', email: '', mensaje: '' })
    
    try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: '9f641d1d-41c3-448a-bf0a-e6c7db675ee6',
        name: form.nombre,
        email: form.email,
        message: form.mensaje,
        from_name: 'Web Centro Bíblico Marbella',
        subject: `Nuevo mensaje de ${form.nombre} desde la web`,
      }),
    })

    const data = await res.json()

    if (data.success) {
      setSent(true)
      setForm({ nombre: '', email: '', mensaje: '' })
      setTimeout(() => setSent(false), 6000)
    } else {
      setError(true)
    }
  } catch {
    setError(true)
  } finally {
    setLoading(false)
  }

  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: '#0f1c2e', color: '#f5f0e8' }}>

      {/* ─── NAVIGATION ─── */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(15,28,46,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: '68px' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', fontSize: '14px' }}>✝</div>
            <div>
              <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: '16px', letterSpacing: '0.01em', color: '#f5f0e8' }}>
                Centro Biblico Marbella
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#c9a84c', textTransform: 'uppercase' }}>
                Iglesia Evangelica
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{ fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8a9bb5', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8a9bb5')}>
                {l.label}
              </a>
            ))}
            <a href="#contacto" style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 20px', border: '1px solid #c9a84c', color: '#c9a84c', borderRadius: '2px', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#c9a84c'; e.currentTarget.style.color = '#0f1c2e' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#c9a84c' }}>
              Visítanos
            </a>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#c9a84c', fontSize: '22px', cursor: 'pointer' }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ backgroundColor: '#162540', borderTop: '1px solid rgba(201,168,76,0.15)', padding: '16px 24px 24px' }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '12px 0', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8a9bb5', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section id="inicio" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=1600&h=900&fit=crop&auto=format"
          alt="Congregación evangelizando con las manos en alto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,28,46,0.92) 45%, rgba(15,28,46,0.5) 100%)' }} />

        <div className="relative max-w-6xl mx-auto px-6 w-full" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ height: '1px', width: '40px', backgroundColor: '#c9a84c' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c' }}>Bienvenido a nuestra familia</span>
            </div>
            <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 600, lineHeight: 1.15, color: '#f5f0e8', marginBottom: '24px' }}>
              Un lugar donde la<br />
              <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>fe transforma</em><br />
              vidas
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: '#b0bfd4', marginBottom: '40px', maxWidth: '480px' }}>
              Somos una comunidad evangélica unida en la Palabra de Dios, el amor fraternal y el servicio al prójimo. Te esperamos con los brazos abiertos.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#horarios" style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: '#c9a84c', color: '#0f1c2e', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Únete este domingo
              </a>
              <a href="#nosotros" style={{ display: 'inline-block', padding: '14px 32px', border: '1px solid rgba(245,240,232,0.35)', color: '#f5f0e8', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.35)'; e.currentTarget.style.color = '#f5f0e8' }}>
                Conoce más
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#8a9bb5' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Descubre más</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #c9a84c, transparent)' }} />
        </div>
      </section>

      {/* ─── STATS BANNER ─── */}
      <div style={{ backgroundColor: '#c9a84c' }}>
        <div className="max-w-6xl mx-auto px-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
          {[
            { num: '25+', label: 'Años sirviendo' },
            { num: '600+', label: 'Familias en comunidad' },
            { num: '12', label: 'Ministerios activos' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '28px 16px', borderRight: i < 2 ? '1px solid rgba(15,28,46,0.15)' : 'none' }}>
              <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#0f1c2e', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#162540', marginTop: '4px', opacity: 0.75 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── NOSOTROS ─── */}
      <section id="nosotros" style={{ padding: 'clamp(60px, 8vw, 120px) 24px' }}>
        <div className="max-w-6xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ height: '1px', width: '32px', backgroundColor: '#c9a84c' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c' }}>Nuestra misión</span>
            </div>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, lineHeight: 1.2, color: '#f5f0e8', marginBottom: '24px' }}>
              Arraigados en Cristo,<br />enviados al mundo
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#8a9bb5', marginBottom: '20px' }}>
              Desde 1998, La Iglesia Centro Biblico Marbella ha proclamado el evangelio de Jesucristo en nuestra ciudad y más allá. Creemos en la Biblia como Palabra inspirada de Dios, en la salvación por gracia mediante la fe, y en el poder transformador del Espíritu Santo.
            </p>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#8a9bb5', marginBottom: '32px' }}>
              Nuestra visión es ser una iglesia que discipula, envía y ama — a los de dentro con fidelidad, y a los de fuera con compasión.
            </p>
            <blockquote style={{ borderLeft: '3px solid #c9a84c', paddingLeft: '20px', fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '15px', color: '#e8dfd0', lineHeight: 1.7 }}>
              "Porque tanto amó Dios al mundo, que dio a su Hijo unigénito, para que todo el que crea en él no se pierda, sino que tenga vida eterna."
              <cite style={{ display: 'block', marginTop: '8px', fontStyle: 'normal', fontSize: '12px', letterSpacing: '0.08em', color: '#c9a84c' }}>— Juan 3:16</cite>
            </blockquote>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1622598453695-4fbaf151aadc?w=700&h=500&fit=crop&auto=format"
              alt="Congregación alabando a Dios en el culto"
              style={{ width: '100%', borderRadius: '2px', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }}
            />
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', backgroundColor: '#162540', border: '1px solid rgba(201,168,76,0.3)', padding: '20px 24px', borderRadius: '2px' }}>
              <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#c9a84c' }}>1998</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a9bb5', marginTop: '2px' }}>Fundada en fe</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MINISTERIOS ─── */}
      <section style={{ backgroundColor: '#162540', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ height: '1px', width: '32px', backgroundColor: '#c9a84c' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c' }}>Ministerios</span>
              <div style={{ height: '1px', width: '32px', backgroundColor: '#c9a84c' }} />
            </div>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 600, color: '#f5f0e8' }}>
              Creciendo juntos en cada área
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2px' }}>
            {MINISTRIES.map((m, i) => (
              <div key={i} style={{ backgroundColor: '#1e3358', padding: '36px 28px', transition: 'background-color 0.2s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#243d6a')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1e3358')}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>{m.icon}</div>
                <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.15rem', fontWeight: 600, color: '#f5f0e8', marginBottom: '10px' }}>{m.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#8a9bb5' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HORARIOS ─── */}
      <section id="horarios" style={{ padding: 'clamp(60px, 8vw, 120px) 24px' }}>
        <div className="max-w-6xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ height: '1px', width: '32px', backgroundColor: '#c9a84c' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c' }}>Horarios</span>
            </div>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600, lineHeight: 1.2, color: '#f5f0e8', marginBottom: '20px' }}>
              Te esperamos cada semana
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#8a9bb5', marginBottom: '32px' }}>
              Todos nuestros cultos son abiertos para todo aquel que quiera encontrarse con Dios. No necesitas reservar — solo ven con tu corazón dispuesto.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#162540', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px' }}>
              <span style={{ fontSize: '20px' }}>📍</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#f5f0e8' }}>Avda Mercado</div>
                <div style={{ fontSize: '13px', color: '#8a9bb5' }}>29600 Marbella, España</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ backgroundColor: '#162540', border: '1px solid rgba(201,168,76,0.12)', padding: '28px 32px' }}>
                <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.1rem', fontWeight: 600, color: '#c9a84c', marginBottom: '12px' }}>{s.day}</div>
                {s.times.map((t, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', borderBottom: j < s.times.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#c9a84c', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: '#e8dfd0' }}>{t}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUOTE DIVIDER ─── */}
      <div style={{ backgroundColor: '#1e3358', padding: '60px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '180px', color: 'rgba(201,168,76,0.04)', fontFamily: 'Georgia, serif', lineHeight: 1, pointerEvents: 'none' }}>❝</div>
        <div className="max-w-3xl mx-auto" style={{ position: 'relative' }}>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontStyle: 'italic', lineHeight: 1.6, color: '#e8dfd0', marginBottom: '16px' }}>
            "El Señor es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar."
          </p>
          <cite style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c9a84c' }}>— Salmo 23:1–2</cite>
        </div>
      </div>

      {/* ─── EVENTOS ─── */}
      <section id="eventos" style={{ padding: 'clamp(60px, 8vw, 120px) 24px', backgroundColor: '#0f1c2e' }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ height: '1px', width: '32px', backgroundColor: '#c9a84c' }} />
                <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c' }}>Próximos eventos</span>
              </div>
              <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 600, color: '#f5f0e8' }}>
                Actividades de la iglesia
              </h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px' }}>
            {EVENTS.map((ev, i) => (
              <div key={i} style={{ backgroundColor: '#162540', padding: '28px', cursor: 'pointer', transition: 'background-color 0.2s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1e3358')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#162540')}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ textAlign: 'center', minWidth: '52px', padding: '8px', backgroundColor: '#0f1c2e', borderRadius: '2px' }}>
                    <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.5rem', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>{ev.date.day}</div>
                    <div style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a9bb5', marginTop: '2px' }}>{ev.date.month}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '4px' }}>{ev.tag}</div>
                    <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.05rem', fontWeight: 600, color: '#f5f0e8', lineHeight: 1.3 }}>{ev.title}</h3>
                  </div>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#8a9bb5', marginBottom: '16px' }}>{ev.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7fa0' }}>🕐</span>
                  <span style={{ fontSize: '12px', color: '#6b7fa0' }}>{ev.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHOTO STRIP ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', height: '220px', overflow: 'hidden' }}>
        {[
          { url: 'https://images.unsplash.com/photo-1570786032462-2efc3ca8fccd?w=600&h=300&fit=crop&auto=format', alt: 'Alabanza' },
          { url: 'https://images.unsplash.com/photo-1505864681725-48344595127c?w=600&h=300&fit=crop&auto=format', alt: 'Fe' },
          { url: 'https://images.unsplash.com/photo-1637615739656-ca10c4285c88?w=600&h=300&fit=crop&auto=format', alt: 'Adoración' },
        ].map((img, i) => (
          <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
            <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', display: 'block' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15,28,46,0.4)' }} />
          </div>
        ))}
      </div>

      {/* ─── CONTACTO ─── */}
      <section id="contacto" style={{ padding: 'clamp(60px, 8vw, 120px) 24px', backgroundColor: '#162540' }}>
        <div className="max-w-6xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ height: '1px', width: '32px', backgroundColor: '#c9a84c' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c' }}>Contacto</span>
            </div>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 600, color: '#f5f0e8', marginBottom: '20px' }}>
              Estamos aquí para ti
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#8a9bb5', marginBottom: '36px' }}>
              Si tienes preguntas, necesitas oración, o simplemente quieres conocernos, no dudes en escribirnos. Respondemos con amor.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '📞', label: 'Teléfono', value: '+34 91 000 1234' },
                { icon: '✉️', label: 'Correo', value: 'info@iglesiavidanueva.es' },
                { icon: '📍', label: 'Dirección', value: 'Avda Mercado , Marbella' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '16px', marginTop: '1px' }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '2px' }}>{c.label}</div>
                    <div style={{ fontSize: '14px', color: '#e8dfd0' }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(['nombre', 'email'] as const).map(field => (
                <div key={field}>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '8px' }}>
                    {field === 'nombre' ? 'Nombre completo' : 'Correo electrónico'}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    required
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    placeholder={field === 'nombre' ? 'María García' : 'maria@ejemplo.com'}
                    style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0f1c2e', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px', color: '#f5f0e8', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#c9a84c')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '8px' }}>
                  Mensaje
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.mensaje}
                  onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                  placeholder="¿En qué podemos ayudarte o cómo podemos orar contigo?"
                  style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0f1c2e', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px', color: '#f5f0e8', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#c9a84c')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')}
                />
              </div>
              <button type="submit" style={{ padding: '14px 28px', backgroundColor: '#c9a84c', color: '#0f1c2e', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', borderRadius: '2px', cursor: 'pointer', transition: 'opacity 0.2s', alignSelf: 'flex-start' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Enviar mensaje
              </button>
              {sent && (
                <div style={{ padding: '12px 16px', backgroundColor: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '2px', fontSize: '14px', color: '#c9a84c' }}>
                  ¡Gracias! Tu mensaje fue enviado. Te responderemos pronto. 🙏
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ backgroundColor: '#0a1520', borderTop: '1px solid rgba(201,168,76,0.12)', padding: '40px 24px' }}>
        <div className="max-w-6xl mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>✝</div>
            <span style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: '15px', color: '#e8dfd0' }}>Iglesia Centro Biblico Marbella</span>
          </div>
          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a9bb5', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8a9bb5')}>
                {l.label}
              </a>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#4a5a70', marginTop: '4px' }}>
            © 2026 Iglesia Centro Biblico Marbella · "La verdad os hará libres" — Juan 8:32
          </p>
        </div>
      </footer>
    </div>
  )
}
