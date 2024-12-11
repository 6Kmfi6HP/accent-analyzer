export interface AccentPrediction {
  accent: string
  probability: number
}

export interface AccentResponse {
  success: boolean
  response: {
    status: string
    predictions: AccentPrediction[]
  }
  audioLogID: string
}