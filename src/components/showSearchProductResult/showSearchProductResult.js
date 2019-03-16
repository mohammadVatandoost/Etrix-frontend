import React , {Component} from 'react';
import axios from 'axios';
import { withRouter} from 'react-router-dom';
import dataCode from '../../dataCode';
import { ClipLoader } from 'react-spinners';
import * as actions from '../../store/actions/index';
import Alert from 'react-s-alert';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import './showSearchProductResult.css';
import URLs from "../../URLs";
import styles from './custom-styling.css';
import FilterProducts from './FilterProducts/FilterProducts2';
import ProductTable from './ProductsTable/ProductsTable';
import MultiCategory from './MultiCategory/MultiCategory';
import QueryString from 'query-string';
import Pagination from '../Pagination/Pagination';

let prices = {};let counter = 0;

class showSearchProductResult extends Component {

    state  = {
        searchKey: '', data: '', dataParts: [], dataCode: '', dataFilters: [],open: false, prices: {}, projects: [],
        tableHeaderS: '', loading: true, number: 1,loadingAddCart: true,productName: '', category: '',
        projectName: null, multiCategory: [], filters: '', filteredHeaders: '', priceBuf: 0
    }

    componentDidMount() {prices = {};counter = 0;
        let url = URLs.base_URL+URLs.search_part_category+this.props.match.params.category;
        // let newURL = {
        //     category: this.props.match.params.category, keyword: this.props.match.params.keyword,
        // }
        if(this.props.match.params.keyword !== undefined) {
            console.log("componentDidMount() this.props.match.params.keyword:"+this.props.match.params.keyword );
          url = url +'&keyword='+this.props.match.params.keyword;
        }
        if(this.props.match.params.filter !== undefined) {
            console.log('showSearchProductResult componentDidMount filter not null');
            console.log(this.props.match.params.filter);
            let temp = QueryString.parse(this.props.match.params.filter, {arrayFormat: 'bracket'});
            console.log(temp);
            console.log(QueryString.stringify(temp, {arrayFormat: 'bracket'}));
            this.setState({filters: QueryString.parse(this.props.match.params.filter, {arrayFormat: 'bracket'})});
            url = url+"&filters=&"+this.props.match.params.filter
            // url = url+this.props.match.params.filter;
            // newURL["filter"] = QueryString.parse(this.props.match.params.filter)
        }
        // let temp = window.location.href;
        // temp = temp.replace(URLs.react_search_url+this.props.match.params.category+'/'+this.props.match.params.keyword,'');
        // temp = temp.replace('/','');
        // console.log('componentDidMount temp');console.log(temp);
        console.log('componentDidMount newURL');
        console.log(url);
        // let test = QueryString.stringify({
        //     category: this.props.match.params.category,
        //     keyword: this.props.match.params.keyword,
        //     nested: JSON.stringify({
        //         filter: this.props.match.params.filter
        //     })
        // }, {arrayFormat: 'bracket'});
        // console.log(test);
        // // console.log(QueryString.stringify(newURL))
        // console.log(QueryString.parse(test));
        // let temp = JSON.parse( QueryString.parse(test).nested );
        // console.log(temp)
        // console.log(QueryString.parse( temp.filter));
        // // if(temp !== '') { url = url + '&filters='+temp; }
        let keyword = this.props.match.params.keyword;
        // if(keyword.includes("&subcategory=")) {keyword = keyword.split("&subcategory=")[0];}
        this.setState({searchKey: keyword});
        // url = "http://localhost/api/search-part-filter?keyword=stm32f4&category=Embedded-Microcontrollers&filters=%7B%22rCl%22:[%2240MHz%22],%22tra%22:[%22Microchip+Technology%22]%7D";
        axios.get(url)
            .then(response => {
                console.log("componentDidMount showSearchProductResult");
                console.log(response);
                // console.log(dataCode.partSearch);
                if(response.data !== dataCode.userNotAllowed) {
                    // console.log("not 320");
                    if ( (parseInt(response.data[0]) === dataCode.partSearch || response.data[0] === dataCode.partSearchCategory)&& response.data[2] !== dataCode.partNotFound) {
                        console.log("IdataCode.partSearch");
                        this.setState({
                            dataCode: response.data[0],
                            dataParts: response.data[2],
                            dataFilters: response.data[3],
                            tableHeaderS: response.data[5],
                            category: response.data[6], filteredHeaders: response.data[7]
                        });
                    } else if (response.data[0] === dataCode.partSearchMultiCategory) {
                        this.setState({dataCode: response.data[0], multiCategory: response.data[1]});
                        // console.log("componentDidMount showSearchProductResult multiCategory");
                    } else if(response.data[2] === dataCode.partNotFound){
                        this.setState({dataCode: dataCode.partNotFound});
                        // console.log("componentDidMount showSearchProductResult does not find any product");
                    } else if(response.data === dataCode.partNotFound) {
                        this.setState({dataCode: dataCode.partNotFound});
                        // console.log("componentDidMount showSearchProductResult response.data does not find any product");
                    } else {
                        console.log("componentDidMount showSearchProductResult does not be in any defined state");
                    }
                } else {
                    console.log("componentDidMount showSearchProductResult response.data !== dataCode.userNotAllowed does not be in any defined state");
                    // this.setState({dataCode: response.data[0]});
                }
                this.setState({loading: false});
            })
            .catch(err => {
                console.log("componentDidMount searchKey");console.log(err);
            });
        if(this.props.token) { this.getProjects(); }
    }

    sort = (property,kind) => {
        console.log("sort");
        console.log(property);
        console.log(kind);
    }

    filterComponent = (filters) => {
        console.log("filterComponent filters");
        console.log(filters);
        console.log("filterComponent new fileters");
        filters = {...filters, ...this.state.filters};
        console.log(filters);
        // let urlParams = Object.keys(filters).map(function(k) {
        //     return encodeURIComponent(k) + '=' + encodeURIComponent(urlParams[k])
        // }).join('&')
        const stringified = QueryString.stringify(filters, {arrayFormat: 'bracket'});

        console.log(stringified);
        console.log("filterComponent new packages parse");
        console.log(QueryString.parse(stringified));
        let url = '/search/'+this.state.category.name+'/'+this.props.match.params.keyword+'/'+stringified;
        // url = url.replace('{',"%7B");
        // url = url.replace('}',"%7D");
        // let url = buildUrl('/search/'+this.state.dataParts[0].slug+'/'+this.props.match.params.keyword+'/', {
        //     queryParams: {
        //         'filters': JSON.stringify(filters)
        //     }
        // });
        console.log("filterComponent url");
        console.log(url);
        // url = url.replace('?filters=','/');
        // console.log(url);
        this.props.history.push(url);
        window.location.reload();
    }

    // setNumber = (e,num) => {
    //     // console.log('num');console.log(num);console.log('e');console.log(e.target.value);
    //    let temp = this.state.number;temp[num] = e.target.value; this.setState({number: temp});
    // }

    addToCart = (productName,price,number) => {
       if(this.props.token) {
           this.setState({loadingAddCart: true});
           console.log("number of products :");console.log(number);
           axios.post(URLs.base_URL+URLs.user_cart_create, {
               keyword: productName,
               num: number,
               token: this.props.token, project: this.state.projectName
           })
               .then(response => {
                   console.log("add to cart function");
                   console.log(response);console.log("this.state.projectName");console.log(this.state.projectName);
                   if(response.data.code === 200) {
                       this.props.addToCart(productName, number, price, this.state.projectName);
                       // this.props.addToCart(productName, number, category, this.state.projectName);
                       Alert.success(response.data.body, {
                           position: 'bottom-right',
                           effect: 'scale',
                           beep: false,
                           timeout: 4000,
                           offset: 100
                       });
                   } else  {
                       Alert.error(response.data.body, {
                           position: 'bottom-right',
                           effect: 'scale',
                           beep: false,
                           timeout: 4000,
                           offset: 100
                       });
                   }
                   this.setState({loadingAddCart: false});
               })
               .catch(err => {
                   console.log("showSearchProductResult add to cart  error");
                   console.log(err);
                   Alert.error('دوباره امتحان کنید', {
                       position: 'bottom-right',
                       effect: 'scale',
                       beep: false,
                       timeout: 4000,
                       offset: 100
                   });
                   this.setState({loadingAddCart: false});
               });

       } else {
           this.props.addToCart(productName, number, price, null);
           Alert.success('به سبد خرید اضافه شد', {
               position: 'bottom-right',
               effect: 'scale',
               beep: false,
               timeout: 4000,
               offset: 100
           });
       }
       this.onCloseModal();
    }

    setInitialForPriceInput = () => {
        let temp = this.state.number;
        if(Object.keys(temp).length == 0) {
            this.state.dataParts.map((item, i) => {
                 Object.keys(item).map((property, j) => {
                    if(property === "unit_price") {
                        temp[item['manufacturer_part_number']] = 1 ;
                        prices[item['manufacturer_part_number']] = 0;
                    }
                });
            });
            console.log("setInitialForPriceInput");console.log(temp);
            this.setState({number: temp});let pricesBuf = {};
            Object.keys(prices).map((property, j) => {
                console.log(j+" : "+ property);
                axios.post(URLs.base_URL+URLs.product_get_price, {keyword: property})
                    .then(response => {
                        console.log(j+" : ");counter++;
                        console.log(response);
                        pricesBuf[property] = response.data.unit_price;
                        if(counter === Object.keys(prices).length) {
                            console.log("get last response ");console.log(pricesBuf);
                            this.setState({prices: pricesBuf, loadingAddCart: false});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });

            });

         }
    }

    onOpenModal = (productName, category, number, price) => {
        console.log("this.state.category");console.log(this.state.category);
        if(this.props.token) {
            console.log("showSearchProductResult open Modal with token");
            console.log("category");console.log(category);
            console.log("productName");console.log(productName);
            console.log("number");console.log(number);
            console.log("price");console.log(price);
            this.setState({open: true});
            this.setState({productName: productName, number: number, priceBuf: price});
        } else {
            console.log("showSearchProductResult open Modal without token");
            console.log("category");console.log(category);
            console.log("productName");console.log(productName);
            console.log("number");console.log(number);
            console.log("price");console.log(price);
            this.props.addToCart(productName, number, price, null);
            Alert.success('به سبد خرید اضافه شد', {
                position: 'bottom-right',
                effect: 'scale',
                beep: false,
                timeout: 4000,
                offset: 100
            });
        }
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    getProjects = () => {
        axios.post(URLs.base_URL+URLs.user_get_projects, {token: this.props.token})
            .then(response => {
                console.log("projects");console.log(response);
                this.setState({projects: response.data});
            })
            .catch(err => {
                console.log("get projects error");
                console.log(err);
            });
    }

    selectChange = (event) => {
        // console.log("showSearchProductResult select changes");
        // console.log(event.target.value);
        let temp = event.target.value;
        if(temp === '-'){temp = null;}
        this.setState({projectName: temp});
    }

    removeFilter = (fiterdPast) => {
        let filters = this.state.filters;
        delete filters[fiterdPast];
        const stringified = QueryString.stringify(filters, {arrayFormat: 'bracket'});
        let url = '/search/'+this.state.category.name+'/'+this.props.match.params.keyword+'/'+stringified;
        this.props.history.push(url);
        window.location.reload();
    }

    render() {
        let productsTble , paginationResult;
        let projectsOption;let filterProduct;let multiCAtegory;
        if(parseInt(this.state.dataCode) === dataCode.partSearch || this.state.dataCode === dataCode.partSearchCategory) {
            productsTble = <ProductTable category={this.state.category.name} onOpenModal={this.onOpenModal} sort={this.sort} searchKey={this.state.searchKey} tableHeaderS={this.state.tableHeaderS} dataParts={this.state.dataParts} />;
            paginationResult = <Pagination/>;
            if(this.state.projects.length > 0) {
                projectsOption = this.state.projects.map((project, i) => {
                    return (<option value={project.name} key={project.name}>{project.name}</option>)
                });
            }
            // console.log("*******dataFilters");console.log(this.state.dataFilters);
            filterProduct = <FilterProducts removeFilter={this.removeFilter} filteredHeaders={this.state.filteredHeaders} filtered={this.state.filters} filterComponent={this.filterComponent} tableHeaderS={this.state.tableHeaderS} dataFilters={this.state.dataFilters} loading={this.state.loading} />
        } else if(this.state.dataCode === dataCode.partSearchMultiCategory) {
            multiCAtegory = <MultiCategory category={this.state.multiCategory} cat={this.props.match.params.category} keyword={this.props.match.params.keyword} />
        } else if(this.state.dataCode === dataCode.partNotFound) {
            productsTble = <div className="margin-top-8 margin-bottom-8">
                <h2 className="text-center margin-top-4 margin-bottom-4">قطعه ای برای عبارت  {this.props.match.params.keyword} پیدا نشد</h2>
            </div>
        }
        //  table-responsive
        return(
            <div className="container text-center searchResultContainer">
               <div>
                <ClipLoader  sizeUnit={"px"} size={300} color={'#123abc'} loading={this.state.loading} />
               </div>
                {multiCAtegory}
                {filterProduct}
                {productsTble}
                {/*{paginationResult}*/}
                <Modal open={this.state.open} onClose={this.onCloseModal} center
                       classNames={{overlay: styles.customOverlay, modal: styles.customModal,}}>
                  <div className="select-project">
                    <h3 className="text-center"> انتخاب پروژه</h3>
                    <br/>
                    <div className="col-lg-4 col-md-6 col-sm-10 horizontal-center">
                        <select className="form-control" value={this.state.projectName}  onChange={this.selectChange}>
                            <option value={null}>-</option>
                            {projectsOption}
                        </select>
                    </div>
                    <br/>
                    <button onClick={()=> this.addToCart(this.state.productName, this.state.priceBuf, this.state.number)} className="btn btn-success horizontal-center">اضافه به سبد خرید</button>
                    <br/>
                  </div>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (productName,number,price,projectName) => dispatch(actions.addToCart(productName,number,price,projectName)),
    };
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(showSearchProductResult));