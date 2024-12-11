import AudioRecorder from '@/components/AudioRecorder'
import AccentResults from '@/components/AccentResults'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Accent Analyzer</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <AudioRecorder />
        </div>
      </div>
    </main>
  )
}