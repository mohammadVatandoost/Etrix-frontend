import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import dataCode from '../../../../dataCode';
import './Search.css';
import URLs from "../../../../URLs";
import {connect} from 'react-redux';

let searchSug = [];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : searchSug.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};


const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

const theme = { input: 'form-control input-border', suggestionsContainer: 'auto-suggest-inputOpen',
    suggestionHighlighted: 'auto-suggest-highlighted', suggestionsList: 'auto-suggest-suggestionsList ',
    suggestion: 'auto-suggest-suggestion'};

class Search extends Component {
    state  = {
        searchKey: '', searchSuggestion: [],
        redirect: false, currentFocus: -1,
        category: 'all',
        value: '',
        suggestions: []
    }

    componentDidMount() {
        // console.log("componentDidMount DesktopHeader");
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside = (e) => {
        if( (this.node !== null) && (typeof this.node !== 'undefined') ) {
            if (!this.node.contains(e.target)) {
                this.setState({searchSuggestion: [], currentFocus: -1});
            }
        }
    }
    searchHandler = (event) => {
        event.preventDefault();
        const url = '/search/'+'category='+this.state.category+'/'+this.state.searchKey;
        this.setState({searchSuggestion: [], currentFocus: -1});
        this.changeUrl(url);
    }

    onClickSuggestion = (suggestionKey) => {
        const url = '/search/'+'category='+this.state.category+'/'+suggestionKey;
        this.setState({searchSuggestion: [], currentFocus: -1});
        this.changeUrl(url);
    }

    changeUrl = (url) => {
        if(this.props.history.location.pathname.includes('search')) {
            this.props.history.push(url);
            window.location.reload();
        } else {
            this.props.history.push(url);
        }
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onKeySearchInput = (e) => {
        console.log(e.keyCode)
        if (e.keyCode === 38) {
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            let currentFocus = this.state.currentFocus;
            currentFocus--;
            if (currentFocus < 0) {
                currentFocus = this.state.searchSuggestion.length - 1;
            }
            // console.log(this.state.searchSuggestion);
            this.setState({currentFocus: currentFocus, searchKey: this.state.searchSuggestion[currentFocus].name});
            // console.log(currentFocus);
        } else if (e.keyCode === 13) {
            // /*If the enter key is pressed,*/
            // if(this.state.currentFocus > -1) {
            //     const url = '/search/'+'category='+this.state.category+'/'+this.state.searchSuggestion[this.state.currentFocus].name;
            //     this.setState({searchSuggestion: [], currentFocus: -1});
            //     this.changeUrl(url);
            // }
        } else if (e.keyCode === 40) {
            let currentFocus = this.state.currentFocus;
            // console.log(currentFocus);
            currentFocus = currentFocus + 1;
            // console.log(currentFocus);
            if ((this.state.searchSuggestion.length-1) < (currentFocus)) {
                currentFocus = 0;
            }
            // console.log(this.state.searchSuggestion);
            this.setState({currentFocus: currentFocus, searchKey: this.state.searchSuggestion[currentFocus].name});
        }
    }

    onChangeTest = (event, { newValue }) => {
        if(newValue.length > 3) {
            console.log(newValue);
            let url = URLs.base_URL+URLs.search_part+newValue;
            console.log(url);
            axios.get(url)
                .then(response => {
                    console.log(response.data[1]);
                    if(response.data[0] === dataCode.partSearch) {
                        searchSug = [];
                        response.data[1].map((item) => {
                            searchSug.push({name: item.manufacturer_part_number});
                            return null;
                        });
                        console.log(searchSug);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        this.setState({
            searchKey: newValue
        });
    };

    onChangeInputSearch = (e) => {
        this.setState({searchKey: e.target.value});
        if(e.target.value.length > 3) {
            // console.log(newValue);
            let url = URLs.base_URL+URLs.search_part+e.target.value;
            axios.get(url)
                .then(response => {
                    console.log(response);
                    if(parseInt(response.data[0]) === dataCode.partSearch) {
                        searchSug = [];
                        response.data[1].map((item) => {
                            searchSug.push({name: item.manufacturer_part_number});
                            return null;
                        });
                        // console.log(searchSug);
                        this.setState({searchSuggestion: searchSug});
                    }
                })
                .catch(err => {
                    console.log("header onChangeInputSearch error");console.log(err);
                });
        }
    }

    onSuggestionsFetchRequested = ({ value }) => { this.setState({ suggestions: getSuggestions(value) }); };

    onSuggestionsClearRequested = () => { this.setState({suggestions: []}); };

    render() {
        const { searchKey, suggestions } = this.state;

        const inputProps = {
            placeholder: 'نام قطعه را جست و جو کنید...',
            value: searchKey,
            onChange: this.onChangeTest
        };

        let categories = this.props.categories.map((item) => {
            if (!( (item.product === "Boxes Enclosures Racks") || (item.product === "Cable Assemblies Coaxial Cables RF") ||
                    (item.product === "Cables Wires") || (item.product === "Connectors Interconnects") ||
                    (item.product === "Fans Thermal Management Thermal Heat Sinks") ||
                    (item.product === "Hardware Fasteners Accessories Board Supports") || (item.product === "Industrial Automation and Controls Machine Safety Light Curtains") ||
                    (item.product === "Industrial Controls Time Delay Relays") || (item.product === "Maker DIY Educational Wearables") ||
                    (item.product === "Power Supplies Board Mount") || (item.product === "Power Supplies External Internal Off Board") ||
                    (item.product === "Relays Solid State Relays") || (item.product === "Development Boards Kits Programmers") ||
                    (item.product === "Static Control ESD Clean Room Products Static Control Clothing") || (item.product === "Test and Measurement") ||
                    (item.product === "Switches Slide Switches") || (item.product === "Switches Toggle Switches") ||
                    (item.product === "Tools") || (item.product === "Uncategorized Miscellaneous") ||
                    (item.product === "Line Protection Distribution Backups Power Distribution Surge Protectors")
                )) {
                return (
                    <option value={item.product} dir="rtl">{item.product.substring(0,10)}</option>
                )
            }
        });
        let inputSuggestion;
        if(this.state.searchSuggestion.length >0 ) {
            console.log("render search");console.log(this.state.searchSuggestion);
            let arraySuggestion = this.state.searchSuggestion.map( (obj,i) => {
                if(i === this.state.currentFocus) {
                    return ( <div className="autocomplete-active-responsive" key={i} onClick={() => {
                        this.onClickSuggestion(obj.name);
                    }}>
                        <strong>{obj.name.substr(0, this.state.searchKey.length)}</strong>{obj.name.substr(this.state.searchKey.length)}
                    </div> )
                } else {
                    return ( <div key={i} onClick={() => {
                        this.onClickSuggestion(obj.name);
                    }}>
                        <strong>{obj.name.substr(0, this.state.searchKey.length)}</strong>{obj.name.substr(this.state.searchKey.length)}
                    </div> )
                }
            });
            inputSuggestion = <div className="autocomplete-items-responsive">{arraySuggestion}</div>
        }
        return (
            <div className="col-12 d-flex justify-content-center p-1 background-black search-responsive">
                <form onSubmit={this.searchHandler} className="form-inline" id="responsiveSearch">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn btn-default search-responsive-size" onClick={this.searchHandler}>
                                <span className="fa fa-search"></span>
                            </button>
                        </div>
                        <div className="autocomplete-responsive" ref={node => this.node = node}>
                            <input onKeyDown={this.onKeySearchInput} value={this.state.searchKey} onChange={this.onChangeInputSearch} type="text" placeholder="نام قطعه را جست و جو کنید..." />
                            {inputSuggestion}
                        </div>
                        {/*<Autosuggest theme={theme}*/}
                                     {/*suggestions={suggestions}*/}
                                     {/*onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}*/}
                                     {/*onSuggestionsClearRequested={this.onSuggestionsClearRequested}*/}
                                     {/*getSuggestionValue={getSuggestionValue}*/}
                                     {/*renderSuggestion={renderSuggestion}*/}
                                     {/*inputProps={inputProps}*/}
                        {/*/>*/}
                        <div className="input-group-append p-0 responsive-search-select">
                            <select className="form-control m-0 pr-4 search-responsive-size" dir="rtl" value={this.state.category} onChange={this.onChange} name="category">
                                <option value="all" dir="rtl">همه</option>
                                {categories}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.cart.categories,
    };
};


export default withRouter(connect(mapStateToProps, null)(Search));

