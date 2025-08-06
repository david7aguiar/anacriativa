"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // adiciona autoplay
import "swiper/css";

import StarRain from "@/components/thayla-15anos/StarRain";

const imagens = [
  "/convites/thayla-15anos/1.jpg",
  "/convites/thayla-15anos/2.jpg",
  "/convites/thayla-15anos/3.jpg",
  "/convites/thayla-15anos/4.jpg",
];

export default function ConviteThayla15Anos() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      console.error("ERRO: A referência do áudio (audioRef.current) é nula!");
      return;
    }

    audio.load();

    const setAudioData = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    const handleAudioEnded = () => {
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleAudioEnded);
    audio.addEventListener("error", (e) => {
      console.error("ERRO NO ELEMENTO DE ÁUDIO:", e);
    });

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false);
      });

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleAudioEnded);
      audio.removeEventListener("error", (e) =>
        console.error("ERRO NO ELEMENTO DE ÁUDIO:", e)
      );
    };
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-gray-900 text-white px-4 py-10 space-y-6 overflow-hidden">
      {/* 🌟 Chuva de estrelas */}
      <StarRain />

      {/* Carrossel sem paginação e com autoplay */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        className="w-full max-w-sm z-10"
      >
        {imagens.map((src, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={src}
              alt={`Convite ${index + 1}`}
              className="w-full h-auto rounded-2xl shadow-2xl border-2 border-white/10"
            />

            {index === 0 && (
              <>
                {/* Indicador de swipe */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none z-20">
                  <div className="flex flex-col items-center space-y-2">
                   <div className="swipe-text">DESLIZE PARA O LADO</div>
                  </div>
                </div>

                <style jsx>{`
                  .swipe-text {
                    font-size: 0.8rem;
                    font-weight: 600;
                    background: rgba(255, 255, 255, 0.08);
                    padding: 6px 14px;
                    border-radius: 999px;
                    backdrop-filter: blur(6px);
                    animation: fadePulse 3s ease-in-out infinite;
                  }

                  @keyframes moveRight {
                    0% {
                      transform: translateX(0);
                      opacity: 1;
                    }
                    50% {
                      transform: translateX(8px);
                      opacity: 0.9;
                    }
                    100% {
                      transform: translateX(0);
                      opacity: 1;
                    }
                  }

                  @keyframes pulse {
                    0%,
                    100% {
                      filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
                    }
                    50% {
                      filter: drop-shadow(0 0 16px rgba(255, 255, 255, 1));
                    }
                  }

                  @keyframes fadePulse {
                    0% {
                      opacity: 0;
                    }
                    10% {
                      opacity: 1;
                    }
                    70% {
                      opacity: 1;
                    }
                    100% {
                      opacity: 0;
                    }
                  }
                `}</style>
              </>
            )}

            {/* Botões clicáveis sobre a segunda imagem (index === 1) */}
            {index === 1 && (
              <>
                <a
                  href="https://maps.app.goo.gl/UTq65MpWmAp1Qyzk7?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-[55%] left-[16%] w-[30%] h-[20%] z-10"
                >
                  <span className="sr-only">Localização</span>
                </a>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfIAdEFHfXe4vCXOqs2PiM16yx46LjRmQudt1qZhYdQ0_qrNw/viewform?usp=sharing&ouid=108949118874957774646"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-[55%] left-[56%] w-[30%] h-[20%] z-10"
                >
                  <span className="sr-only">Confirmar presença</span>
                </a>

                {/* Cursor animado */}
                <div className="absolute top-[55%] left-[16%] w-[70%] h-[20%] pointer-events-none z-20">
                  <div className="relative w-full h-full">
                    <div className="fake-cursor" />
                  </div>
                </div>

                <style jsx>{`
                  .fake-cursor {
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    background-image: url("/convites/thayla-15anos/cursor-seta.svg");
                    background-size: contain;
                    background-repeat: no-repeat;
                    animation: cursorWalk 6s infinite ease-in-out;
                  }

                  @keyframes cursorWalk {
                    0% {
                      transform: translate(20px, 40px);
                      background-image: url("/convites/thayla-15anos/cursor-mao.svg");
                    }
                    20% {
                      transform: translate(20px, 500px);
                      background-image: url("/convites/thayla-15anos/cursor-mao.svg");
                    }
                    40% {
                      transform: translate(100px, 50px);
                      background-image: url("/convites/thayla-15anos/cursor-seta.svg");
                    }
                    60% {
                      transform: translate(100px, 50px);
                      background-image: url("/convites/thayla-15anos/cursor-seta.svg");
                    }
                    80% {
                      transform: translate(200px, 50px);
                      background-image: url("/convites/thayla-15anos/cursor-mao.svg");
                    }
                    100% {
                      transform: translate(20px, 40px);
                      background-image: url("/convites/thayla-15anos/cursor-mao.svg");
                    }
                  }
                `}</style>
              </>
            )}

            {/* Botão para copiar chave PIX na imagem do QR Code */}
            {index === 3 && (
              <div className="absolute top-[60%] left-[89%] transform -translate-x-1/2 w-full px-4 text-center z-10">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "00020126330014BR.GOV.BCB.PIX0111122424486925204000053039865802BR5925Thayla Emanuelle Silva An6009SAO PAULO62140510m33NeeZlTw6304C252"
                    );
                    alert("Chave PIX copiada!");
                  }}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm transition"
                >
                  <b>COPIAR</b>
                </button>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🎵 Player de música */}
      <div className="w-full max-w-sm p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 z-10">
        <div className="flex flex-col space-y-2">
          <div className="text-sm font-semibold text-center">
            Interestellar - Hans Zimmer
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="text-white hover:text-indigo-300 transition-colors text-3xl"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <div className="flex-grow">
              <div className="text-xs text-gray-300 flex justify-between font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>
                  {duration > 0
                    ? `-${formatTime(Math.max(duration - currentTime, 0))}`
                    : "0:00"}
                </span>
              </div>
              <div className="bg-white/20 rounded-full h-2 mt-1">
                <div
                  className="bg-indigo-400 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Áudio invisível */}
      <audio
        ref={audioRef}
        src="/convites/thayla-15anos/thayla-15anos.mp3"
        preload="metadata"
      />
    </div>
  );
}
