'use client'

import { useState, useCallback, useEffect } from 'react'

export function useAudioRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  // Cleanup function to stop all tracks when component unmounts
  useEffect(() => {
    return () => {
      if (mediaRecorder?.stream) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [mediaRecorder])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: BlobPart[] = []

      recorder.ondataavailable = (e) => chunks.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm;codecs=opus' })
        setAudioBlob(blob)
        stream.getTracks().forEach(track => track.stop())
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (error) {
      console.error('Error starting recording:', error)
      throw new Error('Failed to start recording. Please check your microphone permissions.')
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
      setIsRecording(false)
    }
  }, [mediaRecorder])

  const resetRecording = useCallback(() => {
    setAudioBlob(null)
    setMediaRecorder(null)
  }, [])

  return {
    isRecording,
    startRecording,
    stopRecording,
    audioBlob,
    resetRecording,
  }
}