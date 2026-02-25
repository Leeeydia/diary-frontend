import type {EmotionConfig} from '../types/home.types';

interface Props {
    config: EmotionConfig;
    onWrite: () => void;
}

function EmotionCard({config, onWrite}: Props) {
    return (
        <div
            onClick={onWrite}
            role="button"
            tabIndex={0}
            className={`cursor-pointer flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl shadow-sm min-h-[200px] md:min-h-[280px] transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${config.cardStyle}`}
        >
      <span className="text-5xl md:text-6xl" role="img" aria-label={config.label}>
        {config.emoji}
      </span>

            <div className="text-center mt-4">
                <p className="text-base md:text-lg font-bold text-gray-800">{config.value}</p>
                <p className="text-sm md:text-base text-gray-500 mt-0.5">{config.label}</p>
            </div>
        </div>
    );
}

export default EmotionCard;
