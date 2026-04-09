import React, { useRef, useState, useEffect } from 'react';

export default function SeamlessVideo({ src, className, opacity = 0.1 }: { src: string, className?: string, opacity?: number }) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const crossfadeTime = 1.0; // crossfade 1 second before end

    const handleTimeUpdate = (currentVid: HTMLVideoElement, nextVid: HTMLVideoElement, nextId: 1 | 2) => {
      if (currentVid.duration - currentVid.currentTime <= crossfadeTime) {
        if (nextVid.paused) {
          nextVid.currentTime = 0;
          nextVid.play().catch(() => { });
          setActiveVideo(nextId);
        }
      }
    };

    v1.ontimeupdate = () => handleTimeUpdate(v1, v2, 2);
    v2.ontimeupdate = () => handleTimeUpdate(v2, v1, 1);

    v1.play().catch(() => { });
  }, []);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={video1Ref}
        muted playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{ opacity: activeVideo === 1 ? opacity : 0 }}
        src={src}
      />
      <video
        ref={video2Ref}
        muted playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{ opacity: activeVideo === 2 ? opacity : 0 }}
        src={src}
      />
    </div>
  );
}
