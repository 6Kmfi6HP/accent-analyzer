export function formatProbability(probability: number): string {
  return `${(probability * 100).toFixed(2)}%`
}