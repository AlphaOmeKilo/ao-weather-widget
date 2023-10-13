import React, { Fragment } from 'react'

export const SelectField = ({ className, text, options, onChange, value }) => {
  return (
    <>
      <p>{text}</p>
      <select
        value={value}
        className={`${className}`}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
