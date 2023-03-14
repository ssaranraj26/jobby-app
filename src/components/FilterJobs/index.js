import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterJobs = props => {
  const {
    handleCheckBox,
    handleRadio,
    employmentType,
    activeSalaryRangeId,
  } = props

  return (
    <>
      <hr />

      <h1 className="heading-100 employee-type">Type of Employment</h1>
      <ul className="employment-type-checkbox-container">
        {employmentType.map(eachType => (
          <li key={eachType.employmentTypeId} className="checkbox-item">
            <input
              id={eachType.employmentTypeId}
              className="checkbox-input"
              type="checkbox"
              value={eachType.employmentTypeId}
              checked={eachType.isChecked}
              onChange={() => handleCheckBox(eachType.employmentTypeId)}
            />
            <label
              className="checkbox-label"
              htmlFor={eachType.employmentTypeId}
            >
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>

      <hr />

      <h1 className="heading-100 salary-range">Salary Range</h1>
      <ul className="salary-range-container">
        {salaryRangesList.map(eachRange => (
          <li key={eachRange.salaryRangeId} className="radio-item">
            <input
              className="radio-input"
              type="radio"
              value={eachRange.salaryRangeId}
              name="salary"
              checked={eachRange.salaryRangeId === activeSalaryRangeId}
              onChange={() => handleRadio(eachRange.salaryRangeId)}
              id={eachRange.salaryRangeId}
            />
            <label className="radio-label" htmlFor={eachRange.salaryRangeId}>
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default FilterJobs
