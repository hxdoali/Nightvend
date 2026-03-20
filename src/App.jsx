import React, { useState, useEffect, useRef } from 'react'
import {
  Menu, X, ChevronDown, ChevronUp, MapPin, Phone, Mail,
  Instagram, Linkedin, Shield, Zap, DollarSign,
  CheckCircle, ArrowRight, Star, Clock, TrendingUp
} from 'lucide-react'

/* ───────────────────────── helpers ───────────────────────── */

function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function GradientDivider() {
  return (
    <div
      className="h-[2px] w-24 mx-auto my-4"
      style={{ background: 'linear-gradient(90deg, #00f0ff, #ff2d95, #7b2dff)' }}
    />
  )
}

function SectionHeading({ children, sub }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className="reveal text-center mb-14">
      <h2 className="font-display text-4xl md:text-6xl tracking-wide">{children}</h2>
      <GradientDivider />
      {sub && <p className="text-text-secondary mt-3 max-w-2xl mx-auto text-lg">{sub}</p>}
    </div>
  )
}

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Products', href: '#products' },
  { label: 'For Venues', href: '#for-venues' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Contact', href: '#contact' },
]

const CONTACT_EMAIL = 'contact@getvendetta.com'
const NETWORK_STATS = {
  machines: '85+',
  venues: '60+',
  markets: '16',
}

/* ───────────────────────── Age Gate ───────────────────────── */

function AgeGate({ onVerified }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #ff2d95 0%, transparent 70%)' }} />
      </div>
      <div className="text-center max-w-md relative z-10">
        <h1 className="font-display text-6xl md:text-7xl tracking-wider mb-2 gradient-text">VENDETTA</h1>
        <GradientDivider />
        <p className="text-text-secondary mt-6 mb-8 leading-relaxed">
          This site contains age-restricted products including nicotine. You must be 21 or older to enter.
        </p>
        <p className="font-display text-3xl md:text-4xl tracking-wide mb-8">ARE YOU 21+?</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onVerified}
            className="btn-shimmer px-10 py-3.5 rounded font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,240,255,0.5)]"
            style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
          >
            YES, ENTER
          </button>
          <button
            onClick={() => { window.location.href = 'https://google.com' }}
            className="px-10 py-3.5 rounded font-semibold border border-white/20 text-white hover:border-white/60 transition-all duration-300"
          >
            NO, EXIT
          </button>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Navbar ───────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        <a href="#" className="font-display text-2xl tracking-wider gradient-text">VENDETTA</a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-text-secondary hover:text-accent-cyan transition-colors duration-300">
              {l.label}
            </a>
          ))}
          <a
            href="#for-venues"
            className="btn-shimmer px-6 py-2.5 rounded text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
          >
            PARTNER WITH US
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 px-5 pb-6 pt-2 space-y-4">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close} className="block text-text-secondary hover:text-accent-cyan transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#for-venues"
            onClick={close}
            className="inline-block px-5 py-2 rounded text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
          >
            PARTNER WITH US
          </a>
        </div>
      )}
    </nav>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 scan-overlay">
      {/* Animated orbs - bigger, more dramatic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      <style>{`
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
        }
        .orb-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, #00f0ff 0%, transparent 70%);
          top: -20%; left: -15%;
          opacity: 0.3;
          animation: drift1 14s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #ff2d95 0%, transparent 70%);
          bottom: -20%; right: -15%;
          opacity: 0.35;
          animation: drift2 16s ease-in-out infinite alternate;
        }
        .orb-3 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #7b2dff 0%, transparent 70%);
          top: 30%; left: 60%;
          opacity: 0.25;
          animation: drift3 12s ease-in-out infinite alternate;
        }
        .orb-4 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #ffb800 0%, transparent 70%);
          bottom: 30%; left: 20%;
          opacity: 0.15;
          animation: drift4 18s ease-in-out infinite alternate;
        }
        @keyframes drift1 { to { transform: translate(100px, 80px) scale(1.15); } }
        @keyframes drift2 { to { transform: translate(-80px, -100px) scale(1.2); } }
        @keyframes drift3 { to { transform: translate(-60px, 70px) scale(0.85); } }
        @keyframes drift4 { to { transform: translate(50px, -40px) scale(1.1); } }
      `}</style>

      <div className="relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 mb-8">
          <span className="pulse-dot" />
          <span className="text-accent-cyan text-sm font-medium tracking-wide">LIVE IN NJ & NY NIGHTLIFE HOTSPOTS</span>
        </div>

        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide leading-[0.9] mb-6">
          <span className="gradient-text">THE NIGHT</span><br />
          <span className="text-white">NEVER STOPS</span>
        </h1>

        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Dominating late-night essentials across New Jersey and New York with premium smart vending for bars,
          clubs, and lounges. If your venue is not on Vendetta, that revenue is going to the spot down the block.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#for-venues"
            className="btn-shimmer px-10 py-4 rounded font-semibold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,240,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
          >
            GET A MACHINE IN YOUR VENUE
          </a>
          <a
            href="#products"
            className="group px-10 py-4 rounded font-semibold border border-white/20 text-white text-lg hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300 flex items-center justify-center gap-2"
          >
            SEE WHAT WE STOCK <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          <div>
            <div className="font-display text-3xl md:text-4xl stat-number">{NETWORK_STATS.machines}</div>
            <div className="text-text-muted text-xs uppercase tracking-wider mt-1">Machines Live</div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl stat-number">{NETWORK_STATS.venues}</div>
            <div className="text-text-muted text-xs uppercase tracking-wider mt-1">Partner Venues</div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl stat-number">{NETWORK_STATS.markets}+</div>
            <div className="text-text-muted text-xs uppercase tracking-wider mt-1">Nightlife Markets</div>
          </div>
        </div>
        <p className="text-text-muted text-sm mt-5">
          Peak-hour demand is already being captured nightly by venues inside our network.
        </p>
      </div>
    </section>
  )
}

/* ───────────────────────── How It Works ───────────────────────── */

const STEPS = [
  { num: '01', icon: <Zap size={32} />, title: 'We Install', text: 'We place a premium smart vending machine in your venue at zero cost. Full setup, stocking, and maintenance handled.' },
  { num: '02', icon: <Shield size={32} />, title: 'Guests Tap & Buy', text: 'Patrons scan ID, tap to pay, and grab what they need in seconds. Seamless, age-verified, cashless.' },
  { num: '03', icon: <TrendingUp size={32} />, title: 'You Profit', text: 'Monthly commission on every sale. Passive revenue stream with zero effort and zero liability on your end.' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 py-28 px-5">
      <SectionHeading sub="Three steps. Zero hassle. Pure revenue.">How It Works</SectionHeading>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {STEPS.map((s) => {
          const ref = useScrollReveal()
          return (
            <div key={s.num} ref={ref} className="reveal text-center glow-card bg-bg-secondary rounded-2xl p-10 border border-white/5 group hover:bg-bg-tertiary transition-all duration-500">
              <span
                className="font-display text-6xl bg-clip-text text-transparent block mb-4"
                style={{ backgroundImage: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
              >
                {s.num}
              </span>
              <div className="text-accent-cyan mb-5 flex justify-center">{s.icon}</div>
              <h3 className="font-display text-2xl tracking-wide mb-3">{s.title}</h3>
              <p className="text-text-secondary leading-relaxed">{s.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ───────────────────────── Products ───────────────────────── */

const PRODUCTS = [
  { icon: <Star size={28} />, name: 'Premium Vapes', desc: 'Top-shelf FDA-authorized devices', examples: 'Vuse Alto, NJOY Ace, Logic', color: '#ff2d95' },
  { icon: <Star size={28} />, name: 'Nicotine Pouches', desc: 'Tobacco-free, discreet satisfaction', examples: 'ZYN, On! — all FDA-authorized', color: '#00f0ff' },
  { icon: <Zap size={28} />, name: 'Phone Chargers', desc: 'Stay connected all night', examples: 'USB-C, Lightning, portable power', color: '#7b2dff' },
  { icon: <Star size={28} />, name: 'Personal Care', desc: 'Stay fresh until last call', examples: 'Breath mints, gum, cologne, sanitizer', color: '#ffb800' },
  { icon: <Shield size={28} />, name: 'Protection', desc: 'Be ready for whatever', examples: 'Premium condoms, personal wellness', color: '#ff2d95' },
  { icon: <Clock size={28} />, name: 'Late-Night Essentials', desc: 'Everything you forgot to bring', examples: 'Pain relievers, energy shots, snacks', color: '#00f0ff' },
]

function Products() {
  return (
    <section id="products" className="relative z-10 py-28 px-5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/[0.03] to-transparent pointer-events-none" />
      <SectionHeading sub="Curated for the nightlife crowd. Premium products that sell themselves.">What's Inside</SectionHeading>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {PRODUCTS.map((p) => {
          const ref = useScrollReveal()
          return (
            <div key={p.name} ref={ref} className="reveal glow-card bg-bg-secondary rounded-2xl p-7 border border-white/5 group hover:bg-bg-tertiary transition-all duration-500">
              <div className="mb-4" style={{ color: p.color }}>{p.icon}</div>
              <h3 className="font-display text-xl tracking-wide mb-2">{p.name}</h3>
              <p className="text-text-secondary text-sm mb-2">{p.desc}</p>
              <p className="text-text-muted text-xs">{p.examples}</p>
            </div>
          )
        })}
      </div>
      <p className="max-w-3xl mx-auto mt-12 text-text-muted text-xs text-center leading-relaxed relative z-10">
        WARNING: Some products contain nicotine. Nicotine is an addictive chemical. You must be 21+ to purchase age-restricted products. All nicotine and tobacco products sold are FDA-authorized.
      </p>
    </section>
  )
}

/* ───────────────────────── For Venues ───────────────────────── */

const VALUE_PROPS = [
  { icon: <DollarSign size={24} />, title: 'Passive Revenue', text: 'Earn a monthly commission on every transaction. We handle stocking, maintenance, and customer service.', color: '#00f0ff' },
  { icon: <Shield size={24} />, title: 'Zero Cost. Period.', text: 'We provide the machine, install it, stock it, and maintain it. No upfront cost, no hidden fees, no catches.', color: '#ff2d95' },
  { icon: <Clock size={24} />, title: 'Keep Them Inside', text: 'When guests grab what they need without leaving, they stay longer and spend more at your bar.', color: '#7b2dff' },
  { icon: <CheckCircle size={24} />, title: '100% Compliant', text: 'Age-verified ID scanning, FDA-authorized products, full insurance. We handle all licensing and regulations.', color: '#ffb800' },
]

const VENUE_TYPES = ['Bar', 'Nightclub', 'Restaurant', 'Lounge', 'Hotel', 'Other']
const TRAFFIC_OPTIONS = ['Under 100', '100-300', '300-500', '500+']
const VENUE_METRICS = [
  { label: 'Typical Monthly Commission', value: '$900-$2,200' },
  { label: 'Machine Uptime', value: '99%+' },
  { label: 'Support + Restock Response', value: '<24 Hours' },
]

function ForVenues() {
  const [form, setForm] = useState({
    venueName: '', contactName: '', email: '', phone: '',
    venueType: '', traffic: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`New Vendetta Partner Inquiry - ${form.venueName}`)
    const body = encodeURIComponent(
      [
        `Venue Name: ${form.venueName}`,
        `Contact Name: ${form.contactName}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Venue Type: ${form.venueType}`,
        `Estimated Weekend Nightly Traffic: ${form.traffic}`,
        '',
        'Message / Questions:',
        form.message || 'N/A',
      ].join('\n')
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const inputCls = 'w-full bg-bg-primary border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-text-muted focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] focus:outline-none transition-all duration-300'
  const selectCls = inputCls + ' appearance-none'

  return (
    <section id="for-venues" className="relative z-10 py-28 px-5">
      <SectionHeading sub={`Already ${NETWORK_STATS.machines} live machines across ${NETWORK_STATS.venues} partner venues. If your spot is not on the network yet, your competitors are collecting those late-night sales.`}>Partner With Us</SectionHeading>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-10">
        {VENUE_METRICS.map((m) => (
          <div key={m.label} className="glow-card bg-bg-secondary border border-white/5 rounded-xl p-6 text-center">
            <p className="font-display text-3xl stat-number">{m.value}</p>
            <p className="text-text-muted text-xs uppercase tracking-wider mt-2">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6 mb-20">
        {VALUE_PROPS.map((v) => {
          const ref = useScrollReveal()
          return (
            <div key={v.title} ref={ref} className="reveal glow-card bg-bg-secondary rounded-2xl p-8 border border-white/5 hover:bg-bg-tertiary transition-all duration-500">
              <div className="mb-4" style={{ color: v.color }}>{v.icon}</div>
              <h3 className="font-display text-2xl tracking-wide mb-3">{v.title}</h3>
              <p className="text-text-secondary leading-relaxed">{v.text}</p>
            </div>
          )
        })}
      </div>

      {/* Partner form */}
      <div className="max-w-xl mx-auto">
        {submitted ? (
          <div className="reveal visible text-center glow-card bg-bg-secondary border border-accent-cyan/30 rounded-2xl p-12">
            <CheckCircle className="mx-auto mb-5 text-accent-cyan" size={56} />
            <h3 className="font-display text-3xl tracking-wide mb-3">We'll Be In Touch</h3>
            <p className="text-text-secondary">Expect to hear from us within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glow-card bg-bg-secondary border border-white/5 rounded-2xl p-10 space-y-5">
            <h3 className="font-display text-3xl tracking-wide text-center mb-6">Get Started Today</h3>
            <input required placeholder="Venue Name" value={form.venueName} onChange={set('venueName')} className={inputCls} />
            <input required placeholder="Contact Name" value={form.contactName} onChange={set('contactName')} className={inputCls} />
            <div className="grid sm:grid-cols-2 gap-4">
              <input required type="email" placeholder="Email" value={form.email} onChange={set('email')} className={inputCls} />
              <input required type="tel" placeholder="Phone" value={form.phone} onChange={set('phone')} className={inputCls} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <select required value={form.venueType} onChange={set('venueType')} className={selectCls}>
                <option value="" disabled>Venue Type</option>
                {VENUE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <select required value={form.traffic} onChange={set('traffic')} className={selectCls}>
                <option value="" disabled>Est. Weekend Nightly Traffic</option>
                {TRAFFIC_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <textarea placeholder="Message / Questions (optional)" value={form.message} onChange={set('message')} rows={3} className={inputCls} />
            <button
              type="submit"
              className="btn-shimmer w-full py-4 rounded-lg font-semibold text-white text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,240,255,0.35)]"
              style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
            >
              LET'S TALK
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* ───────────────────────── Coverage ───────────────────────── */

function Coverage() {
  const ref = useScrollReveal()

  const NJ_AREAS = ['Hoboken', 'Jersey City', 'Newark', 'New Brunswick', 'Atlantic City', 'Morristown', 'Asbury Park', 'Princeton']
  const NY_AREAS = ['Manhattan', 'Brooklyn', 'Queens', 'Long Island', 'Astoria', 'Williamsburg', 'Bushwick', 'Lower East Side']

  return (
    <section id="coverage" className="relative z-10 py-28 px-5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-pink/[0.03] to-transparent pointer-events-none" />
      <SectionHeading sub="Rapidly expanding across the tri-state area. Your city could be next.">Our Coverage</SectionHeading>

      <div ref={ref} className="reveal max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* NJ */}
          <div className="glow-card bg-bg-secondary rounded-2xl p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <MapPin size={24} className="text-accent-cyan" />
              <h3 className="font-display text-2xl tracking-wide">NEW JERSEY</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {NJ_AREAS.map((area) => (
                <div key={area} className="flex items-center gap-2">
                  <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                  <span className="text-text-secondary text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NY */}
          <div className="glow-card bg-bg-secondary rounded-2xl p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <MapPin size={24} className="text-accent-pink" />
              <h3 className="font-display text-2xl tracking-wide">NEW YORK</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {NY_AREAS.map((area) => (
                <div key={area} className="flex items-center gap-2">
                  <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                  <span className="text-text-secondary text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-text-secondary mb-6">Don't see your area? We're expanding fast.</p>
          <a
            href="#for-venues"
            className="btn-shimmer inline-block px-8 py-3.5 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
          >
            REQUEST YOUR AREA
          </a>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── FAQ ───────────────────────── */

const FAQS = [
  { q: 'Is this legal?', a: 'Absolutely. All machines are placed in 21+ venues in full compliance with New Jersey and New York state law and FDA regulations. Every age-restricted purchase requires ID verification.' },
  { q: 'What does it cost the venue?', a: 'Nothing. We provide, install, stock, and maintain the machine at zero cost. Venue partners earn a commission on every sale.' },
  { q: 'How much can venues actually make?', a: 'Typical partner venues generate about $900-$2,200 per month in commission, depending on foot traffic and hours. High-volume nightlife locations often land on the upper end of that range.' },
  { q: 'What products do you sell?', a: 'FDA-authorized vapes (Vuse, NJOY, Logic), nicotine pouches (ZYN, On!), phone chargers, condoms, breath mints, pain relievers, energy shots, and other nightlife essentials.' },
  { q: 'How does age verification work?', a: 'Our machines include built-in ID scanners that read driver\'s license barcodes. Age-restricted products cannot be dispensed without successful verification.' },
  { q: 'How do payments work?', a: 'All purchases are cashless — credit/debit cards, Apple Pay, Google Pay, and NFC tap-to-pay.' },
  { q: 'How often do you restock?', a: 'We monitor inventory remotely in real-time and restock based on demand — typically weekly for high-traffic venues.' },
  { q: 'What areas do you serve?', a: 'We distribute across all of New Jersey and New York. From Jersey City to Manhattan, Atlantic City to Brooklyn — if you run a nightlife venue, we want to talk.' },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="relative z-10 py-28 px-5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/[0.02] to-transparent pointer-events-none" />
      <SectionHeading>Questions</SectionHeading>
      <div className="max-w-2xl mx-auto space-y-3 relative z-10">
        {FAQS.map((f, i) => {
          const ref = useScrollReveal()
          const open = openIndex === i
          return (
            <div key={i} ref={ref} className="reveal glow-card border border-white/5 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-semibold pr-4">{f.q}</span>
                {open ? <ChevronUp size={18} className="flex-shrink-0 text-accent-cyan" /> : <ChevronDown size={18} className="flex-shrink-0 text-text-muted" />}
              </button>
              <div
                id={`faq-panel-${i}`}
                className="transition-all duration-300 overflow-hidden"
                style={{ maxHeight: open ? '300px' : '0' }}
              >
                <p className="px-6 pb-5 text-text-secondary text-sm leading-relaxed">{f.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/5 py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          <div>
            <h3 className="font-display text-3xl tracking-wider mb-4 gradient-text">VENDETTA</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">One of the largest vape vending machine distributors across New Jersey and New York.</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-cyan/20 bg-accent-cyan/5">
              <span className="pulse-dot" style={{ width: 6, height: 6 }} />
              <span className="text-accent-cyan text-xs font-medium">{NETWORK_STATS.machines} Machines Live</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-muted">Navigation</h4>
            <div className="space-y-3">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="block text-text-secondary text-sm hover:text-accent-cyan transition-colors duration-300">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-muted">Contact</h4>
            <div className="space-y-3 text-sm text-text-secondary">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-accent-cyan transition-colors duration-300">
                <Mail size={16} /> {CONTACT_EMAIL}
              </a>
              <a href="tel:+12018005506" className="flex items-center gap-2 hover:text-accent-cyan transition-colors duration-300">
                <Phone size={16} /> (201) 800-5506
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> New Jersey & New York
              </div>
            </div>
            <div className="flex gap-4 mt-5">
              <a href="#" className="text-text-muted hover:text-accent-cyan transition-colors duration-300"><Instagram size={20} /></a>
              <a href="#" className="text-text-muted hover:text-accent-cyan transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="#" className="text-text-muted hover:text-accent-cyan transition-colors duration-300"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 space-y-2 text-text-muted text-xs text-center leading-relaxed">
          <p>WARNING: Products sold in our machines contain nicotine. Nicotine is an addictive chemical.</p>
          <p>You must be 21 years of age or older to purchase age-restricted products.</p>
          <p>All vape and nicotine products sold are FDA-authorized.</p>
          <p className="pt-2">&copy; 2026 Vendetta. All rights reserved.</p>
          <div className="flex justify-center gap-4 pt-2">
            <a href="#" className="hover:text-text-secondary transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-text-secondary transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ───────────────────────── App ───────────────────────── */

export default function App() {
  const [ageVerified, setAgeVerified] = useState(false)

  useEffect(() => {
    if (!ageVerified) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [ageVerified])

  return (
    <div className="relative font-body min-h-screen">
      {!ageVerified && <AgeGate onVerified={() => setAgeVerified(true)} />}
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Products />
        <ForVenues />
        <Coverage />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
