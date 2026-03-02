// 카드 이미지 값 넣기 !!!!!! ⭐⭐⭐⭐⭐
import {useRef, useState} from "react";
import type {EmotionConfig} from "../types/home.types";

const EMOTION_BG: Record<string, string> = {
    HAPPY: "rgba(244, 208, 111, 0.2)",
    SAD:   "rgba(125, 167, 199, 0.2)",
    ANGRY: "rgba(226, 125,  96, 0.2)",
    CALM:  "rgba(141, 181, 150, 0.2)",
};

interface Props {
    config: EmotionConfig;
    onWrite: () => void;
}

function EmotionCard({config, onWrite}: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});
    const [bgStyle, setBgStyle] = useState({});

    // ✅ 고정 각도 적용
    const handleHover = () => {
        setStyle({
            transform: "rotateX(-18deg) rotateY(18deg)"
        });

        setBgStyle({
            transform: "translateX(-12px) translateY(-12px)"
        });
    };

    const resetCard = () => {
        setStyle({transform: "rotateX(0deg) rotateY(0deg)"});
        setBgStyle({transform: "translateX(0px) translateY(0px)"});
    };

    return (
        <div
            className="perspective-[800px] m-3 cursor-pointer"
            onMouseEnter={handleHover}
            onMouseLeave={resetCard}
            onClick={onWrite}
            ref={cardRef}
        >
            <div
                className="relative w-[240px] h-[320px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 ease-out"
                style={style}
            >
                {/* 배경 */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
                    style={{
                        ...bgStyle,
                        backgroundImage: `url(${config.image})`
                    }}
                />

                {/* 감정 색상 오버레이 (20% opacity) */}
                <div className="absolute inset-0" style={{backgroundColor: EMOTION_BG[config.value]}}/>

                {/* 텍스트 */}
                <div
                    className="absolute bottom-0 p-6 text-white transform translate-y-10 hover:translate-y-0 transition-all duration-300">
                    <h2 className="text-2xl font-bold drop-shadow-lg">
                        {config.value}
                    </h2>
                    <p className="text-sm mt-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        {config.label}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EmotionCard;