import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import URLs from '../../../URLs';
import dataCode from '../../../dataCode';
import ProductBuy from './ProductBuy/ProductBuy';
import Comment from '../../Comments/Comments';
import './Product.css';

class Product extends Component {
    state = {
        searchKey: '', data: '', dataParts: [], dataCode: '', dataFilters: [],open: false, price: 2000, projects: [],
        tableHeaderS: '', productNum: 1, loading: true, number: 1,loadingAddCart: true,productName: '', category: {},
        projectName: null
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
            })
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
              tableData = <div className="col-md-6 col-sm-12">
                  <hr/>
                  <br/>
                  <h2 className="text-center">مشخصات فنی محصول</h2>
                  <table className="table table-striped">
                      <tbody>
                      {eachData}
                      </tbody>
                  </table>
              </div>;
              productBuy = <ProductBuy unit_price={this.state.dataParts[0]["unit_price"]} minimum_quantity={this.state.dataParts[0]["minimum_quantity"]} />
          }
        }
        return (
            <div className="container product">
                <br/><br/>
                <h1 className="text-center">{this.props.match.params.keyword}</h1>
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
                <div className="row">
                    {tableData}
                    <div  className="col-md-6 col-sm-12">

                    </div>
                </div>
                <br/><br/>
                {/*<Comment/>*/}
            </div>
        )
    }
}

export default Product;