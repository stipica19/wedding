"use client";

import { useEffect, useRef } from "react";

export default function BgMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const stop = () => {
      if (!startedRef.current) return;
      audio.pause();
      audio.currentTime = 0;
      startedRef.current = false;
    };

    const tryPlay = async () => {
      try {
        await audio.play();
        startedRef.current = true;
        window.removeEventListener("click", tryPlay);
        window.removeEventListener("touchstart", tryPlay);
      } catch {
        // autoplay blokiran dok user ne klikne/tapne
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
    };

    // ✅ play tek nakon prvog dodira/klika
    window.addEventListener("click", tryPlay);
    window.addEventListener("touchstart", tryPlay);

    // ✅ stop kad odeš iz browsera / u background
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", stop);

    return () => {
      stop();
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", stop);
    };
  }, []);

  return <audio ref={audioRef} src="/muzika.mp3" loop preload="auto" />;
}
