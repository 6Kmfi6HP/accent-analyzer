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
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,th-TH;q=0.8,th;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4",
        "cache-control": "no-cache",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundary4M7dMBjQEJa3empT",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://start.boldvoice.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
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