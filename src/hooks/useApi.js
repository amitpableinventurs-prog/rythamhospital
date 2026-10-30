import { useEffect, useState } from 'react'
import { api } from '../lib/api'

/**
 * Fetch JSON from the API and re-fetch when `path` or `params` change.
 * Returns { data, error, loading, reload }. While a new request is in flight,
 * `data` still holds the previous result so lists don't flash empty.
 */
export default function useApi(path, params) {
  const [version, setVersion] = useState(0)
  const [result, setResult] = useState({ key: null, data: null, error: null })
  const paramsKey = JSON.stringify(params || {})
  const requestKey = path ? `${path}|${paramsKey}|${version}` : null

  useEffect(() => {
    if (!requestKey) return undefined
    const controller = new AbortController()
    api
      .get(path, JSON.parse(paramsKey), { signal: controller.signal })
      .then((data) => setResult({ key: requestKey, data, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setResult((prev) => ({ key: requestKey, data: prev.data, error }))
      })
    return () => controller.abort()
  }, [path, paramsKey, requestKey])

  const settled = result.key === requestKey
  return {
    data: result.data,
    error: settled ? result.error : null,
    loading: Boolean(requestKey) && !settled,
    reload: () => setVersion((v) => v + 1),
  }
}
