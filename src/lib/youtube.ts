// Helpers YouTube — un seul endroit pour régler les paramètres d'intégration.
//
// Comment récupérer un ID YouTube :
//   URL:  https://www.youtube.com/watch?v=dQw4w9WgXcQ
//   ID :  dQw4w9WgXcQ   (la partie après "v=")
//   (ou la fin d'un lien court : https://youtu.be/dQw4w9WgXcQ )

/** true si l'entrée contient un vrai ID (sinon on affiche un emplacement "bientôt"). */
export function hasVideo(id: string | undefined | null): boolean {
  return !!id && id.trim().length > 0;
}

type EmbedOpts = {
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
};

/** URL d'intégration YouTube (domaine sans cookie, respect de la vie privée). */
export function youtubeEmbedUrl(id: string, opts: EmbedOpts = {}): string {
  const { autoplay = false, mute = false, loop = false, controls = true } = opts;
  const p = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    iv_load_policy: '3',
  });
  if (autoplay) p.set('autoplay', '1');
  if (mute) p.set('mute', '1');
  if (!controls) p.set('controls', '0');
  // Pour boucler une seule vidéo, YouTube exige playlist = même ID.
  if (loop) {
    p.set('loop', '1');
    p.set('playlist', id);
  }
  return `https://www.youtube-nocookie.com/embed/${id.trim()}?${p.toString()}`;
}

/** Miniature d'une vidéo YouTube (utilisée dans la galerie). */
export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id.trim()}/hqdefault.jpg`;
}
