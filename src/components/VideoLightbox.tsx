import { useEffect } from 'react';
import { X } from 'lucide-react';
import { youtubeEmbedUrl } from '@/lib/youtube';
import type { ShowcaseVideo } from '@/data/videos';

// Fenêtre modale d'une vidéo (avec son + plein écran). Réutilisée par
// l'accueil (VideoShowcase) et la page /videos (VideosPage).
export default function VideoLightbox({
  video,
  onClose,
}: {
  video: ShowcaseVideo;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] bg-[#140a0f]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Bouton fermer — sous la barre de nav sur mobile, en haut à droite sur desktop */}
      <button
        onClick={onClose}
        className="fixed top-[72px] right-4 md:top-6 md:right-6 flex w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 items-center justify-center transition-colors z-[80]"
        aria-label="Fermer"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <div
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-video max-h-[75vh]">
          <iframe
            src={youtubeEmbedUrl(video.youtubeId, { autoplay: true, controls: true })}
            className="absolute inset-0 w-full h-full rounded-xl"
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            frameBorder={0}
          />
        </div>
        <div className="mt-3 sm:mt-4 text-center">
          <div className="font-mono text-sm sm:text-base font-bold uppercase text-white">
            {video.title}
          </div>
          {video.subtitle && (
            <div className="font-mono text-[10px] sm:text-xs text-white/50 mt-1 max-w-lg mx-auto">
              {video.subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
