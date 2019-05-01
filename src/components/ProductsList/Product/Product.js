import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';
import URLs from '../../../URLs';
import dataCode from '../../../dataCode';
import ProductBuy from './ProductBuy/ProductBuy';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import Comment from '../../Comments/Comments';
import Modal from 'react-responsive-modal';
import './Product.css';
import styles from '../../showSearchProductResult/custom-styling.css';
import * as actions from '../../../store/actions/index';
import Loading from '../../Loading/Loading'


class Product extends Component {
    state = {
        searchKey: '', data: '', dataParts: [], dataCode: '', dataFilters: [],open: false, price: 2000, projects: [],
        tableHeaderS: '', productNum: 1, loading: true, number: 1,loadingAddCart: true,productName: '', category: {},
        projectName: null, priceBuf: 0
    }

    componentDidMount() {
        // http://localhost:80/api/search-part-comp?category=all&keyword=STM32F103C8T6TR
        let url = URLs.base_URL+"/search-part-comp?category=all&keyword="+this.props.match.params.keyword;
        axios.get(url)
            .then(response => {
                console.log("componentDidMount Product");
                console.log(response);
                console.log(url);
                if(parseInt(response.data[0]) === dataCode.partSearch) {
                    // console.log("IS EQUAL");
                    this.setState({dataCode: response.data[0],dataParts: response.data[2],dataFilters: response.data[3],tableHeaderS: response.data[5], category: response.data[6]});
                }
                this.setState({loading: false});
            })
            .catch(err => {
                console.log("componentDidMount searchKey");console.log(err);
            });

        if(this.props.token) { this.getProjects(); }
    }

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

    onOpenModal = (productName, number, price) => {
        if(this.props.token) {
            this.setState({open: true});
            this.setState({productName: productName, number: number, priceBuf: price});
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

    render() {
        let tableData, briefInfo, productFiles, productBuy;
        // console.log("product render");console.log(this.state.dataParts);

        if(this.state.dataParts.length > 0) {
          if(Object.keys(this.state.dataParts[0]).length>0) {
              let eachData = Object.keys(this.state.dataParts[0]).map((property,i)=> {
                  if( !((property === "description") || (property === "manufacturer") || (property === "id") || (property === "manufacturer_part_number") || (property === "minimum_quantity") || (property === "unit_price") || (property === "datasheet") || (property === "footprint") || (property === "ld_image") || (property === "quantity_available") || (property === "hd_image") || (property === "slug") || (property === "name") || (property === "type") || (property === "original") || (property === "part_status") || (property === "persian_name"))) {
                      return (<tr key={i}>
                          <td>{property.split("_").join(" ")}</td>
                          <td>{this.state.dataParts[0][property]}</td>
                      </tr>);
                  }
              });
              productFiles = <div className="col-md-4 col-sm-6">
                  <div style={{margin: "auto",display: "block", float: "right"}}>
                      <img width="100" height="100" src={URLs.images_URL+this.state.dataParts[0]["ld_image"]} alt={this.state.dataParts[0]["manufacturer"]}/>.
                      <br/><br/>
                      {/*<div className="flex-row space-between">*/}
                          {/*<span><b>دیتاشیت : </b></span>*/}
                          {/*<Link to=""><i className="fa fa-file-text" aria-hidden="true"></i></Link>*/}
                      {/*</div>*/}
                  </div>
              </div>;
              briefInfo = <div className="col-md-8 col-sm-6" style={{textAlign: "right"}}>
                  <h5>سازنده</h5>
                  <p>{this.state.dataParts[0]["manufacturer"].split("_").join(" ")}</p>
                  <h5>نوع محصول</h5>
                  <p>{this.state.category.name}</p>
                  <h5>توضیحات</h5>
                  <p>{this.state.dataParts[0]["description"]}</p>
              </div>;
              tableData = <div className="col-md-8 col-sm-12">
                  <br/>
                  <h2 className="text-center">مشخصات فنی محصول</h2>
                  <table className="table table-striped">
                      <tbody>
                      {eachData}
                      </tbody>
                  </table>
              </div>;
              productBuy = <ProductBuy productName={this.props.match.params.keyword} onOpenModal={this.onOpenModal}  unit_price={this.state.dataParts[0]["unit_price"]} minimum_quantity={this.state.dataParts[0]["minimum_quantity"]} />
          }
        }
        let projectsOption;
        if(this.state.projects.length > 0) {
            projectsOption = this.state.projects.map((project, i) => {
                return (<option value={project.name} key={project.name}>{project.name}</option>)
            });
        }


        return (

            <div className="container product">
                <br/><br/>

                <h1 className="text-center">{this.props.match.params.keyword}</h1>
                    <ClipLoader size="200" color={'#123abc'} loading={this.state.loading} />
                <br/>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                       <br/>
                       <div className="row">
                           {productFiles}
                           {briefInfo}
                       </div>
                       <br/>
                    </div>
                    <div className="col-md-6 col-sm-12" style={{textAlign: "right"}}>
                        {productBuy}
                    </div>
                </div>
                <hr/>
                <div className="row">
                    {tableData}
                    <div  className="col-md-4 col-sm-12">

                    </div>
                </div>
                <br/><br/>
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
                {/*<Comment/>*/}
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

export default connect(mapStateToProps,mapDispatchToProps)(Product);
