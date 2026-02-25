import { useRef, useState } from "react";
import type { EmotionConfig } from "../types/home.types";

interface Props {
    config: EmotionConfig;
    onWrite: () => void;
}

function EmotionCard({ config, onWrite }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});
    const [bgStyle, setBgStyle] = useState({});

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        const rotateX = (mouseY / height) * -70;
        const rotateY = (mouseX / width) * 70;

        setStyle({
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        });

        setBgStyle({
            transform: `translateX(${mouseX * -0.05}px) translateY(${mouseY * -0.05}px)`
        });
    };

    const resetCard = () => {
        setStyle({ transform: "rotateX(0deg) rotateY(0deg)" });
        setBgStyle({ transform: "translateX(0px) translateY(0px)" });
    };

    return (
        <div
            className="perspective-[800px] m-3 cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetCard}
            onClick={onWrite}
            ref={cardRef}
        >
            <div
                className="relative w-[240px] h-[320px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500"
                style={style}
            >
                {/* 배경 */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                    style={{
                        ...bgStyle,
                        backgroundImage: `url(${config.image})`
                    }}
                />

                {/* 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

                {/* 텍스트 */}
                <div className="absolute bottom-0 p-6 text-white transform translate-y-10 hover:translate-y-0 transition-all duration-500">
                    <h2 className="text-2xl font-bold drop-shadow-lg">
                        {config.value}
                    </h2>
                    <p className="text-sm mt-2 opacity-0 hover:opacity-100 transition-opacity duration-500">
                        {config.label}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EmotionCard;