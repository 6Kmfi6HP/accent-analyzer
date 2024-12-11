'use client'

import { useState } from 'react'
import { AccentPrediction } from '@/types/accent'
import { analyzeAccent, ApiError } from '@/utils/api'

interface AccentAnalysisState {
  isAnalyzing: boolean
  results: AccentPrediction[] | null
  error: string | null
}

export function useAccentAnalysis() {
  const [state, setState] = useState<AccentAnalysisState>({
    isAnalyzing: false,
    results: null,
    error: null,
  })

  const analyze = async (audioBlob: Blob) => {
    setState(prev => ({ ...prev, isAnalyzing: true, error: null }))
    
    try {
      const data = await analyzeAccent(audioBlob)
      setState(prev => ({
        ...prev,
        results: data.response.predictions,
        isAnalyzing: false,
      }))
    } catch (error) {
      let errorMessage = 'Failed to analyze accent. Please try again.'
      
      if (error instanceof ApiError) {
        errorMessage = error.message
      }
      
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isAnalyzing: false,
      }))
    }
  }

  const reset = () => {
    setState({
      isAnalyzing: false,
      results: null,
      error: null,
    })
  }

  return {
    ...state,
    analyze,
    reset,
  }
}