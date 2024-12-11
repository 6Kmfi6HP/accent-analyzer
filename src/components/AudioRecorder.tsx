'use client'

import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import { useAccentAnalysis } from '@/hooks/useAccentAnalysis'
import AccentResults from './AccentResults'
import AudioControls from './AudioControls'
import RecordingStatus from './RecordingStatus'
import ErrorMessage from './ErrorMessage'

export default function AudioRecorder() {
  const { 
    isRecording, 
    startRecording, 
    stopRecording, 
    audioBlob,
    resetRecording
  } = useAudioRecorder()

  const {
    isAnalyzing,
    results,
    error,
    analyze,
    reset: resetAnalysis
  } = useAccentAnalysis()

  const handleAnalyze = async () => {
    if (!audioBlob) return
    await analyze(audioBlob)
  }

  const handleReset = () => {
    resetRecording()
    resetAnalysis()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <AudioControls
          isRecording={isRecording}
          isAnalyzing={isAnalyzing}
          hasRecording={!!audioBlob}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onAnalyze={handleAnalyze}
          onReset={handleReset}
        />
        
        {isRecording && <RecordingStatus />}
        {error && <ErrorMessage message={error} />}
      </div>

      {results && <AccentResults results={results} />}
    </div>
  )
}