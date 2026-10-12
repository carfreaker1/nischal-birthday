import { ASSETS } from './data/assetsData.js';

export function prepareAudio(audio) {
  if (!audio) return;
  const start = Number.isFinite(audio.duration) && audio.duration <= ASSETS.songStart
    ? 0 : ASSETS.songStart;
  if (audio.currentTime < start || audio.ended) {
    try {
      audio.currentTime = start;
    } catch {
      // Retry when metadata loads if this browser cannot seek yet.
    }
  }
}

export function playAudio(audio) {
  if (!audio) return Promise.resolve();
  prepareAudio(audio);
  return audio.play();
}
