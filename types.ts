export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface FloatingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  icon: string;
  opacity: number;
}

export interface GeneratedContent {
  message: string;
}
