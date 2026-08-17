import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Play, Youtube } from 'lucide-react';
import { hasVideo, youtubeThumb } from '@/lib/youtube';
import { videos, type ShowcaseVideo } from '@/data/videos';
import VideoLightbox from '@/components/VideoLightbox';

// Page dédiée : toutes les vidéos de réparation.
// Miniatures légères (pas de lecture auto) → clic pour ouvrir en grand avec le son.
export default function VideosPage() {
  const [lightbox, setLightbox] = useState<ShowcaseVideo | null>(null);

  // Toujours arriver en haut de la page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const open = (video: ShowcaseVideo) => {
    if (!hasVideo(video.youtubeId)) return;
    setLightbox(video);
  };

  return (
    <main className="relative z-10 min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Retour */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 -ml-1 px-1 py-2 font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors mb-5 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 h-[2px] bg-burnt-orange" />
            <span className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-burnt-orange">
              En direct de l'atelier
            </span>
            <div className="w-8 sm:w-12 h-[2px] bg-burnt-orange" />
          </div>
          <h1
            className="font-mono font-bold uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(28px, 6vw, 64px)' }}
          >
            Toutes mes<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-burnt-orange to-orange-400">
              réparations en vidéo
            </span>
          </h1>
          <p className="font-mono text-xs sm:text-sm text-white/50 mt-4 max-w-md mx-auto">
            Cliquez sur une vidéo pour la voir en grand.
          </p>
        </div>

        {/* Grille de vidéos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {videos.map((video, i) => {
            const live = hasVideo(video.youtubeId);
            return (
              <button
                key={i}
                onClick={() => open(video)}
                className={`group text-left ${live ? '' : 'cursor-default'}`}
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#140a0f] transition-all duration-500 group-hover:border-burnt-orange/40 group-hover:shadow-[0_0_20px_rgba(255,107,53,0.12)] aspect-video">
                  {live ? (
                    <img
                      src={youtubeThumb(video.youtubeId)}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1c1013] to-[#140a0f] text-white/40">
                      <Youtube className="w-6 h-6 sm:w-8 sm:h-8 text-burnt-orange/60" />
                      <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest">Bientôt en ligne</span>
                    </div>
                  )}

                  {live && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                    </div>
                  )}
                </div>

                {/* Titre + description */}
                <div className="mt-2 sm:mt-3 px-0.5">
                  <div className="font-mono text-xs sm:text-sm font-bold uppercase text-white truncate">
                    {video.title}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 mt-0.5 line-clamp-2">
                    {video.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {lightbox && <VideoLightbox video={lightbox} onClose={() => setLightbox(null)} />}
    </main>
  );
}
