import React from 'react';
import Filters from './filters';

const SelectedFilters = ({filters}) => (
  <div className='filters-selected'>
    {filters.map((filter, index) =>
      <p key={index} >#{filter}</p>
    )}
  </div>
); 

class FilteredSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showFilters: false,
        appliedFilters: [],
        applyFilters: false
      };

      this.onFiltersClicked = this.onFiltersClicked.bind(this);
      this.onFiltersApplied = this.onFiltersApplied.bind(this);
      this.onFiltersDiscarded = this.onFiltersDiscarded.bind(this);
    };
  
    onFiltersClicked = () => {
      this.setState({ showFilters: !this.state.showFilters });
    };

    onFiltersApplied = (filtersArray) => {
      this.setState({
        appliedFilters: filtersArray,
        applyFilters: true
      });
    };

    onFiltersDiscarded = () => {
      this.setState({
        appliedFilters: [],
        applyFilters: false
      });
    };
  
    render() {
      return (
        <div className='search-form'>
          <div className='search-group'>
            <label htmlFor ='search' className='search-label'>Search</label>
            <input type='text' name='search' className='search-input'/>
            <button onClick = { this.onFiltersClicked }> Filters </button>
          </div>
        
  
          { this.state.showFilters
            && <div>
                <Filters
                  onFiltersApplied = { this.onFiltersApplied }
                  onFiltersDiscarded = { this.onFiltersDiscarded }
                />
                { this.state.applyFilters && <SelectedFilters filters={this.state.appliedFilters}/> }
              </div>
          }
        </div>
      );
    };
  }

  export default FilteredSearch;
  