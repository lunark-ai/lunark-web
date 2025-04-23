declare module 'react-water-wave' {
  interface WaterWaveProps {
    imageUrl: string;
    style?: React.CSSProperties;
    dropRadius?: number;
    perturbance?: number;
    resolution?: number;
    children?: (controls: {
      pause: () => void;
      play: () => void;
    }) => React.ReactNode;
  }

  const WaterWave: React.FC<WaterWaveProps>;
  export default WaterWave;
} 