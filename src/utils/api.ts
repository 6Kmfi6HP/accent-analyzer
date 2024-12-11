import { AccentResponse } from '@/types/accent'
import { API_CONFIG, AUDIO_CONFIG } from '@/config/constants'

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function analyzeAccent(audioBlob: Blob): Promise<AccentResponse> {
  const formData = new FormData()
  formData.append('audio', audioBlob, AUDIO_CONFIG.FILE_NAME)
  formData.append('top_k', API_CONFIG.TOP_K)
  formData.append('prompt', API_CONFIG.DEFAULT_PROMPT)

  try {
    const response = await fetch(API_CONFIG.ACCENT_API_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': '*/*',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(
        'Server responded with an error',
        response.status,
        data
      )
    }

    if (!data.success) {
      throw new ApiError('API returned unsuccessful response', undefined, data)
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    if (error instanceof TypeError) {
      throw new ApiError('Network error - please check your connection')
    }

    throw new ApiError('An unexpected error occurred')
  }
}