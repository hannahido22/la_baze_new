import { useState } from 'react';
import { Package, FileText, ShieldCheck, Truck, BadgeCheck, MessageCircle, Mail, MessageSquare, Instagram } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  ENVOYER UN COLIS — réparation à distance par envoi postal.
//  ⚠️ L'adresse n'est JAMAIS affichée sur le site. Le client fait sa
//     demande (WhatsApp / email / tél / Instagram), et l'adresse lui est
//     communiquée en privé. (Une adresse "révélée" côté site serait
//     lisible par tout le monde dans le code de la page.)
// ─────────────────────────────────────────────────────────────

const WHATSAPP = '32493141973'; // sans + ni espaces
const EMAIL = 'labazerepair@gmail.com';
const TEL = '+32493141973';
const INSTAGRAM = 'https://instagram.com/labazerepair';

const devices = ['Téléphone', 'Tablette', 'PC / Mac', 'Console de jeux', 'Carte mère / microsoudure', 'Autre'];

const steps = [
  { icon: FileText, title: 'Décrivez la panne', text: 'Remplissez le formulaire ci-dessous avec votre appareil et le problème.' },
  { icon: ShieldCheck, title: 'Recevez l’adresse', text: 'Je vous envoie l’adresse d’expédition et les instructions en privé.' },
  { icon: Truck, title: 'Envoyez le colis', text: 'Emballez bien et envoyez — frais d’envoi à votre charge.' },
  { icon: BadgeCheck, title: 'Réparation & renvoi', text: 'Je répare et vous renvoie l’appareil — retour offert, avec garantie.' },
];

export default function ShippingSection() {
  const [device, setDevice] = useState('');
  const [desc, setDesc] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const text =
    `Bonjour, je souhaite ENVOYER UN COLIS pour réparation.\n` +
    `• Appareil : ${device || '—'}\n` +
    `• Panne : ${desc || '—'}\n` +
    `• Ville : ${city || '—'}\n` +
    `• Pays : ${country || '—'}\n` +
    `Pouvez-vous me communiquer l’adresse d’expédition et les instructions ? Merci !`;

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent('Envoyer un colis — demande de réparation')}&body=${encodeURIComponent(text)}`;

  const channels = [
    { label: 'WhatsApp', href: waHref, external: true, bg: '#25D366', icon: <MessageCircle className="w-4 h-4" fill="currentColor" strokeWidth={0} /> },
    { label: 'Email', href: mailHref, external: false, bg: '#4285F4', icon: <Mail className="w-4 h-4" /> },
    { label: 'SMS', href: `sms:${TEL}?body=${encodeURIComponent(text)}`, external: false, bg: '#f15a24', icon: <MessageSquare className="w-4 h-4" /> },
    { label: 'Instagram', href: INSTAGRAM, external: true, bg: '#E1306C', icon: <Instagram className="w-4 h-4" /> },
  ];

  return (
    <section id="colis" className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-[2px] bg-burnt-orange" />
            <span className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-burnt-orange">
              Réparation à distance
            </span>
            <div className="w-8 sm:w-12 h-[2px] bg-burnt-orange" />
          </div>
          <h2 className="font-mono font-bold uppercase leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}>
            Envoyer<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-burnt-orange to-orange-400">un colis</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-white/50 mt-3 sm:mt-4 max-w-lg mx-auto">
            Vous n’êtes pas à proximité ? Envoyez-moi votre appareil par la poste, je le répare et vous le renvoie.
          </p>
        </div>

        {/* Étapes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {steps.map((s, i) => (
            <div key={i} className="glass-card rounded-2xl border border-white/10 p-4 sm:p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-burnt-orange/10 border border-burnt-orange/20 flex items-center justify-center shrink-0">
                  <s.icon className="w-4 h-4 sm:w-5 sm:h-5 text-burnt-orange" />
                </div>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-white/40">0{i + 1}</span>
              </div>
              <h3 className="font-mono text-xs sm:text-sm font-bold uppercase text-white">{s.title}</h3>
              <p className="font-mono text-[10px] sm:text-xs text-white/50 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Formulaire de demande */}
        <div className="glass-card rounded-2xl border border-white/10 p-5 sm:p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <Package className="w-5 h-5 text-burnt-orange" />
            <h3 className="font-mono text-sm sm:text-base font-bold uppercase text-white">Préparez votre demande</h3>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 mb-1.5 block">Appareil</label>
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white focus:border-burnt-orange/50 focus:outline-none transition-colors"
              >
                <option value="" className="bg-[#140a0f]">Choisir…</option>
                {devices.map((d) => <option key={d} value={d} className="bg-[#140a0f]">{d}</option>)}
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 mb-1.5 block">Description de la panne</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                placeholder="Ex : écran cassé, ne s’allume plus, port de charge HS…"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder-white/30 focus:border-burnt-orange/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Ville + Pays */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 mb-1.5 block">Ville</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex : Bruxelles"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder-white/30 focus:border-burnt-orange/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 mb-1.5 block">Pays</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Ex : Belgique"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder-white/30 focus:border-burnt-orange/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Moyens de contact */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-1">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-center gap-2 rounded-full px-3 py-3 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: c.bg }}
                >
                  {c.icon}
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
