// ─────────────────────────────────────────────────────────────
//  TOUTES LES VIDÉOS YOUTUBE
//
//  Un seul endroit pour gérer les vidéos du site.
//  - Les FEATURED_COUNT premières s'affichent sur l'accueil (lecture auto).
//  - Le bouton « Voir plus » mène à la page /videos qui affiche TOUTE la liste.
//
//  Pour ajouter une vidéo : ajoutez une ligne avec l'ID YouTube.
//    URL:  https://www.youtube.com/watch?v=dQw4w9WgXcQ
//    ID :  dQw4w9WgXcQ   (la partie après "v=")
//  Laissez youtubeId: '' pour un emplacement « bientôt en ligne ».
// ─────────────────────────────────────────────────────────────

export type ShowcaseVideo = {
  youtubeId: string;
  title: string;
  subtitle: string;
};

// Nombre de vidéos mises en avant sur l'accueil (le reste est sur /videos).
export const FEATURED_COUNT = 4;

export const videos: ShowcaseVideo[] = [
  {
    youtubeId: '',
    title: 'PS4 HDMI',
    subtitle: 'Reconstruction des pins HDMI endommagés — soudure microscopique sur port de connexion console',
  },
  {
    youtubeId: '',
    title: 'Asus RAM',
    subtitle: 'Reballing mémoire RAM téléphone — réparation soudures BGA chip mémoire sur carte mère',
  },
  {
    youtubeId: '',
    title: 'iPhone 11',
    subtitle: 'Remplacement écran complet — démontage, transfert composants et assemblage précis',
  },
  {
    youtubeId: '',
    title: 'NAND Reball',
    subtitle: 'Reballing puce NAND Flash — refonte complète des billes BGA sur mémoire de stockage',
  },
  {
    youtubeId: '',
    title: 'PS5 Southbridge',
    subtitle: 'Reballing IC southbridge — refonte des soudures BGA sous station infrarouge',
  },
  {
    youtubeId: '',
    title: 'Chip I/O',
    subtitle: 'Réparation circuit entrée/sortie — remplacement du contrôleur de communication USB/Audio',
  },
];
