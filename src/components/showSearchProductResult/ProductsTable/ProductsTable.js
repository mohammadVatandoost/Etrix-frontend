import React, { Component } from 'react';
import SearchedProductPrice from '../SearchedProductPrice/SearchedProductPrice';
import URLs from "../../../URLs";
import './ProductsTable.css';
import { Link } from 'react-router-dom';

class ProductsTable extends Component {

    state = {
    }

    componentDidMount() {

    }

    render() {
        // dataTables
        let tableHeads = Object.keys(this.props.dataParts[0]).map((property) => {
            let temp = null;
            Object.keys(this.props.tableHeaderS).map((property2,i) => {
                if( (this.props.tableHeaderS[property2] === property) && (this.props.tableHeaderS[property2] !== "part_status")) {
                  if(property === "unit_price")  {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}>
                          <p>قیمت</p><button className="btn btnHoverGreen" style={{margin: '2px' }}
                                                                        onClick={() => {this.props.sort(property,'increase')}}>
                          <i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                          <button className="btn btnHoverRed" onClick={() => {this.props.sort(property,'increase')}}>
                              <i className="fa fa-arrow-down" aria-hidden="true"></i>
                          </button>
                      </th> ;
                  } else if(property === "ld_image") {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>عکس</p></th> ;
                  } else if(property === "datasheet") {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>دیتاشیت</p></th> ;
                  } else if(property === "manufacturer_part_number") {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>نام قطعه</p></th> ;
                  } else if(property === "quantity_available") {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}>
                          <p>تعداد موجود</p><button className="btn btnHoverGreen" style={{margin: '2px' }} onClick={() => {this.props.sort(property,'increase')}}>
                          <i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                          <button className="btn btnHoverRed" onClick={() => {this.props.sort(property,'increase')}}>
                              <i className="fa fa-arrow-down" aria-hidden="true"></i>
                          </button></th> ;
                  } else if(property === "manufacturer") {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>سازنده</p></th> ;
                  } else if(property === "description") {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>توضیح</p></th> ;
                  } else if(property === "packaging") {

                  } else if(property === "series") {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>سری قطعه</p></th> ;
                  } else if(property === "core_processor") {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>هسته پردازنده</p></th> ;
                  } else if(property === "speed") {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>سرعت</p></th> ;
                  } else if(property === "operating_temperature") {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>دمای کاری</p></th> ;
                  } else {
                      temp = <th style={{minWidth: '110px'  }} key={property+'1'}>
                          <p>{property.split("_").join(" ")}</p><button className="btn btnHoverGreen" style={{margin: '2px' }}
                                                                        onClick={() => {this.props.sort(property,'increase')}}>
                          <i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                          <button className="btn btnHoverRed" onClick={() => {this.props.sort(property,'increase')}}>
                              <i className="fa fa-arrow-down" aria-hidden="true"></i>
                          </button>
                      </th> ;
                  }
                }
                return null;
            });
            if(temp === null) {
                if( !((property === "packaging") || (property === "hd_image") || (property === "slug") || (property === "name") || (property === "type") || (property === "original") || (property === "part_status") || (property === "persian_name"))) {
                   if(property === "manufacturer") {
                       return (   <th key={property + '2'}><p>سازنده</p></th> );
                   } else if(property === "minimum_quantity") {
                       return (   <th key={property + '2'} style={{ minWidth: '110px'}}><p>حداقل تعداد قابل سفارش</p></th> );
                   } else {
                       return (   <th key={property + '2'}><p>{property.split("_").join(" ")}</p></th> );
                   }
                }
            } else {  return temp; }
        });
        // this.setInitialForPriceInput();
        let dataParts = this.props.dataParts.map((item, i) => {
            let entry = Object.keys(item).map((property, j) => {
                if(property === "unit_price") {
                    return ( <SearchedProductPrice key={property} unit_price={item['unit_price']} keyword={item['manufacturer_part_number']} category={this.props.category} openModal={this.props.onOpenModal} />)
                } else if(property === "ld_image") {
                    return ( <td key={property}><Link to={"/Product/"+item['manufacturer_part_number']}><img height="100" width="100" src={URLs.images_URL+item[property]} alt={item['manufacturer_part_number']} /></Link></td> )
                } else if(property === "datasheet") {
                    return ( <td key={property}><a href={URLs.datasheet_URL+item[property]}><i className="fa fa-file-text" aria-hidden="true"></i></a></td> )
                } else if(property === "manufacturer_part_number") {
                    return ( <td key={property}><Link to={"/Product/"+item['manufacturer_part_number']}>{item[property]}</Link></td> )
                } else if( !( (property === "packaging") || (property === "hd_image") || (property === "slug") || (property === "name")  || (property === "original") || (property === "part_status") || (property === "persian_name"))) {
                    return ( <td key={property}>{item[property]}</td> )
                }
            });
            return (
                <tr key={i}>{entry}</tr>
            );
        });
        return (
            <table className="table table-striped table-responsive table-fixed">
                <thead>
                <tr>{tableHeads}</tr>
                </thead>
                <tbody style={{direction: "ltr"}}>{dataParts}</tbody>
            </table>
        )
    }
}

export default ProductsTable;

