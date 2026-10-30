import React from 'react'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import './FormStatus.css'

export const FieldError = ({ form, name }) =>
  form.errors[name] ? (
    <p className="field-error" id={`${form.field(name).id}-error`}>
      {form.errors[name]}
    </p>
  ) : null

export const FormError = ({ form }) =>
  form.status === 'error' && form.message ? (
    <div className="form-alert" role="alert">
      <AlertCircle size={18} aria-hidden="true" />
      <span>{form.message}</span>
    </div>
  ) : null

export const FormSuccess = ({ title, children, onReset, resetLabel }) => (
  <div className="form-success" role="status">
    <span className="form-success-icon"><CheckCircle2 size={34} aria-hidden="true" /></span>
    <h3>{title}</h3>
    <p>{children}</p>
    <button type="button" className="btn-secondary" onClick={onReset}>{resetLabel}</button>
  </div>
)

export const SubmitLabel = ({ form, idle, icon: Icon }) =>
  form.status === 'submitting' ? (
    <>
      <Loader2 size={16} className="spin" aria-hidden="true" /> Sending...
    </>
  ) : (
    <>
      <Icon size={16} aria-hidden="true" /> {idle}
    </>
  )

// Hidden from people; bots that fill every field get silently ignored by the server.
export const Honeypot = ({ form }) => (
  <div className="hp-field" aria-hidden="true">
    <label>
      Website
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.values.website} onChange={form.field('website').onChange} />
    </label>
  </div>
)
