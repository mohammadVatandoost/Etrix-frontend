import React, { Component } from 'react';
import AuxWrapper from '../../AuxWrapper/AuxWrapper';
import Select from 'react-select';
import ArrowImageDown from '../../../assets/arrow-down.png';
import ArrowImageUp from '../../../assets/arrow-up.png';

class FilterProducts2 extends Component {

    state = {
        filters: {}, showEtraFilter: false
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
        let dataFilters, dataFilters2, showMoreFilter ;
        let filterButton;
        let filteredOptions;
        // data Filters
        let dataFiltersTemp = this.props.dataFilters;
        dataFilters = Object.keys(dataFiltersTemp).map((property,i) => {
            if(i<4) {
            let options =[];
            dataFiltersTemp[property].map((item) => {options.push({label: item,value: item}); return null; } );
                if(property === "unit_price")  {

                } else if(property === "ld_image") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>عکس</p>
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
                } else if(property === "datasheet") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>دیتاشیت</p>
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
                } else if(property === "manufacturer_part_number") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>نام قطعه</p>
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
                } else if(property === "quantity_available") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>تعداد موجود</p>
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
                } else if(property === "manufacturer") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>سازنده</p>
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
                } else if(property === "description") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>توضیح</p>
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
                } else if(property === "packaging") {

                } else if(property === "series") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>سری قطعه</p>
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
                } else if(property === "core_processor") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>هسته پردازنده</p>
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
                } else if(property === "speed") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>سرعت</p>
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
                } else if(property === "operating_temperature") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>دمای کاری</p>
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
                } else {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
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
                }
            }
        });
        dataFilters2 = Object.keys(dataFiltersTemp).map((property,i) => {
            if(i>3) {
                let options =[];
                dataFiltersTemp[property].map((item) => {options.push({label: item,value: item}); return null; } );
                if(property === "unit_price")  {

                } else if(property === "ld_image") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>عکس</p>
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
                } else if(property === "datasheet") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>دیتاشیت</p>
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
                } else if(property === "manufacturer_part_number") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>نام قطعه</p>
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
                } else if(property === "quantity_available") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>تعداد موجود</p>
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
                } else if(property === "manufacturer") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>سازنده</p>
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
                } else if(property === "description") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>توضیح</p>
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
                } else if(property === "packaging") {

                } else if(property === "series") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>سری قطعه</p>
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
                } else if(property === "core_processor") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>هسته پردازنده</p>
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
                } else if(property === "speed") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>سرعت</p>
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
                } else if(property === "operating_temperature") {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>دمای کاری</p>
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
                } else {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
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
                }
            }
        });
        if(Object.keys(dataFiltersTemp).length > 1) {
            filterButton = <button onClick={this.filterComponent} hidden={this.props.loading} className="btn btn-primary buttonFilter">فیلتر</button>
            showMoreFilter = <AuxWrapper><button onClick={() => {this.setState({showEtraFilter: !this.state.showEtraFilter})}} hidden={this.state.showEtraFilter} className="btn margin-bottom-2 margin-top-2"><img width="40" height="40" src={ArrowImageDown} /></button>
                <button onClick={() => {this.setState({showEtraFilter: !this.state.showEtraFilter})}} hidden={!this.state.showEtraFilter} className="btn margin-bottom-2 margin-top-2"><img width="40" height="40" src={ArrowImageUp} /></button></AuxWrapper>
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
                <div className="row">{dataFilters}{dataFilters2}</div>
                <br/>
                {filterButton}
                <br/>
                {/*<hr/>*/}
                {showMoreFilter}
                {/*<div >*/}
                {/*</div>*/}
                {filteredOptions}
                <br/>
            </AuxWrapper>
        )
    }
}

export default FilterProducts2;

