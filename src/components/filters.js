import React from 'react';
import Labels from '../mocks/fields.json';
import SelectMultiple from './select-multiple';
import SelectSingle from './select-single';


class Filters extends React.Component  {
  constructor(props) {
    super(props);
    this.initFilters = this.initFilters.bind(this);
    this.onMultipleSelected = this.onMultipleSelected.bind(this);
    this.onSingleSelected = this.onSingleSelected.bind(this);
    this.onFiltersApplied = this.onFiltersApplied.bind(this);
    this.onOptionsListClicked = this.onOptionsListClicked.bind(this);
    
    this.labels = Labels;
    this.state = this.initFilters();
 
  }

  initFilters () {
    let state = {};

    this.labels.filters.forEach((filter) => {
      if (filter.multiple) {
        state[filter.id] = {
          options:{},
          optionsShown: false
        };
        for(let i=0; i < filter.units.length; i++) {
          state[filter.id].options[filter.units[i]] = false;
        }
      } else {
        state[filter.id] = filter.dataPlaceholder;
      }
    });

    return state;
  };

  onOptionsListClicked (filterId) {
    this.setState({ [filterId] : {...this.state[filterId], optionsShown : !this.state[filterId].optionsShown } });
  };

  onMultipleSelected (filterId, optionName, isChecked) {
    this.setState({
        [filterId] : {   
        ...this.state[filterId],
        options : {
          ...this.state[filterId].options,
          [optionName] : isChecked
        } 
      } 
    });
  };

  onSingleSelected (filterId, optionName) {
    this.setState({
        [filterId] : optionName
    });
  };

  onFiltersApplied () {
    let selectedFilters = [];

    for (let filterId in this.state) {
      if (this.state[filterId].options) {
        let optionsList = this.state[filterId].options;
        for (let option in optionsList){
          if(optionsList[option]) {
            selectedFilters.push(option);
          }
        }
      } else {
          let filterSingle = this.labels.filters.find(filter => filter.id === Number(filterId));
          if (this.state[filterId] !== filterSingle.dataPlaceholder) {
            selectedFilters.push(this.state[filterId]);
          }
      }
    };

    this.props.onFiltersApplied(selectedFilters);
  };

  onFiltersDiscarded = () => {
    this.setState(this.initFilters());
    this.props.onFiltersDiscarded();
  };

  render() {
    return (
      <div className='filters'>
        <div className='filters-group'>
        {
          this.labels.filters.map((filter, index) => 
            <div className="filter" key={ index }>
              <label className="filter-label" htmlFor = {filter.name}>{filter.name}</label>
              {
                filter.multiple 
                ? <SelectMultiple 
                    filterSettings={filter}
                    filterState={this.state[filter.id]}
                    onMultipleSelected={this.onMultipleSelected}
                    onOptionsListClicked={this.onOptionsListClicked}
                  />
                 : <SelectSingle
                    filterSettings={filter}
                    filterState={this.state[filter.id]}
                    onSingleSelected={this.onSingleSelected}
                  />
              }
            </div>
          )
        }
        </div>
        <div className='filters-buttons'>
          <button onClick={this.onFiltersApplied}>Apply</button>
          <button onClick={this.onFiltersDiscarded}>Discard</button>
        </div>
      </div>
    );
  }
}
  
export default Filters;