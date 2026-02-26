export type Emotion = 'HAPPY' | 'SAD' | 'ANGRY' | 'CALM';

export interface EmotionConfig {
  value: Emotion;
  label: string;
  emoji: string;
  cardStyle: string;
  buttonStyle: string;
}
