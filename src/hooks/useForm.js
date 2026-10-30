import { useState } from 'react'
import { api } from '../lib/api'

/**
 * State for a public form that posts JSON to the API.
 * status: 'idle' | 'submitting' | 'success' | 'error'
 */
export default function useForm(endpoint, initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setMessage('')
    try {
      await api.post(endpoint, values)
      setStatus('success')
      setErrors({})
    } catch (error) {
      setErrors(error.fields || {})
      setMessage(error.message)
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setStatus('idle')
    setMessage('')
  }

  // Props for an input: value, change handler and accessible error wiring.
  const field = (name) => ({
    name,
    id: `${endpoint.replace(/\W/g, '')}-${name}`,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${endpoint.replace(/\W/g, '')}-${name}-error` : undefined,
  })

  return { values, errors, status, message, field, handleSubmit, reset }
}
