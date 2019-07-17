import React from 'react';

const SelectSingle = (props) => {
    const onSelectChange = (event) => {
      props.onSingleSelected(props.filterSettings.id, event.target.value);
    };

    return (
      <select
        className = "filter-select"
        data-placeholder={props.filterSettings.dataPlaceholder} 
        onChange={onSelectChange}
        value={props.filterState}
      >
        <option value={props.filterSettings.dataPlaceholder}>
          {props.filterSettings.dataPlaceholder}
        </option>
        {props.filterSettings.units.map((unit, index) => 
          <option value={unit} key={index}>{unit}</option>
        )}
      </select>
    );
};

export default SelectSingle;