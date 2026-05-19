// Devis data for non-phone devices (all sur devis - no prices)
// Source: labazerepair.be

export interface BrandData {
  label: string;
  models: { id: string; label: string }[];
}

export interface DeviceDevisData {
  brands: Record<string, BrandData>;
  repairs: string[];
  hasBrandModel: boolean;
}

// ─── TABLETTE ───
export const TABLETTE_DATA: DeviceDevisData = {
  hasBrandModel: true,
  brands: {
    apple: {
      label: 'Apple',
      models: [
        { id: 'ipad-air-13-2025', label: 'iPad Air 13 (2025)' },
        { id: 'ipad-air-13-2024', label: 'iPad Air 13 (2024)' },
        { id: 'ipad-pro-13-2024', label: 'iPad Pro 13 (2024)' },
        { id: 'ipad-pro-11-2024', label: 'iPad Pro 11 (2024)' },
        { id: 'ipad-pro-129-2022', label: 'iPad Pro 12.9 (2022)' },
        { id: 'ipad-pro-11-2022', label: 'iPad Pro 11 (2022)' },
        { id: 'ipad-air-109-2022', label: 'iPad Air 10.9 (2022)' },
        { id: 'ipad-pro-129-2021', label: 'iPad Pro 12.9 (2021)' },
        { id: 'ipad-pro-11-2021', label: 'iPad Pro 11 (2021)' },
        { id: 'ipad-pro-129-2020', label: 'iPad Pro 12.9 (2020)' },
        { id: 'ipad-pro-11-2020', label: 'iPad Pro 11 (2020)' },
        { id: 'ipad-pro-129-2018', label: 'iPad Pro 12.9 (2018)' },
        { id: 'ipad-pro-11-2018', label: 'iPad Pro 11 (2018)' },
        { id: 'autre', label: 'Autre' },
      ],
    },
    samsung: {
      label: 'Samsung',
      models: [
        { id: 'tab-s8-ultra', label: 'Galaxy Tab S8 Ultra' },
        { id: 'tab-s8-plus', label: 'Galaxy Tab S8+' },
        { id: 'tab-s8', label: 'Galaxy Tab S8' },
        { id: 'tab-s7-plus', label: 'Galaxy Tab S7+' },
        { id: 'tab-s7', label: 'Galaxy Tab S7' },
        { id: 'tab-s6-lite-2022', label: 'Galaxy Tab S6 Lite 2022' },
        { id: 'autre', label: 'Autre' },
      ],
    },
    autre: {
      label: 'Autre',
      models: [{ id: 'autre', label: 'Autre' }],
    },
  },
  repairs: [
    'Écran fissuré ou cassé',
    'Batterie défectueuse ou faible capacité',
    'Problèmes de charge (port de chargement défectueux)',
    'Caméra avant/arrière défectueuse',
    'Vitre de caméra fissurée ou cassée',
    'Haut-parleur ou micro défectueux',
    'Boutons physiques défectueux (alimentation, volume)',
    'Vitre arrière cassée',
    'Autre',
  ],
};

// ─── PC / MAC ───
export const PC_MAC_DATA: DeviceDevisData = {
  hasBrandModel: true,
  brands: {
    dell: {
      label: 'Dell',
      models: [
        { id: 'xps-13', label: 'XPS 13' },
        { id: 'xps-15', label: 'XPS 15' },
        { id: 'inspiron-15', label: 'Inspiron 15' },
        { id: 'latitude-7420', label: 'Latitude 7420' },
        { id: 'alienware-m16', label: 'Alienware m16' },
        { id: 'autre', label: 'Autre' },
      ],
    },
    lenovo: {
      label: 'Lenovo',
      models: [
        { id: 'thinkpad-x1', label: 'ThinkPad X1 Carbon' },
        { id: 'thinkpad-t14', label: 'ThinkPad T14' },
        { id: 'ideapad-3', label: 'IdeaPad 3' },
        { id: 'ideapad-5', label: 'IdeaPad 5' },
        { id: 'legion-5', label: 'Legion 5' },
        { id: 'autre', label: 'Autre' },
      ],
    },
    asus: {
      label: 'Asus',
      models: [
        { id: 'zenbook-14', label: 'ZenBook 14' },
        { id: 'vivobook-15', label: 'VivoBook 15' },
        { id: 'rog-zephyrus', label: 'ROG Zephyrus G14' },
        { id: 'rog-strix', label: 'ROG Strix G15' },
        { id: 'tuf-f15', label: 'TUF Gaming F15' },
        { id: 'autre', label: 'Autre' },
      ],
    },
    acer: {
      label: 'Acer',
      models: [
        { id: 'aspire-5', label: 'Aspire 5' },
        { id: 'nitro-5', label: 'Nitro 5' },
        { id: 'predator-300', label: 'Predator Helios 300' },
        { id: 'swift-3', label: 'Swift 3' },
        { id: 'spin-5', label: 'Spin 5' },
        { id: 'autre', label: 'Autre' },
      ],
    },
    apple: {
      label: 'Apple',
      models: [
        { id: 'macbook-air-m1', label: 'MacBook Air M1' },
        { id: 'macbook-air-m2', label: 'MacBook Air M2' },
        { id: 'macbook-air-m3', label: 'MacBook Air M3' },
        { id: 'macbook-pro-13-m1', label: 'MacBook Pro 13 M1' },
        { id: 'macbook-pro-14-m1-pro', label: 'MacBook Pro 14 M1 Pro' },
        { id: 'macbook-pro-14-m1-max', label: 'MacBook Pro 14 M1 Max' },
        { id: 'macbook-pro-14-m2', label: 'MacBook Pro 14 M2' },
        { id: 'macbook-pro-16-m1-pro', label: 'MacBook Pro 16 M1 Pro' },
        { id: 'macbook-pro-16-m1-max', label: 'MacBook Pro 16 M1 Max' },
        { id: 'macbook-pro-16-m2', label: 'MacBook Pro 16 M2' },
        { id: 'imac', label: 'iMac' },
        { id: 'mac-mini', label: 'Mac mini' },
        { id: 'mac-studio', label: 'Mac Studio' },
        { id: 'autre', label: 'Autre' },
      ],
    },
    autre: {
      label: 'Autre',
      models: [{ id: 'autre', label: 'Autre' }],
    },
  },
  repairs: [
    'PC ne s\'allume pas',
    'Dégâts causés par un liquide',
    'Écran cassé ou fissuré',
    'Clavier / pavé tactile ne fonctionne pas',
    'PC ne charge pas',
    'Surchauffe',
    'Autre',
  ],
};

// ─── CONSOLE DE JEUX ───
export const CONSOLE_DATA: DeviceDevisData = {
  hasBrandModel: true,
  brands: {
    playstation: {
      label: 'PlayStation',
      models: [
        { id: 'ps4', label: 'PS4' },
        { id: 'ps4-slim', label: 'PS4 Slim' },
        { id: 'ps4-pro', label: 'PS4 Pro' },
        { id: 'ps5', label: 'PS5' },
        { id: 'ps5-slim', label: 'PS5 Slim' },
        { id: 'ps5-pro', label: 'PS5 Pro' },
        { id: 'autre', label: 'Autre' },
      ],
    },
    xbox: {
      label: 'Xbox',
      models: [
        { id: 'xbox-s', label: 'Xbox Series S' },
        { id: 'xbox-x', label: 'Xbox Series X' },
        { id: 'autre', label: 'Autre' },
      ],
    },
    nintendo: {
      label: 'Nintendo',
      models: [
        { id: 'switch', label: 'Nintendo Switch' },
        { id: 'switch-lite', label: 'Switch Lite' },
        { id: 'switch-oled', label: 'Switch OLED' },
        { id: 'autre', label: 'Autre' },
      ],
    },
    autre: {
      label: 'Autre',
      models: [{ id: 'autre', label: 'Autre' }],
    },
  },
  repairs: [
    'Console ne s\'allume pas',
    'Écran cassé ou fissuré',
    'Problèmes causés par des liquides',
    'Problèmes de charge ou port de chargement',
    'Lecteur de disque défectueux',
    'Problèmes de connexion réseau',
    'Manettes défectueuses (connexion, boutons, sticks)',
    'Problèmes d\'affichage (écran noir, déformé, figé)',
    'Surchauffe de la console',
    'Problèmes de ventilation (ventilateur bruyant ou bloqué)',
    'Carte mère défectueuse',
    'Ports USB ou HDMI défectueux',
    'Autre',
  ],
};

// ─── MICROSOUDURE ───
export const MICROSOUDURE_DATA: DeviceDevisData = {
  hasBrandModel: false,
  brands: {},
  repairs: [
    'Réparation de cartes mères endommagées',
    'Réparation ou remplacement de composants électroniques (puces, résistances, condensateurs)',
    'Soudure de ports de chargement ou connecteurs endommagés',
    'Réparation de circuits imprimés cassés ou défectueux',
    'Réparation de courts-circuits',
    'Dommages causés par des liquides',
    'Remplacement de connecteurs flexibles ou de nappes endommagées',
    'Réparation de pistes électroniques coupées ou brûlées',
    'Réparation des circuits de charge pour batteries externes ou autres appareils',
    'Autre',
  ],
};

// ─── AUTRE ÉQUIPEMENT ───
export const AUTRE_DATA: DeviceDevisData = {
  hasBrandModel: false,
  brands: {},
  repairs: [
    'Caméras : alimentation, carte mère ou réparation d\'écran',
    'Montres connectées : écran, batterie, connectivité',
    'Casques audio : haut-parleurs, connectique, boutons',
    'GPS : mises à jour, écran ou système interne',
    'Cigarettes électroniques : circuit, batterie, réinitialisation',
    'Appareils de mesure : capteurs, affichage',
    'Luminaires LED intelligents : carte de contrôle, alimentation',
    'Manettes de jeux, joysticks, ports de chargement',
    'Capteurs divers ou petits écrans',
    'Autre',
  ],
};

// Device data map
export const DEVICE_DEVIS_MAP: Record<string, DeviceDevisData> = {
  tablette: TABLETTE_DATA,
  'pc-mac': PC_MAC_DATA,
  console: CONSOLE_DATA,
  microsoudure: MICROSOUDURE_DATA,
  autre: AUTRE_DATA,
};
