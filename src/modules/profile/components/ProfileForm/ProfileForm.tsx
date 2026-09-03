import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Button, Input } from '@shared/components'
import { profileSchema } from '../../validation/profileSchema'
import type { ProfileFormValues } from '../../validation/profileSchema'
import './ProfileForm.css'

export interface ProfileFormProps {
  initialValues?: Partial<ProfileFormValues>
  onSubmit: (values: ProfileFormValues) => Promise<void> | void
  isLoading?: boolean
}

const DEFAULT_VALUES: ProfileFormValues = {
  fullName: '',
  email: '',
  dob: '',
  pan: '',
  aadhaar: '',
  mobile: '',
  address: '',
}

export const ProfileForm = ({
  initialValues,
  onSubmit,
  isLoading = false,
}: ProfileFormProps) => {
  const [values, setValues] = useState<ProfileFormValues>({
    ...DEFAULT_VALUES,
    ...initialValues,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormValues | 'form', string>>>({})

  const formatPAN = (val: string) => val.toUpperCase().slice(0, 10)

  const formatAadhaar = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 12)
    return digits
  }

  const formatDOB = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 8)
    if (digits.length <= 2) return digits
    if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    let formattedValue = value

    if (name === 'pan') {
      formattedValue = formatPAN(value)
    } else if (name === 'aadhaar') {
      formattedValue = formatAadhaar(value)
    } else if (name === 'dob' && !value.includes('/') && value.length > (values.dob?.length || 0)) {
      formattedValue = formatDOB(value)
    }

    setValues((prev) => ({ ...prev, [name]: formattedValue }))

    if (errors[name as keyof ProfileFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = profileSchema.safeParse(values)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ProfileFormValues, string>> = {}
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof ProfileFormValues
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    try {
      await onSubmit(result.data as ProfileFormValues)
    } catch (err) {
      setErrors({
        form: err instanceof Error ? err.message : 'Unable to save profile. Please try again.',
      })
    }
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit} noValidate>
      {/* Row 1: Full name * & Email * */}
      <div className="profile-form__row">
        <Input
          id="profile-fullName"
          name="fullName"
          label="Full name"
          placeholder="Enter your full name"
          value={values.fullName}
          error={errors.fullName}
          onChange={handleChange}
          required
          autoComplete="name"
          prefix={
            <svg className="form-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />

        <Input
          id="profile-email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          required
          autoComplete="email"
          prefix={
            <svg className="form-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />
      </div>

      {/* Row 2: Date of birth * & PAN * */}
      <div className="profile-form__row">
        <Input
          id="profile-dob"
          name="dob"
          label="Date of birth"
          placeholder="DD-MM-YYYY"
          maxLength={10}
          value={values.dob}
          error={errors.dob}
          onChange={handleChange}
          required
          autoComplete="bday"
          prefix={
            <svg className="form-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
          suffix={
            <svg className="form-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
        />

        <Input
          id="profile-pan"
          name="pan"
          label="PAN"
          placeholder="ABCDE1234F"
          maxLength={10}
          value={values.pan}
          error={errors.pan}
          onChange={handleChange}
          required
          autoCapitalize="characters"
          prefix={
            <svg className="form-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="2" />
              <path d="M15 8h2" />
              <path d="M15 12h2" />
              <path d="M7 16h10" />
            </svg>
          }
        />
      </div>

      {/* Row 3: Aadhaar number * & Mobile * */}
      <div className="profile-form__row">
        <Input
          id="profile-aadhaar"
          name="aadhaar"
          label="Aadhaar number"
          placeholder="12-digit Aadhaar"
          inputMode="numeric"
          maxLength={12}
          value={values.aadhaar}
          error={errors.aadhaar}
          onChange={handleChange}
          required
          prefix={
            <svg className="form-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 0 0-10 10c0 3.1 1.4 5.9 3.6 7.8" />
              <path d="M12 6a6 6 0 0 0-6 6c0 1.9.9 3.6 2.2 4.7" />
              <path d="M12 10a2 2 0 0 0-2 2c0 .6.3 1.2.7 1.6" />
              <path d="M18.4 19.8A10 10 0 0 0 22 12a10 10 0 0 0-10-10" />
              <path d="M17.8 16.7A6 6 0 0 0 18 12a6 6 0 0 0-6-6" />
              <path d="M13.3 13.6A2 2 0 0 0 14 12a2 2 0 0 0-2-2" />
            </svg>
          }
        />

        <Input
          id="profile-mobile"
          name="mobile"
          type="tel"
          label="Mobile"
          placeholder="+91 98765 43210"
          value={values.mobile}
          error={errors.mobile}
          onChange={handleChange}
          required
          autoComplete="tel"
          prefix={
            <svg className="form-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          }
        />
      </div>

      {/* Row 4: Address * (Full width) */}
      <div className="profile-form__row profile-form__row--full">
        <div className="field address-field">
          <label className="field__label" htmlFor="profile-address">
            Address<span aria-hidden="true"> *</span>
          </label>
          <div className="field__control address-control">
            <span className="field__affix address-affix">
              <svg className="form-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <textarea
              id="profile-address"
              name="address"
              rows={3}
              className="field__input address-textarea"
              placeholder="Enter your complete address"
              value={values.address}
              onChange={handleChange}
              required
            />
          </div>
          {errors.address && (
            <p className="field__error" role="alert">
              {errors.address}
            </p>
          )}
        </div>
      </div>

      {errors.form && (
        <div className="profile-form__alert-error" role="alert">
          <svg className="profile-form__alert-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{errors.form}</span>
        </div>
      )}

      {/* CTA Button: Continue -> */}
      <div className="profile-form__actions">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          className="profile-form__submit-btn"
        >
          Continue →
        </Button>
      </div>
    </form>
  )
}
