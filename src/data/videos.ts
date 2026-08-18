// ─────────────────────────────────────────────────────────────
//  TOUTES LES VIDÉOS YOUTUBE
//
//  Un seul endroit pour gérer les vidéos du site.
//  - Les FEATURED_COUNT premières s'affichent (et se lisent) sur l'accueil.
//  - Le bouton « Voir plus » mène à la page /videos (toute la liste).
//
//  Les titres sont ceux de YouTube. Pour réordonner l'accueil, change
//  simplement l'ordre des lignes (les 4 premières sont mises en avant).
//
//  Pour ajouter/changer une vidéo : mets l'ID YouTube dans youtubeId.
//    URL:  https://www.youtube.com/watch?v=dQw4w9WgXcQ
//    ou :  https://youtu.be/dQw4w9WgXcQ  ou  /shorts/dQw4w9WgXcQ
//    ID :  dQw4w9WgXcQ
// ─────────────────────────────────────────────────────────────

export type ShowcaseVideo = {
  youtubeId: string;
  title: string;
  subtitle?: string;
};

// Nombre de vidéos mises en avant sur l'accueil (le reste est sur /videos).
export const FEATURED_COUNT = 4;

export const videos: ShowcaseVideo[] = [
  { youtubeId: 'LdfEmJt5SXo', title: "USB C Port replacement 🔬 on xgimi mogo 3 pro projector" },
  { youtubeId: 'q2Lr_aln87Y', title: "Réparation Lenovo Thinkpad bouton d'alimentation 💻" },
  { youtubeId: 'hd3JEY1o7to', title: "Iphone 11 screen replacement 🌟" },
  { youtubeId: 'dQj3OuxqSII', title: "Button soldering ⚪" },
  { youtubeId: 'r1q65GCgl20', title: "Iphone 12 NAND reballing 💯" },
  { youtubeId: 'IIykdQlWC3c', title: "Huawei phone NAND reballing 🔬" },
  { youtubeId: 'JX4uQ7938zE', title: "Ps4 hdmi port pins reconstruction 🤯" },
  { youtubeId: '3GK-CQlcYk4', title: "Ps5 southbridge chip reballing ⚡" },
  { youtubeId: 'vsO_PHt0uDk', title: "camera water damage repair" },
  { youtubeId: '-vE22BsnhBQ', title: "Nintendo switch OLED remplacement joysticks🕹️" },
  { youtubeId: 'rEtuYS_r0-8', title: "Asus Phone Ram reballing 💯" },
];
