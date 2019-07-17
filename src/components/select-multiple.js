import React from 'react';

const SelectMultiple = (props) => {
    const onOptionChange = (event) => {
        props.onMultipleSelected(props.filterSettings.id, event.target.value, event.target.checked);
    };

    const setOptionsListShown = () => {
        props.onOptionsListClicked(props.filterSettings.id);
    };
  
    return (
        <div className="dropdown-check-list">
            <span className="dropdown-check-list__anchor" onClick={setOptionsListShown}>
                {props.filterSettings.dataPlaceholder}
            </span>
            <ul 
                className={`dropdown-check-list__options ${ props.filterState.optionsShown ? 'dropdown-check-list__options-shown' : ''}`}
            >
                {props.filterSettings.units.map((unit, index) => 
                <li key={index}>
                    <input type="checkbox" onChange={ onOptionChange } value={unit} checked={props.filterState.options[unit]}/>
                    {unit}
                </li>
                )}
            </ul>
        </div> 
    );   
};

export default SelectMultiple;