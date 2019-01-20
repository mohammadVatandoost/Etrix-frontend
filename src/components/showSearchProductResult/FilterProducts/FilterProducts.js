import React, { Component } from 'react';
import AuxWrapper from '../../AuxWrapper/AuxWrapper';
import Select from 'react-select';

class FilterProducts extends Component {

    state = {
        filters: {}
    }

    componentDidMount() {

    }

    filterComponent = () => {
     //   http://localhost/api/search-part-filter?keyword=stm32f4&category=Embedded-Microcontrollers&filters=%7B%22rCl%22:[%2240MHz%22],%22tra%22:[%22Microchip+Technology%22]%7D
        console.log("FilterProducts");
        console.log(this.state.filters);
        let temp = {} ;
        Object.keys(this.state.filters).map((property) => {
            let temp2;
            Object.keys(this.props.tableHeaderS).map((property2) => {
                if(this.props.tableHeaderS[property2] === property) { temp2 = property2; }
                return null;
            });
            // console.log(this.state.filters[property]);
            // let buffer3 = this.state.filters[property].split(",");
            console.log("FilterProducts loop");
            console.log(this.state.filters[property]);
            temp[temp2]=[];
            for(var i=0;i<this.state.filters[property].length;i++ ) {
                temp[temp2].push(this.state.filters[property][i].value);
            }
            // = this.state.filters[property];
            return null;
        });
        console.log("FilterProducts filters");
        console.log(temp);
        this.props.filterComponent(temp);
    }

    makeNiceNmae = (name) => {
        if(name.includes("_")) {
            name.split("_").join(" ");
        }
        return name;
    }

    render() {
        let dataFilters ;
        let filterButton;
        let filteredOptions;
        // data Filters
        let dataFiltersTemp = this.props.dataFilters;
        dataFilters = Object.keys(dataFiltersTemp).map((property,i) => {
            let options =[];
            dataFiltersTemp[property].map((item) => {options.push({label: item,value: item}); return null; } );
            return (
                <div className="col-md-2 col-sm-6 colScrollable" key={i}>
                    <p style={{textAlign: 'center',fontSize: '125%'}}>{property.split('_').join(' ')}</p>
                    <Select
                        closeOnSelect
                        disabled={false}
                        isMulti
                        onChange={(selectedOption) => {let temp = this.state.filters;temp[property] = selectedOption;this.setState({filters: temp});console.log(temp);}}
                        options={options}
                        placeholder=""
                        removeSelected
                        simpleValue
                        value={this.state.filters[property]}
                    />
                </div>
            );
        });
        if(Object.keys(dataFiltersTemp).length > 1) {
            filterButton = <button onClick={this.filterComponent} hidden={this.props.loading} className="btn btn-primary buttonFilter">فیلتر</button>

        }
        if(Object.keys(this.props.filtered).length > 0) {
            console.log("filters");
            console.log(this.props.filtered);
            console.log(this.props.filteredHeaders);
            let filtered = Object.keys(this.props.filtered).map((property,i) => {
                return (
                    <li className="margin-right-1"><button onClick={()=>{ this.props.removeFilter(property)} }> <i class="fa fa-times" aria-hidden="true"></i> <span> {this.makeNiceNmae(this.props.filteredHeaders[property])} </span></button></li>
                );
            });
            filteredOptions = <ul className="flex-row">
                {filtered}
            </ul>
        }
        return (
            <AuxWrapper>
             <div className="row text-center rowScrollable">{dataFilters}</div>
             <br/>
             {filterButton}
             <br/><br/>
             {filteredOptions}
             <br/>
            </AuxWrapper>
        )
    }
}

export default FilterProducts;

