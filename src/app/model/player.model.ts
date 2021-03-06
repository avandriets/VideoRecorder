export interface VideoElement {
  id: number;
  url: string;
}

export const videoSource: VideoElement[] = [
  {id: 1, url: 'https://d15t3vksqnhdeh.cloudfront.net/videos/1.mp4'},
  {id: 2, url: 'https://d15t3vksqnhdeh.cloudfront.net/videos/2.mp4'},
  {id: 3, url: 'https://d15t3vksqnhdeh.cloudfront.net/videos/3.mp4'},
];

export enum PlayerState {
  Pause,
  Play
}
