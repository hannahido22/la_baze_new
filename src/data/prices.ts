// Price data - La Baze Repair prices
// Source: phone_repair_prices.txt

export const REPAIR_LABELS: Record<string, string> = {
  ecran: 'Écran',
  batterie: 'Batterie',
  camera_arriere: 'Caméra arrière',
  vitre_camera: 'Vitre caméra arrière',
  vitre_arriere: 'Vitre arrière',
  port_charge: 'Port de charge',
};

export interface ModelPrice {
  label: string;
  prices: Record<string, number>;
}

// ─── Apple iPhone prices ───
// Models with empty `prices: {}` go directly to "Sur devis" (no repair prices)
export const APPLE_PRICES: Record<string, ModelPrice> = {
  // ── Newer models: Sur devis only ──
  'iphone-17-pro-max': {
    label: 'iPhone 17 Pro Max',
    prices: {},
  },
  'iphone-17-pro': {
    label: 'iPhone 17 Pro',
    prices: {},
  },
  'iphone-17': {
    label: 'iPhone 17',
    prices: {},
  },
  'iphone-air': {
    label: 'iPhone Air',
    prices: {},
  },
  'iphone-16-pro-max': {
    label: 'iPhone 16 Pro Max',
    prices: {},
  },
  'iphone-16-pro': {
    label: 'iPhone 16 Pro',
    prices: {},
  },
  'iphone-16-plus': {
    label: 'iPhone 16 Plus',
    prices: {},
  },
  'iphone-16': {
    label: 'iPhone 16',
    prices: {},
  },
  'iphone-se-2022': {
    label: 'iPhone SE 2022',
    prices: {},
  },
  'iphone-se-2020': {
    label: 'iPhone SE 2020',
    prices: {},
  },
  // ── Models with prices ──
  'iphone-15-pro-max': {
    label: 'iPhone 15 Pro Max',
    prices: { ecran: 185, batterie: 70, camera_arriere: 120, vitre_camera: 25, vitre_arriere: 120, port_charge: 95 },
  },
  'iphone-15-pro': {
    label: 'iPhone 15 Pro',
    prices: { ecran: 195, batterie: 70, camera_arriere: 120, vitre_camera: 25, vitre_arriere: 120, port_charge: 95 },
  },
  'iphone-14-pro-max': {
    label: 'iPhone 14 Pro Max',
    prices: { ecran: 170, batterie: 65, camera_arriere: 105, vitre_camera: 25, vitre_arriere: 120, port_charge: 95 },
  },
  'iphone-14-pro': {
    label: 'iPhone 14 Pro',
    prices: { ecran: 185, batterie: 65, camera_arriere: 105, vitre_camera: 25, vitre_arriere: 120, port_charge: 95 },
  },
  'iphone-14-plus': {
    label: 'iPhone 14 Plus',
    prices: { ecran: 120, batterie: 65, camera_arriere: 105, vitre_camera: 25, vitre_arriere: 120, port_charge: 95 },
  },
  'iphone-14': {
    label: 'iPhone 14',
    prices: { ecran: 95, batterie: 65, camera_arriere: 95, vitre_camera: 25, vitre_arriere: 120, port_charge: 95 },
  },
  'iphone-13-pro-max': {
    label: 'iPhone 13 Pro Max',
    prices: { ecran: 110, batterie: 55, camera_arriere: 120, vitre_camera: 25, vitre_arriere: 100, port_charge: 90 },
  },
  'iphone-13-pro': {
    label: 'iPhone 13 Pro',
    prices: { ecran: 115, batterie: 55, camera_arriere: 120, vitre_camera: 25, vitre_arriere: 100, port_charge: 90 },
  },
  'iphone-13': {
    label: 'iPhone 13',
    prices: { ecran: 95, batterie: 55, camera_arriere: 90, vitre_camera: 25, vitre_arriere: 100, port_charge: 90 },
  },
  'iphone-13-mini': {
    label: 'iPhone 13 mini',
    prices: { ecran: 160, batterie: 55, camera_arriere: 90, vitre_camera: 25, vitre_arriere: 100, port_charge: 90 },
  },
  'iphone-12-pro-max': {
    label: 'iPhone 12 Pro Max',
    prices: { ecran: 105, batterie: 50, camera_arriere: 100, vitre_camera: 25, vitre_arriere: 80, port_charge: 90 },
  },
  'iphone-12-pro': {
    label: 'iPhone 12 Pro',
    prices: { ecran: 105, batterie: 50, camera_arriere: 100, vitre_camera: 25, vitre_arriere: 80, port_charge: 80 },
  },
  'iphone-12': {
    label: 'iPhone 12',
    prices: { ecran: 105, batterie: 50, camera_arriere: 80, vitre_camera: 15, vitre_arriere: 80, port_charge: 80 },
  },
  'iphone-12-mini': {
    label: 'iPhone 12 mini',
    prices: { ecran: 105, batterie: 50, camera_arriere: 80, vitre_camera: 15, vitre_arriere: 80, port_charge: 80 },
  },
  'iphone-11-pro-max': {
    label: 'iPhone 11 Pro Max',
    prices: { ecran: 105, batterie: 50, camera_arriere: 95, vitre_camera: 15, vitre_arriere: 65, port_charge: 80 },
  },
  'iphone-11-pro': {
    label: 'iPhone 11 Pro',
    prices: { ecran: 105, batterie: 50, camera_arriere: 95, vitre_camera: 15, vitre_arriere: 65, port_charge: 70 },
  },
  'iphone-11': {
    label: 'iPhone 11',
    prices: { ecran: 65, batterie: 50, camera_arriere: 70, vitre_camera: 15, vitre_arriere: 65, port_charge: 65 },
  },
  'iphone-xs-max': {
    label: 'iPhone XS Max',
    prices: { ecran: 90, batterie: 50, camera_arriere: 55, vitre_camera: 15, vitre_arriere: 65, port_charge: 65 },
  },
  'iphone-xs': {
    label: 'iPhone XS',
    prices: { ecran: 80, batterie: 40, camera_arriere: 55, vitre_camera: 15, vitre_arriere: 65, port_charge: 55 },
  },
  'iphone-xr': {
    label: 'iPhone XR',
    prices: { ecran: 60, batterie: 40, camera_arriere: 55, vitre_camera: 15, vitre_arriere: 65, port_charge: 55 },
  },
  'iphone-x': {
    label: 'iPhone X',
    prices: { ecran: 80, batterie: 40, camera_arriere: 55, vitre_camera: 15, vitre_arriere: 65, port_charge: 40 },
  },
  'iphone-8-plus': {
    label: 'iPhone 8 Plus',
    prices: { ecran: 35, batterie: 40, camera_arriere: 50, vitre_camera: 15, vitre_arriere: 45, port_charge: 40 },
  },
  'iphone-8': {
    label: 'iPhone 8',
    prices: { ecran: 45, batterie: 40, camera_arriere: 40, vitre_camera: 15, vitre_arriere: 45, port_charge: 40 },
  },
  'iphone-7-plus': {
    label: 'iPhone 7 Plus',
    prices: { ecran: 35, batterie: 40, camera_arriere: 40, vitre_camera: 15, vitre_arriere: 45, port_charge: 40 },
  },
  'iphone-7': {
    label: 'iPhone 7',
    prices: { ecran: 30, batterie: 40, camera_arriere: 20, vitre_camera: 15, vitre_arriere: 45, port_charge: 25 },
  },
  'iphone-6s-plus': {
    label: 'iPhone 6s Plus',
    prices: { ecran: 35, batterie: 25, camera_arriere: 35, vitre_camera: 15, vitre_arriere: 45, port_charge: 30 },
  },
  'iphone-6s': {
    label: 'iPhone 6s',
    prices: { ecran: 30, batterie: 25, camera_arriere: 20, vitre_camera: 15, vitre_arriere: 45, port_charge: 20 },
  },
  'iphone-6-plus': {
    label: 'iPhone 6 Plus',
    prices: { ecran: 40, batterie: 25, camera_arriere: 30, vitre_camera: 15, vitre_arriere: 45, port_charge: 20 },
  },
  'iphone-6': {
    label: 'iPhone 6',
    prices: { ecran: 25, batterie: 25, camera_arriere: 30, vitre_camera: 15, vitre_arriere: 45, port_charge: 20 },
  },
};

// ─── Samsung Galaxy prices ───
// Models with empty `prices: {}` go directly to "Sur devis" (no repair prices)
export const SAMSUNG_PRICES: Record<string, ModelPrice> = {
  // ── Newer S series: Sur devis only ──
  's27-ultra': {
    label: 'Samsung Galaxy S27 Ultra',
    prices: {},
  },
  's27-plus': {
    label: 'Samsung Galaxy S27+',
    prices: {},
  },
  's27': {
    label: 'Samsung Galaxy S27',
    prices: {},
  },
  's26-ultra': {
    label: 'Samsung Galaxy S26 Ultra',
    prices: {},
  },
  's26-plus': {
    label: 'Samsung Galaxy S26+',
    prices: {},
  },
  's26': {
    label: 'Samsung Galaxy S26',
    prices: {},
  },
  // ── Fold / Flip series: Sur devis only ──
  'z-fold7': {
    label: 'Samsung Galaxy Z Fold 7',
    prices: {},
  },
  'z-fold6': {
    label: 'Samsung Galaxy Z Fold 6',
    prices: {},
  },
  'z-fold5': {
    label: 'Samsung Galaxy Z Fold 5',
    prices: {},
  },
  'z-flip7': {
    label: 'Samsung Galaxy Z Flip 7',
    prices: {},
  },
  'z-flip6': {
    label: 'Samsung Galaxy Z Flip 6',
    prices: {},
  },
  'z-flip5': {
    label: 'Samsung Galaxy Z Flip 5',
    prices: {},
  },
  // ── Models with prices ──
  's25-ultra': {
    label: 'Samsung Galaxy S25 Ultra',
    prices: { ecran: 275, port_charge: 65, vitre_arriere: 45 },
  },
  's25-plus': {
    label: 'Samsung Galaxy S25+',
    prices: { ecran: 205, batterie: 55, port_charge: 65, vitre_arriere: 45 },
  },
  's25': {
    label: 'Samsung Galaxy S25',
    prices: { ecran: 175, batterie: 55, port_charge: 65, vitre_arriere: 45 },
  },
  's24-ultra': {
    label: 'Samsung Galaxy S24 Ultra',
    prices: { ecran: 255, batterie: 50, port_charge: 55, vitre_arriere: 45 },
  },
  's24-plus': {
    label: 'Samsung Galaxy S24+',
    prices: { ecran: 165, batterie: 50, port_charge: 55, vitre_arriere: 45 },
  },
  's24': {
    label: 'Samsung Galaxy S24',
    prices: { ecran: 135, batterie: 40, port_charge: 55, vitre_arriere: 45 },
  },
  's23-ultra': {
    label: 'Samsung Galaxy S23 Ultra',
    prices: { ecran: 275, batterie: 40, port_charge: 55, vitre_arriere: 45 },
  },
  's23-plus': {
    label: 'Samsung Galaxy S23+',
    prices: { ecran: 165, batterie: 40, port_charge: 50, vitre_arriere: 45 },
  },
  's23': {
    label: 'Samsung Galaxy S23',
    prices: { ecran: 185, batterie: 40, port_charge: 50, vitre_arriere: 45 },
  },
  's22-ultra': {
    label: 'Samsung Galaxy S22 Ultra',
    prices: { ecran: 235, batterie: 40, port_charge: 50, vitre_arriere: 45 },
  },
  's22-plus': {
    label: 'Samsung Galaxy S22+',
    prices: { ecran: 210, batterie: 40, port_charge: 40, vitre_arriere: 45 },
  },
  's22': {
    label: 'Samsung Galaxy S22',
    prices: { ecran: 205, batterie: 40, port_charge: 40, vitre_arriere: 45 },
  },
  's21-ultra': {
    label: 'Samsung Galaxy S21 Ultra',
    prices: { ecran: 250, batterie: 40, port_charge: 40, vitre_arriere: 45 },
  },
  's21-plus': {
    label: 'Samsung Galaxy S21+',
    prices: { ecran: 180, batterie: 40, port_charge: 55, vitre_arriere: 45 },
  },
  's21': {
    label: 'Samsung Galaxy S21',
    prices: { ecran: 170, batterie: 40, port_charge: 40, vitre_arriere: 45 },
  },
  's20-ultra': {
    label: 'Samsung Galaxy S20 Ultra',
    prices: { ecran: 230, batterie: 40, port_charge: 50, vitre_arriere: 45 },
  },
  's20-plus': {
    label: 'Samsung Galaxy S20+',
    prices: { ecran: 210, batterie: 50, port_charge: 50, vitre_arriere: 45 },
  },
  's20': {
    label: 'Samsung Galaxy S20',
    prices: { ecran: 195, batterie: 40, port_charge: 50, vitre_arriere: 45 },
  },
  'a54': {
    label: 'Samsung Galaxy A54',
    prices: { ecran: 95, batterie: 50, port_charge: 40, vitre_arriere: 45 },
  },
  'a53-5g': {
    label: 'Samsung Galaxy A53 5G',
    prices: { ecran: 95, batterie: 40, port_charge: 40, vitre_arriere: 45 },
  },
  'a52-5g': {
    label: 'Samsung Galaxy A52 5G',
    prices: { ecran: 105, batterie: 40, port_charge: 50, vitre_arriere: 45 },
  },
  'a51': {
    label: 'Samsung Galaxy A51',
    prices: { ecran: 85, batterie: 40, port_charge: 40, vitre_arriere: 45 },
  },
  'a50': {
    label: 'Samsung Galaxy A50',
    prices: { ecran: 75, batterie: 40, port_charge: 40, vitre_arriere: 45 },
  },
  'a34': {
    label: 'Samsung Galaxy A34',
    prices: { ecran: 95, batterie: 50, port_charge: 40, vitre_arriere: 45 },
  },
  'a33-5g': {
    label: 'Samsung Galaxy A33 5G',
    prices: { ecran: 95, batterie: 40, port_charge: 40, vitre_arriere: 45 },
  },
  'a32-5g': {
    label: 'Samsung Galaxy A32 5G',
    prices: { ecran: 70, batterie: 40, port_charge: 40, vitre_arriere: 45 },
  },
  'a31': {
    label: 'Samsung Galaxy A31',
    prices: { ecran: 80, batterie: 40, port_charge: 35, vitre_arriere: 45 },
  },
  'a16-4g': {
    label: 'Samsung Galaxy A16 4G',
    prices: { ecran: 75, batterie: 50, port_charge: 35, vitre_arriere: 45 },
  },
  'a15-5g': {
    label: 'Samsung Galaxy A15 5G',
    prices: { ecran: 75, batterie: 50, port_charge: 35, vitre_arriere: 45 },
  },
  'a14-5g': {
    label: 'Samsung Galaxy A14 5G',
    prices: { ecran: 75, batterie: 50, port_charge: 35, vitre_arriere: 45 },
  },
  'a13-5g': {
    label: 'Samsung Galaxy A13 5G',
    prices: { ecran: 75, batterie: 40, port_charge: 35, vitre_arriere: 45 },
  },
  'a12': {
    label: 'Samsung Galaxy A12',
    prices: { ecran: 75, batterie: 50, port_charge: 35, vitre_arriere: 45 },
  },
};

// ─── Helpers ───
export function getPrice(brand: string, model: string, repair: string): number | null {
  const table = brand === 'apple' ? APPLE_PRICES : brand === 'samsung' ? SAMSUNG_PRICES : null;
  if (!table) return null;
  const modelData = table[model];
  if (!modelData) return null;
  return modelData.prices[repair] ?? null;
}

export function formatPrice(value: number | null): string {
  if (value === null || value === undefined) return 'Sur devis';
  return `${value.toFixed(0)} €`;
}

// Check if a phone model has repair prices (or goes to "Sur devis")
export function modelHasPrices(brand: string, model: string): boolean {
  const table = brand === 'apple' ? APPLE_PRICES : brand === 'samsung' ? SAMSUNG_PRICES : null;
  if (!table) return false;
  const modelData = table[model];
  if (!modelData) return false;
  return Object.keys(modelData.prices).length > 0;
}
