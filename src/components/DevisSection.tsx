import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import {
  APPLE_PRICES,
  SAMSUNG_PRICES,
  REPAIR_LABELS,
  getPrice,
  formatPrice,
  modelHasPrices,
} from '../data/prices';
import {
  DEVICE_DEVIS_MAP,
  type DeviceDevisData,
} from '../data/devisData';

gsap.registerPlugin(ScrollTrigger);

type DeviceType = 'telephone' | 'tablette' | 'pc-mac' | 'console' | 'microsoudure' | 'autre';
type Brand = 'apple' | 'samsung';

interface FlowState {
  device: DeviceType | '';
  brand: string;
  model: string;
  repair: string;
}

const deviceIcons: Record<DeviceType, React.ReactNode> = {
  telephone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="1" width="14" height="22" rx="3" /><line x1="10" y1="18" x2="14" y2="18" strokeWidth="2" /></svg>,
  tablette: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="2" width="18" height="20" rx="2" /><circle cx="12" cy="17" r="1" /></svg>,
  'pc-mac': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>,
  console: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="4" /><circle cx="7.5" cy="12" r="2" /><path d="M15 10h5M15 13h5" /><circle cx="17.5" cy="12" r="0.5" fill="currentColor" stroke="none" /></svg>,
  microsoudure: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  autre: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /><path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>,
};

const deviceColors: Record<DeviceType, string> = {
  telephone: '#1a4fd6',
  microsoudure: '#f15a24',
  tablette: '#a855f7',
  'pc-mac': '#10b981',
  console: '#f59e0b',
  autre: '#f43f5e',
};

const deviceOptions: { id: DeviceType; label: string }[] = [
  { id: 'telephone', label: 'Téléphone' },
  { id: 'tablette', label: 'Tablette' },
  { id: 'pc-mac', label: 'PC / Mac' },
  { id: 'console', label: 'Console de jeux' },
  { id: 'microsoudure', label: 'Microsoudure' },
  { id: 'autre', label: 'Autre appareil' },
];

const phoneBrandOptions: { id: Brand; label: string }[] = [
  { id: 'apple', label: 'Apple' },
  { id: 'samsung', label: 'Samsung' },
];

export default function DevisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [flow, setFlow] = useState<FlowState>({
    device: '',
    brand: '',
    model: '',
    repair: '',
  });

  const contactBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.fromTo(card,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
      }
    );
  }, []);

  const selectDevice = useCallback((device: DeviceType) => {
    setFlow({ device, brand: '', model: '', repair: '' });
  }, []);

  const selectBrand = useCallback((brand: string) => {
    setFlow((prev) => ({ ...prev, brand, model: '', repair: '' }));
  }, []);

  const selectModel = useCallback((model: string) => {
    setFlow((prev) => ({ ...prev, model, repair: '' }));
  }, []);

  const selectRepair = useCallback((repair: string) => {
    setFlow((prev) => ({ ...prev, repair }));
  }, []);

  const goBack = useCallback(() => {
    if (flow.repair) {
      setFlow((prev) => ({ ...prev, repair: '' }));
    } else if (flow.model) {
      setFlow((prev) => ({ ...prev, model: '', repair: '' }));
    } else if (flow.brand) {
      setFlow((prev) => ({ ...prev, brand: '', model: '', repair: '' }));
    } else if (flow.device) {
      setFlow({ device: '', brand: '', model: '', repair: '' });
    }
  }, [flow]);

  const reset = useCallback(() => {
    setFlow({ device: '', brand: '', model: '', repair: '' });
  }, []);

  const getDeviceData = useCallback((): DeviceDevisData | null => {
    if (!flow.device || flow.device === 'telephone') return null;
    return DEVICE_DEVIS_MAP[flow.device] || null;
  }, [flow.device]);

  const getNonPhoneBrands = useCallback(() => {
    const data = getDeviceData();
    if (!data || !data.hasBrandModel) return [];
    return Object.entries(data.brands);
  }, [getDeviceData]);

  const getNonPhoneModels = useCallback(() => {
    const data = getDeviceData();
    if (!data || !data.hasBrandModel || !flow.brand) return [];
    const brandData = data.brands[flow.brand];
    return brandData ? brandData.models : [];
  }, [getDeviceData, flow.brand]);

  const getRepairs = useCallback(() => {
    if (flow.device === 'telephone' && (flow.brand === 'apple' || flow.brand === 'samsung') && flow.model) {
      const table = flow.brand === 'apple' ? APPLE_PRICES : SAMSUNG_PRICES;
      const modelData = table[flow.model];
      if (!modelData) return [];
      return Object.entries(modelData.prices).map(([key]) => key);
    }
    const data = getDeviceData();
    return data ? data.repairs : [];
  }, [flow.device, flow.brand, flow.model, getDeviceData]);

  const currentPrice = useCallback(() => {
    if (flow.device !== 'telephone' || !flow.brand || !flow.model || !flow.repair) return null;
    return getPrice(flow.brand as Brand, flow.model, flow.repair);
  }, [flow]);

  const isPhoneBrand = flow.device === 'telephone' && (flow.brand === 'apple' || flow.brand === 'samsung');
  const selectedPhoneHasPrices = isPhoneBrand && !!flow.model && modelHasPrices(flow.brand, flow.model);
  const isPhoneWithPrices = isPhoneBrand && selectedPhoneHasPrices;
  const isPhoneWithoutPrices = isPhoneBrand && !!flow.model && !modelHasPrices(flow.brand, flow.model);
  const deviceData = flow.device ? DEVICE_DEVIS_MAP[flow.device] : null;
  const isDirectToContact = (!!flow.device && flow.device !== 'telephone' && deviceData && !deviceData.hasBrandModel) || isPhoneWithoutPrices;
  const hasBrandModelFlow = (!!flow.device && flow.device !== 'telephone' && deviceData && deviceData.hasBrandModel) || isPhoneWithPrices;
  const showContactBar = isPhoneWithPrices
    ? !!flow.repair
    : hasBrandModelFlow && !isPhoneWithPrices
    ? !!flow.repair
    : isDirectToContact;
  const showResultCard = showContactBar;

  // Auto-scroll to contact bar when it appears
  useEffect(() => {
    if (showContactBar && contactBarRef.current) {
      setTimeout(() => {
        contactBarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [showContactBar]);

  const getBrandLabel = useCallback(() => {
    if (flow.device === 'telephone') {
      return phoneBrandOptions.find((b) => b.id === flow.brand)?.label;
    }
    const data = getDeviceData();
    if (data && data.hasBrandModel && flow.brand) {
      return data.brands[flow.brand]?.label;
    }
    return undefined;
  }, [flow.device, flow.brand, getDeviceData]);

  const getModelLabel = useCallback(() => {
    if (flow.device === 'telephone') {
      return flow.brand === 'apple' ? APPLE_PRICES[flow.model]?.label : SAMSUNG_PRICES[flow.model]?.label;
    }
    const models = getNonPhoneModels();
    return models.find((m) => m.id === flow.model)?.label;
  }, [flow, getNonPhoneModels]);

  const getRepairLabel = useCallback(() => {
    if (flow.device === 'telephone' && isPhoneWithPrices) {
      return REPAIR_LABELS[flow.repair] || flow.repair;
    }
    const data = getDeviceData();
    if (data && flow.repair) {
      const idx = parseInt(flow.repair);
      return data.repairs[idx] || '';
    }
    return '';
  }, [flow, isPhoneWithPrices, getDeviceData]);

  // ─── SELECTION SUMMARY ───
  const deviceLabel = flow.device ? deviceOptions.find((d) => d.id === flow.device)?.label : '';
  const brandLabel = getBrandLabel();
  const modelLabel = getModelLabel();
  const repairLabel = getRepairLabel();

  return (
    <section id="devis" ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-[2px] bg-electric-blue" />
            <span className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-electric-blue">
              Devis
            </span>
          </div>
          <h2
            className="font-mono font-bold uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}
          >
            Estimation<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-400">
              en ligne
            </span>
          </h2>
        </div>

        <div ref={cardRef} className="glass-card p-4 sm:p-8 md:p-12" style={{ opacity: 0 }}>
          {/* Card header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
            {flow.device && (
              <button
                onClick={goBack}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            <div className="min-w-0">
              <h2 className="font-mono font-bold text-base sm:text-xl md:text-2xl lg:text-3xl">
                Choisissez votre réparation
              </h2>
              {flow.device && (
                <div className="flex items-center gap-1.5 sm:gap-2 mt-1 flex-wrap">
                  <button onClick={reset} className="font-mono text-[10px] sm:text-xs text-electric-blue hover:underline">
                    {deviceLabel}
                  </button>
                  {brandLabel && (
                    <>
                      <span className="text-white/30">›</span>
                      <button
                        onClick={() => setFlow((p) => ({ ...p, brand: '', model: '', repair: '' }))}
                        className="font-mono text-[10px] sm:text-xs text-electric-blue hover:underline"
                      >
                        {brandLabel}
                      </button>
                    </>
                  )}
                  {modelLabel && (
                    <>
                      <span className="text-white/30">›</span>
                      <button
                        onClick={() => setFlow((p) => ({ ...p, model: '', repair: '' }))}
                        className="font-mono text-[10px] sm:text-xs text-electric-blue hover:underline truncate max-w-[120px] sm:max-w-[200px]"
                      >
                        {modelLabel}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ─── ACTIVE SELECTION BADGE (visible during intermediate steps) ─── */}
          {flow.device && !showContactBar && (isPhoneWithPrices || hasBrandModelFlow) && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-electric-blue/10 border border-electric-blue/20 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-electric-blue mb-1.5 sm:mb-2">
                Votre sélection en cours
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm">
                <span className="px-2 sm:px-3 py-1 bg-electric-blue/20 text-electric-blue rounded-lg font-medium">
                  {deviceLabel}
                </span>
                {brandLabel && (
                  <>
                    <span className="text-white/30">›</span>
                    <span className="px-2 sm:px-3 py-1 bg-white/10 text-white/80 rounded-lg">{brandLabel}</span>
                  </>
                )}
                {modelLabel && (
                  <>
                    <span className="text-white/30">›</span>
                    <span className="px-2 sm:px-3 py-1 bg-white/10 text-white/80 rounded-lg truncate max-w-[120px] sm:max-w-[200px]">
                      {modelLabel}
                    </span>
                  </>
                )}
                {flow.repair && (
                  <>
                    <span className="text-white/30">›</span>
                    <span className="px-2 sm:px-3 py-1 bg-burnt-orange/20 text-burnt-orange rounded-lg font-medium">
                      {repairLabel}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ─── STEP 1: Device Type ─── */}
          {!flow.device && (
            <div className="flow-stage animate-in fade-in slide-in-from-bottom-4 duration-300" data-stage="device">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mb-3 sm:mb-4">
                Appareil
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {deviceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    id={`device-${opt.id}`}
                    onClick={() => selectDevice(opt.id)}
                    className="flow-chip p-4 sm:p-5 md:p-6 bg-white/5 border border-white/10 rounded-xl hover:border-electric-blue/50 hover:bg-white/10 transition-all group flex flex-col items-center text-center"
                  >
                    <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-3 sm:mb-4 group-hover:scale-110 transition-transform inline-block" style={{ color: deviceColors[opt.id] }}>
                      {deviceIcons[opt.id]}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── STEP 2: Brand ─── */}
          {flow.device && !flow.brand && (flow.device === 'telephone' || getDeviceData()?.hasBrandModel) && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mb-3 sm:mb-4">
                Marque
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {flow.device === 'telephone' && phoneBrandOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => selectBrand(opt.id)}
                    className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl hover:border-electric-blue/50 hover:bg-white/10 transition-all text-left group"
                  >
                    <span className="font-mono text-base sm:text-lg font-bold">{opt.label}</span>
                  </button>
                ))}
                {flow.device !== 'telephone' && getNonPhoneBrands().map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => selectBrand(key)}
                    className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl hover:border-electric-blue/50 hover:bg-white/10 transition-all text-left group"
                  >
                    <span className="font-mono text-base sm:text-lg font-bold">{data.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── STEP 3: Model ─── */}
          {flow.device && flow.brand && !flow.model && (
            <div className="flow-stage animate-in fade-in slide-in-from-bottom-4 duration-300" data-stage="model">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mb-3 sm:mb-4">
                Modèle
              </div>
              {flow.device === 'telephone' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {flow.brand === 'apple' && Object.entries(APPLE_PRICES).map(([key, data]) => (
                    <button key={key} onClick={() => selectModel(key)} className="flow-chip p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl hover:border-electric-blue/50 hover:bg-white/10 transition-all text-left">
                      <span className="font-mono text-xs sm:text-sm">{data.label}</span>
                    </button>
                  ))}
                  {flow.brand === 'samsung' && Object.entries(SAMSUNG_PRICES).map(([key, data]) => (
                    <button key={key} onClick={() => selectModel(key)} className="flow-chip p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl hover:border-electric-blue/50 hover:bg-white/10 transition-all text-left">
                      <span className="font-mono text-xs sm:text-sm">{data.label}</span>
                    </button>
                  ))}
                </div>
              )}
              {flow.device !== 'telephone' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {getNonPhoneModels().map((model) => (
                    <button
                      key={model.id}
                      onClick={() => selectModel(model.id)}
                      className="flow-chip p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl hover:border-electric-blue/50 hover:bg-white/10 transition-all text-left"
                    >
                      <span className="font-mono text-xs sm:text-sm">{model.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── STEP 4: Repair Type ─── */}
          {flow.device && !flow.repair && (
            (flow.device === 'telephone' && flow.brand && flow.model && modelHasPrices(flow.brand, flow.model)) ||
            (flow.device !== 'telephone' && getDeviceData()?.hasBrandModel && flow.brand && flow.model)
          ) && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mb-3 sm:mb-4">
                Type de réparation
              </div>
              {isPhoneWithPrices ? (
                <div className="flex flex-col gap-2">
                  {getRepairs().map((repairKey) => (
                    <button
                      key={repairKey}
                      onClick={() => selectRepair(repairKey)}
                      className="flex items-center justify-between p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl hover:border-electric-blue/50 hover:bg-white/10 transition-all group"
                    >
                      <span className="font-mono text-xs sm:text-sm text-left">{REPAIR_LABELS[repairKey] || repairKey}</span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-burnt-orange flex-shrink-0 ml-3 sm:ml-4">
                        {formatPrice(getPrice(flow.brand as Brand, flow.model, repairKey))}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {getRepairs().map((repairLabel, i) => (
                    <button
                      key={i}
                      onClick={() => selectRepair(String(i))}
                      className="flex items-center justify-between p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl hover:border-electric-blue/50 hover:bg-white/10 transition-all text-left"
                    >
                      <span className="font-mono text-xs sm:text-sm">{repairLabel}</span>
                      <span className="font-mono text-[10px] sm:text-xs text-white/40 flex-shrink-0 ml-3">Sur devis</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── STEP 5: Result ─── */}
          {showResultCard && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {isPhoneWithPrices ? (
                <div className="p-5 sm:p-6 md:p-8 bg-white/5 border border-electric-blue/30 rounded-xl text-center">
                  <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mb-2">
                    {REPAIR_LABELS[flow.repair]}
                  </div>
                  <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-electric-blue mb-2">
                    {formatPrice(currentPrice())}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/40 mb-3 sm:mb-4">
                    {modelLabel}
                  </div>
                  <p className="font-mono text-[10px] sm:text-xs text-white/40">
                    Ce prix est indicatif. Contactez-moi pour un devis précis.
                  </p>
                </div>
              ) : (
                <div className="p-5 sm:p-6 md:p-8 bg-white/5 border border-white/10 rounded-xl text-center">
                  <p className="font-mono text-sm sm:text-base text-white/70 mb-1">
                    {deviceLabel} {brandLabel && `› ${brandLabel}`} {modelLabel && `› ${modelLabel}`}
                  </p>
                  {repairLabel && (
                    <p className="font-mono text-xs sm:text-sm text-electric-blue mb-2">
                      {repairLabel}
                    </p>
                  )}
                  <p className="font-mono text-xl sm:text-2xl font-bold text-burnt-orange mb-1">
                    Sur devis
                  </p>
                  <p className="font-mono text-[10px] sm:text-xs text-white/40">
                    Contactez-moi pour obtenir une estimation.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ─── CONTACT BAR with RESUME ─── */}
          {showContactBar && (
            <div ref={contactBarRef} className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Resume card */}
              <div className="mb-5 sm:mb-6 p-4 sm:p-5 bg-white/5 border border-white/10 rounded-xl">
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">
                  Récapitulatif de votre demande
                </div>
                <div className="space-y-1.5 sm:space-y-2 font-mono text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-electric-blue/20 text-electric-blue flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0">1</span>
                    <span className="text-white/60">Appareil :</span>
                    <span className="text-white font-medium">{deviceLabel}</span>
                  </div>
                  {brandLabel && (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-electric-blue/20 text-electric-blue flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0">2</span>
                      <span className="text-white/60">Marque :</span>
                      <span className="text-white font-medium">{brandLabel}</span>
                    </div>
                  )}
                  {modelLabel && (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-electric-blue/20 text-electric-blue flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0">3</span>
                      <span className="text-white/60">Modèle :</span>
                      <span className="text-white font-medium">{modelLabel}</span>
                    </div>
                  )}
                  {repairLabel && (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-burnt-orange/20 text-burnt-orange flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0">
                        {isPhoneWithPrices ? '€' : '!'}
                      </span>
                      <span className="text-white/60">Réparation :</span>
                      <span className="text-white font-medium">{repairLabel}</span>
                      {isPhoneWithPrices ? (
                        <span className="text-burnt-orange font-bold ml-auto">{formatPrice(currentPrice())}</span>
                      ) : (
                        <span className="text-burnt-orange font-bold ml-auto">Sur devis</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <p className="font-mono text-xs sm:text-sm text-white/60 text-center mb-4 sm:mb-6">
                Contactez-moi pour confirmer votre réparation ou poser vos questions.
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <a href="https://wa.me/32493141973" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#25d366] text-[#140a0f] hover:bg-[#22bf5b] transition-colors min-w-[120px] sm:min-w-[140px]"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21l1.65-3.8a9 9 0 1115.6-6.45 9 9 0 01-8.75 8.8l-.15-.01L3 21z" /><path d="M9 10.5a.5.5 0 100-1 .5.5 0 000 1zM13.5 10.5a.5.5 0 100-1 .5.5 0 000 1zM9.5 13.5s1.2 1.5 3 1.5 2.5-1.5 2.5-1.5" strokeLinecap="round" /></svg>
                  <span className="hidden sm:inline">WhatsApp</span>
                  <span className="sm:hidden">WA</span>
                </a>
                <a href="https://instagram.com/labazerepair" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#E1306C] text-white hover:bg-[#C13584] transition-colors min-w-[120px] sm:min-w-[140px]"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                  <span className="hidden sm:inline">Instagram</span>
                  <span className="sm:hidden">IG</span>
                </a>
                <a href="https://facebook.com/labazerepair" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#1877F2] text-white hover:bg-[#166fe5] transition-colors min-w-[120px] sm:min-w-[140px]"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M14 8h-2a2 2 0 00-2 2v2H8v2h2v6h2v-6h2.5l.5-2H12v-2a1 1 0 011-1h1.5V8z" fill="currentColor" stroke="none" /></svg>
                  <span className="hidden sm:inline">Facebook</span>
                  <span className="sm:hidden">FB</span>
                </a>
                <a href="mailto:labazerepair@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#34b7f1] text-[#140a0f] hover:bg-[#2aa8e0] transition-colors min-w-[120px] sm:min-w-[140px]"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                  Email
                </a>
                <a href="sms:+32493141973"
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FBBF24] text-[#140a0f] hover:bg-[#F59E0B] transition-colors min-w-[120px] sm:min-w-[140px]"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.56 12.56 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.56 12.56 0 002.81.7A2 2 0 0122 16.92z" /></svg>
                  SMS
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
