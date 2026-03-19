import React, { useState, useEffect, useRef } from 'react'
import {
  Menu, X, ChevronDown, ChevronUp, MapPin, Phone, Mail,
  Instagram, Linkedin, Package, ShoppingCart, DollarSign,
  Shield, Zap, Users, CheckCircle, ArrowRight, ExternalLink
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
      style={{ background: 'linear-gradient(90deg, #00f0ff, #ff2d95)' }}
    />
  )
}

function SectionHeading({ children, sub }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className="reveal text-center mb-12">
      <h2 className="font-display text-4xl md:text-5xl tracking-wide">{children}</h2>
      <GradientDivider />
      {sub && <p className="text-text-secondary mt-2 max-w-xl mx-auto">{sub}</p>}
    </div>
  )
}

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Products', href: '#products' },
  { label: 'For Venues', href: '#for-venues' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/* ───────────────────────── Age Gate ───────────────────────── */

function AgeGate({ onVerified }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-5xl md:text-6xl tracking-wider mb-2">NIGHTVEND</h1>
        <GradientDivider />
        <p className="text-text-secondary mt-6 mb-8 leading-relaxed">
          Our machines sell age-restricted products including nicotine. You must be 21 or older to enter this site.
        </p>
        <p className="font-display text-3xl md:text-4xl tracking-wide mb-8">ARE YOU 21+?</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onVerified}
            className="px-8 py-3 rounded font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
          >
            YES, ENTER
          </button>
          <button
            onClick={() => { window.location.href = 'https://google.com' }}
            className="px-8 py-3 rounded font-semibold border border-white/30 text-white hover:border-white/60 transition-all duration-300"
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
        scrolled ? 'bg-bg-primary/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        <a href="#" className="font-display text-2xl tracking-wider">NIGHTVEND</a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-text-secondary hover:text-accent-cyan transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#for-venues"
            className="px-5 py-2 rounded text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)]"
            style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
          >
            PARTNER WITH US
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-primary/95 backdrop-blur-md border-t border-white/5 px-5 pb-6 pt-2 space-y-4">
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-5">
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <style>{`
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.35;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #00f0ff 0%, transparent 70%);
          top: -10%; left: -10%;
          animation: drift1 12s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #ff2d95 0%, transparent 70%);
          bottom: -10%; right: -10%;
          animation: drift2 14s ease-in-out infinite alternate;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #7b2dff 0%, transparent 70%);
          top: 40%; left: 50%;
          animation: drift3 10s ease-in-out infinite alternate;
        }
        @keyframes drift1 { to { transform: translate(80px, 60px) scale(1.1); } }
        @keyframes drift2 { to { transform: translate(-60px, -80px) scale(1.15); } }
        @keyframes drift3 { to { transform: translate(-40px, 50px) scale(0.9); } }
      `}</style>

      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-6">
          Your Bar's New<br />Revenue Stream
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Smart vending machines bringing late-night essentials to Hoboken's best venues. Zero cost to you. Passive income from day one.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#for-venues"
            className="px-8 py-3.5 rounded font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
          >
            PARTNER WITH US
          </a>
          <a
            href="#locations"
            className="px-8 py-3.5 rounded font-semibold border border-white/25 text-white hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300"
          >
            FIND A MACHINE
          </a>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── How It Works ───────────────────────── */

const STEPS = [
  { num: '01', icon: '📦', title: 'We Install', text: 'We place a sleek smart vending machine in your venue at zero cost. We handle everything — setup, stocking, and maintenance.' },
  { num: '02', icon: '🛒', title: 'Guests Shop', text: 'Your patrons tap, scan their ID, and grab what they need without leaving the bar. Vapes, ZYN, chargers, and more.' },
  { num: '03', icon: '💰', title: 'You Earn', text: 'You receive a monthly commission on every sale. Passive income, zero effort, zero liability.' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 py-24 px-5">
      <SectionHeading>How It Works</SectionHeading>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {STEPS.map((s) => {
          const ref = useScrollReveal()
          return (
            <div key={s.num} ref={ref} className="reveal text-center bg-bg-secondary border border-white/5 rounded-xl p-8 hover:border-accent-cyan/30 transition-colors">
              <span
                className="font-display text-5xl bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
              >
                {s.num}
              </span>
              <div className="text-4xl my-4">{s.icon}</div>
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
  { icon: '🟢', name: 'Nicotine Pouches', desc: 'Tobacco-free nicotine in discreet pouches', examples: 'ZYN, On! (all FDA-authorized)' },
  { icon: '💨', name: 'Vapes', desc: 'FDA-authorized tobacco-flavored devices', examples: 'Vuse Alto, NJOY Ace, Logic' },
  { icon: '🔋', name: 'Phone Chargers', desc: 'Never die on a night out', examples: 'USB-C cables, Lightning cables, portable chargers' },
  { icon: '✨', name: 'Personal Care', desc: 'Stay fresh all night', examples: 'Breath mints, gum, pocket cologne, hand sanitizer' },
  { icon: '🛡️', name: 'Protection', desc: 'Be prepared', examples: 'Premium condoms, personal wellness items' },
  { icon: '🌙', name: 'Late-Night Essentials', desc: 'Everything else you didn\'t know you needed', examples: 'Pain relievers, energy shots, mystery bags' },
]

function Products() {
  return (
    <section id="products" className="relative z-10 py-24 px-5 bg-bg-secondary/50">
      <SectionHeading sub="Premium essentials for the late-night crowd">What's Inside</SectionHeading>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => {
          const ref = useScrollReveal()
          return (
            <div key={p.name} ref={ref} className="reveal bg-bg-secondary border border-white/5 rounded-xl p-6 hover:border-accent-pink/30 transition-colors">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-display text-xl tracking-wide mb-1">{p.name}</h3>
              <p className="text-text-secondary text-sm mb-2">{p.desc}</p>
              <p className="text-text-muted text-xs">{p.examples}</p>
            </div>
          )
        })}
      </div>
      <p className="max-w-3xl mx-auto mt-10 text-text-muted text-xs text-center leading-relaxed">
        WARNING: Some products contain nicotine. Nicotine is an addictive chemical. You must be 21+ to purchase age-restricted products. All nicotine and tobacco products sold are FDA-authorized.
      </p>
    </section>
  )
}

/* ───────────────────────── For Venues ───────────────────────── */

const VALUE_PROPS = [
  { icon: '💰', title: 'Passive Revenue', text: 'Earn a monthly commission on every sale. We handle stocking, maintenance, and customer service.' },
  { icon: '🚫', title: 'Zero Cost to You', text: 'We provide the machine, install it, and keep it filled. No upfront investment, no hidden fees.' },
  { icon: '🍺', title: 'Keep Guests Inside', text: 'When patrons can grab essentials without leaving, they stay longer and spend more at your bar. Studies show 30%+ longer visits.' },
  { icon: '✅', title: 'Fully Compliant', text: 'Age-verified ID scanning, FDA-authorized products only, full insurance coverage. We handle all licensing and regulatory requirements.' },
]

const TIMELINE = [
  'We visit your venue for a quick walkthrough',
  'We install a machine in the ideal location (near restrooms, entrance, or bar area)',
  'Your guests start purchasing — you start earning',
  'We restock weekly and handle all maintenance remotely',
]

const VENUE_TYPES = ['Bar', 'Nightclub', 'Restaurant', 'Lounge', 'Other']
const TRAFFIC_OPTIONS = ['Under 100', '100-300', '300-500', '500+']

function ForVenues() {
  const [form, setForm] = useState({
    venueName: '', contactName: '', email: '', phone: '',
    venueType: '', traffic: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputCls = 'w-full bg-bg-primary border border-white/10 rounded px-4 py-3 text-white placeholder-text-muted focus:border-accent-cyan focus:outline-none transition-colors'
  const selectCls = inputCls + ' appearance-none'

  return (
    <section id="for-venues" className="relative z-10 py-24 px-5">
      <SectionHeading sub="Zero cost. Zero hassle. Pure upside.">Partner With Us</SectionHeading>

      {/* Value props */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6 mb-16">
        {VALUE_PROPS.map((v) => {
          const ref = useScrollReveal()
          return (
            <div key={v.title} ref={ref} className="reveal bg-bg-secondary border border-white/5 rounded-xl p-6 hover:border-accent-cyan/30 transition-colors">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-display text-xl tracking-wide mb-2">{v.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{v.text}</p>
            </div>
          )
        })}
      </div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto mb-16">
        <h3 className="font-display text-2xl tracking-wide text-center mb-8">How Partnership Works</h3>
        <div className="space-y-6">
          {TIMELINE.map((step, i) => {
            const ref = useScrollReveal()
            return (
              <div key={i} ref={ref} className="reveal flex gap-4 items-start">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
                >
                  {i + 1}
                </span>
                <p className="text-text-secondary pt-1">{step}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Partner form */}
      <div className="max-w-xl mx-auto">
        {submitted ? (
          <div className="reveal visible text-center bg-bg-secondary border border-accent-cyan/30 rounded-xl p-10">
            <CheckCircle className="mx-auto mb-4 text-accent-cyan" size={48} />
            <h3 className="font-display text-2xl tracking-wide mb-2">Thanks!</h3>
            <p className="text-text-secondary">We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-bg-secondary border border-white/5 rounded-xl p-8 space-y-4">
            <h3 className="font-display text-2xl tracking-wide text-center mb-4">Get Started</h3>
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
              className="w-full py-3.5 rounded font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,240,255,0.35)]"
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

/* ───────────────────────── About ───────────────────────── */

const DIFFERENTIATORS = [
  { icon: <MapPin size={20} />, title: 'Locally Owned & Operated', text: "Hoboken-based. We're your neighbors." },
  { icon: <Shield size={20} />, title: 'FDA-Authorized Products Only', text: 'Every nicotine product is fully compliant.' },
  { icon: <Zap size={20} />, title: 'Smart Technology', text: 'Age verification, cashless payments, real-time inventory tracking.' },
  { icon: <DollarSign size={20} />, title: 'Wholesale Pricing Advantage', text: 'Our existing supply chain means better margins for everyone.' },
]

function About() {
  const ref = useScrollReveal()
  return (
    <section id="about" className="relative z-10 py-24 px-5 bg-bg-secondary/50">
      <SectionHeading>Why NightVend</SectionHeading>
      <div className="max-w-3xl mx-auto space-y-6 mb-14">
        <p ref={ref} className="reveal text-text-secondary leading-relaxed text-center">
          Born from Hoboken's nightlife. We've been serving this community through our smoke shops for years. We know what people want at 1 AM — and now we're bringing it directly into your favorite bars.
        </p>
        <p className="text-text-secondary leading-relaxed text-center">
          As local operators, we're not a faceless franchise. We personally stock every machine, build relationships with every venue, and stand behind every product we sell.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
        {DIFFERENTIATORS.map((d) => {
          const ref = useScrollReveal()
          return (
            <div key={d.title} ref={ref} className="reveal flex gap-4 items-start bg-bg-secondary border border-white/5 rounded-xl p-5">
              <span className="text-accent-cyan mt-0.5">{d.icon}</span>
              <div>
                <h4 className="font-semibold mb-1">{d.title}</h4>
                <p className="text-text-secondary text-sm">{d.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ───────────────────────── Locations ───────────────────────── */

function Locations() {
  const [venue, setVenue] = useState('')
  const [suggested, setSuggested] = useState(false)
  const ref = useScrollReveal()

  return (
    <section id="locations" className="relative z-10 py-24 px-5">
      <SectionHeading sub="We're rolling out across Hoboken's best bars and restaurants.">Find a Machine</SectionHeading>

      <div ref={ref} className="reveal max-w-2xl mx-auto text-center">
        {/* Stylized map placeholder */}
        <div className="bg-bg-secondary border border-white/5 rounded-xl p-10 mb-8">
          <div className="flex justify-center mb-4">
            <MapPin size={48} className="text-accent-cyan" />
          </div>
          <div className="font-display text-2xl tracking-wide mb-2">WASHINGTON ST CORRIDOR</div>
          <div className="text-text-muted text-sm mb-6">Hoboken, NJ</div>
          <div
            className="h-[2px] w-full max-w-xs mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #00f0ff, #ff2d95, transparent)' }}
          />
          <p className="text-text-secondary mb-2">Our first machines are being placed now. Check back soon for live locations.</p>
          <p className="text-text-secondary">Want us in your favorite bar? Let them know — or tell us below.</p>
        </div>

        {suggested ? (
          <div className="text-accent-cyan font-semibold">Thanks for the suggestion!</div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (venue.trim()) setSuggested(true) }}
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Suggest a venue..."
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="flex-1 bg-bg-secondary border border-white/10 rounded px-4 py-3 text-white placeholder-text-muted focus:border-accent-cyan focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #00f0ff, #ff2d95)' }}
            >
              SUGGEST A VENUE
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* ───────────────────────── FAQ ───────────────────────── */

const FAQS = [
  { q: 'Is this legal?', a: 'Yes. All our machines are placed in 21+ venues in full compliance with New Jersey state law, Hoboken municipal code, and FDA regulations. Every age-restricted purchase requires ID verification.' },
  { q: 'What does it cost the venue?', a: 'Nothing. We provide, install, stock, and maintain the machine at zero cost. Venue partners earn a commission on every sale.' },
  { q: 'What products do you sell?', a: 'FDA-authorized vapes (Vuse, NJOY, Logic), nicotine pouches (ZYN, On!), phone chargers, condoms, breath mints, pain relievers, energy shots, and other late-night essentials.' },
  { q: 'How does age verification work?', a: 'Our machines include built-in ID scanners that read driver\'s license barcodes. Age-restricted products cannot be dispensed without successful verification. Non-restricted items like phone chargers can be purchased freely.' },
  { q: 'How do payments work?', a: 'All purchases are cashless — credit/debit cards, Apple Pay, Google Pay, and NFC tap-to-pay. No cash needed.' },
  { q: 'How often do you restock?', a: 'We monitor inventory remotely in real-time and restock based on demand — typically weekly for high-traffic venues.' },
  { q: 'Do you serve areas outside Hoboken?', a: 'We\'re starting in Hoboken and plan to expand across Hudson County and the greater NJ/NYC metro area. Contact us if you\'re interested in bringing NightVend to your venue.' },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="relative z-10 py-24 px-5 bg-bg-secondary/50">
      <SectionHeading>Questions?</SectionHeading>
      <div className="max-w-2xl mx-auto space-y-3">
        {FAQS.map((f, i) => {
          const ref = useScrollReveal()
          const open = openIndex === i
          return (
            <div key={i} ref={ref} className="reveal border border-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-semibold pr-4">{f.q}</span>
                {open ? <ChevronUp size={18} className="flex-shrink-0 text-accent-cyan" /> : <ChevronDown size={18} className="flex-shrink-0 text-text-muted" />}
              </button>
              <div
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
    <footer id="contact" className="relative z-10 border-t border-white/5 py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl tracking-wider mb-4">NIGHTVEND</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Hoboken's Late-Night Essentials</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-muted">Navigation</h4>
            <div className="space-y-2">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="block text-text-secondary text-sm hover:text-accent-cyan transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-muted">Contact</h4>
            <div className="space-y-3 text-sm text-text-secondary">
              <a href="mailto:info@nightvendhoboken.com" className="flex items-center gap-2 hover:text-accent-cyan transition-colors">
                <Mail size={16} /> info@nightvendhoboken.com
              </a>
              <a href="tel:+12015550199" className="flex items-center gap-2 hover:text-accent-cyan transition-colors">
                <Phone size={16} /> (201) 555-0199
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> Hoboken, NJ
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-text-muted hover:text-accent-cyan transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-text-muted hover:text-accent-cyan transition-colors">
                {/* TikTok SVG since lucide doesn't have it */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="#" className="text-text-muted hover:text-accent-cyan transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-white/5 pt-8 space-y-2 text-text-muted text-xs text-center leading-relaxed">
          <p>WARNING: Products sold in our machines contain nicotine. Nicotine is an addictive chemical.</p>
          <p>You must be 21 years of age or older to purchase age-restricted products.</p>
          <p>All vape and nicotine products sold are FDA-authorized.</p>
          <p className="pt-2">&copy; 2026 NightVend. All rights reserved.</p>
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
        <About />
        <Locations />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
