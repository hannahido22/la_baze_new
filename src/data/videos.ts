// ─────────────────────────────────────────────────────────────
//  TOUTES LES VIDÉOS YOUTUBE
//
//  Un seul endroit pour gérer les vidéos du site.
//  - Les FEATURED_COUNT premières s'affichent sur l'accueil.
//  - Le bouton « Voir plus » mène à la page /videos (toute la liste).
//
//  ⚠️ Renomme chaque vidéo (title/subtitle) selon son contenu réel —
//     les titres ci-dessous sont des exemples à ajuster.
//
//  Pour ajouter/changer une vidéo : mets l'ID YouTube dans youtubeId.
//    URL:  https://www.youtube.com/watch?v=dQw4w9WgXcQ
//    ou :  https://youtu.be/dQw4w9WgXcQ  ou  /shorts/dQw4w9WgXcQ
//    ID :  dQw4w9WgXcQ
// ─────────────────────────────────────────────────────────────

export type ShowcaseVideo = {
  youtubeId: string;
  title: string;
  subtitle: string;
};

// Nombre de vidéos mises en avant sur l'accueil (le reste est sur /videos).
export const FEATURED_COUNT = 4;

export const videos: ShowcaseVideo[] = [
  { youtubeId: 'LdfEmJt5SXo', title: 'Réparation microsoudure', subtitle: 'Intervention de précision sur carte électronique.' },
  { youtubeId: 'q2Lr_aln87Y', title: 'Reballing BGA', subtitle: 'Refonte des billes de soudure sous une puce.' },
  { youtubeId: 'hd3JEY1o7to', title: 'Réparation carte mère', subtitle: 'Diagnostic et réparation au niveau composant.' },
  { youtubeId: 'dQj3OuxqSII', title: 'Remplacement écran', subtitle: 'Démontage, transfert et remontage soigné.' },
  { youtubeId: 'r1q65GCgl20', title: 'Réparation console', subtitle: 'Intervention sur console de jeux.' },
  { youtubeId: 'IIykdQlWC3c', title: 'Port de charge', subtitle: 'Réparation / remplacement du connecteur de charge.' },
  { youtubeId: 'JX4uQ7938zE', title: 'Réparation HDMI', subtitle: 'Reconstruction du port HDMI.' },
  { youtubeId: '3GK-CQlcYk4', title: 'Récupération de données', subtitle: 'Sauvegarde des données après panne.' },
  { youtubeId: 'vsO_PHt0uDk', title: 'Dommage liquide', subtitle: 'Nettoyage et remise en état après oxydation.' },
  { youtubeId: '-vE22BsnhBQ', title: 'Réparation smartphone', subtitle: 'Intervention sur téléphone.' },
  { youtubeId: 'rEtuYS_r0-8', title: 'Diagnostic & réparation', subtitle: 'Diagnostic complet et réparation en atelier.' },
];
