import Button from './Button'

interface AudioControlsProps {
  isRecording: boolean
  isAnalyzing: boolean
  hasRecording: boolean
  onStartRecording: () => void
  onStopRecording: () => void
  onAnalyze: () => void
  onReset: () => void
}

export default function AudioControls({
  isRecording,
  isAnalyzing,
  hasRecording,
  onStartRecording,
  onStopRecording,
  onAnalyze,
  onReset,
}: AudioControlsProps) {
  return (
    <div className="flex gap-4">
      {!isRecording && !hasRecording && (
        <Button onClick={onStartRecording}>
          Start Recording
        </Button>
      )}
      {isRecording && (
        <Button onClick={onStopRecording} variant="secondary">
          Stop Recording
        </Button>
      )}
      {hasRecording && !isRecording && (
        <>
          <Button onClick={onAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing...' : 'Analyze Accent'}
          </Button>
          <Button onClick={onReset} variant="secondary">
            Reset
          </Button>
        </>
      )}
    </div>
  )
}