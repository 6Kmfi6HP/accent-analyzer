// API Configuration
export const API_CONFIG = {
  ACCENT_API_URL: 'https://api-v2.boldvoice.com/api/v1/accent_guesser',
  DEFAULT_PROMPT: "I've recently started experimenting with watercolor painting. The way the colors blend together on the paper is so satisfying, and I love how every piece turns out unique, even if it doesn't always go as planned.",
  TOP_K: '5'
} as const

// Audio Configuration
export const AUDIO_CONFIG = {
  MIME_TYPE: 'audio/webm;codecs=opus',
  FILE_NAME: 'recording.webm'
} as const