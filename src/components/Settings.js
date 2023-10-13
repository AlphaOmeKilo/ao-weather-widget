import React, { useState } from 'react'
import styles from '../assets/styles/settings.module.scss'
import data from '../assets/data/city.list.json'
import { SelectField } from './SelectField'
import { Button } from './Button'

const cities = data.map((d) => ({ value: d, label: d }))
const units = [
  {
    value: 'metric',
    label: 'Metric'
  },
  {
    value: 'imperial',
    label: 'Imperial'
  }
]

const Settings = ({ active, settings, updateSettings }) => {
  const [chosenCity, setChosenCity] = useState(settings.city)
  const [chosenUnits, setChosenUnits] = useState(settings.units)

  /**
   * Call the callback function using the selected
   * values for city and units
   */
  const applyConfig = () => {
    updateSettings({
      city: chosenCity,
      units: chosenUnits
    })
  }

  /**
   * Update the local city choice
   * @param {string} newCity - Chosen city in the dropdown
   */
  const handleCityChange = (newCity) => {
    setChosenCity(newCity)
  }

  /**
   * Update the local units choice
   * @param {string} units  - Chosen units in the dropdown
   */
  const handleUnitsChange = (units) => {
    setChosenUnits(units)
  }

  return (
    <div
      className={`${styles[active ? 'active' : 'inactive']} ${styles.settings}`}
    >
      <SelectField
        className={`${styles.select}`}
        text='Select city:'
        options={cities}
        onChange={handleCityChange}
        value={chosenCity}
      />
      <SelectField
        className={`${styles.select}`}
        text='Select unit:'
        options={units}
        onChange={handleUnitsChange}
        value={chosenUnits}
      />
      <Button text='Apply' onClick={applyConfig} />
    </div>
  )
}

export default Settings
