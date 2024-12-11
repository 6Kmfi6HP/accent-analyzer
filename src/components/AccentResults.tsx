import { AccentPrediction } from '@/types/accent'
import { formatProbability } from '@/utils/format'

interface AccentResultsProps {
  results: AccentPrediction[]
}

export default function AccentResults({ results }: AccentResultsProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Accent Analysis Results</h2>
      <div className="space-y-3">
        {results.map((result) => (
          <div 
            key={result.accent}
            className="flex justify-between items-center bg-gray-50 p-3 rounded"
          >
            <span className="font-medium">{result.accent}</span>
            <span className="text-gray-600">
              {formatProbability(result.probability)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}