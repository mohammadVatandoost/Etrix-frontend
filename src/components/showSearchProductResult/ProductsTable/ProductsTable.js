import React, { Component } from 'react';
import SearchedProductPrice from '../SearchedProductPrice/SearchedProductPrice';
import URLs from "../../../URLs";
import AuxWrapper from '../../AuxWrapper/AuxWrapper';
import './ProductsTable.css';
import { Link } from 'react-router-dom';

class ProductsTable extends Component {

    constructor(props) {
        super(props)
        this.myRefTableFix = React.createRef();   // Create a ref object ;
        this.myRefScroll = React.createRef();
        this.myRefTable = React.createRef();
    }


    state = {
        showFixedHeader: false, scrollDivPositinFixed: true, initialLeft: 0
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
        let tableScroll = document.getElementById('tableScroll');
        // console.log("************************************************");console.log(tableScroll.scrollLeft);
        this.setState({initialLeft: tableScroll.scrollLeft});
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('table-header');
        const pagination = document.getElementsByClassName('pagination')[0];
        const tableBody = document.getElementById('table-body');
        let searchResultTable = document.getElementById('search-result-table');
        let tableScroll = document.getElementById('tableScroll');
        let tableFix1 = document.getElementById('tableFix1');

        // console.log('tableBody');console.log(tableBody.getBoundingClientRect().bottom);
        // console.log('window.innerHeight');console.log(window.innerHeight);
        // console.log('window.scrollY');console.log(window.scrollY);
        // console.log('pagination');console.log(pagination.getBoundingClientRect().bottom);
        // console.log("table fixed header");console.log(this.myRefTableFix.scrollLeft);
        // console.log("table fixed scroll");console.log(this.myRefScroll.scrollLeft);
        console.log("searchResultTable");console.log(this.refs.myRefTable);
        // console.log("wrappedElement");
        // console.log('searchResultTable');console.log(searchResultTable.scrollLeft);
        // console.log('tableHeader');console.log(tableHeader.scrollLeft);
        console.log('tableScroll');console.log(tableScroll.scrollLeft);
        // this.refs.myRefTable.scrollLeft = 100 ;
        // searchResultTable.scrollLeft = 100;
        // if(this.state.initialLeft !== tableScroll.scrollLeft) {
        //     this.setState({initialLeft: tableScroll.scrollLeft});
        //     searchResultTable.scrollLeft = tableScroll.scrollLeft;
        //     if(tableFix1 !== null) {
        //         tableFix1 = tableScroll.scrollLeft;
        //         // console.log('tableFix1');console.log(tableFix1.scrollLeft);
        //     }
        // }
        
        if (this.isBottom(wrappedElement)) {
            // console.log('header bottom reached');
            // document.removeEventListener('scroll', this.trackScrolling);
        }
        if(pagination.getBoundingClientRect().bottom < window.innerHeight) {
            // console.log('scrollDivPositinFixed: false');
            this.setState({scrollDivPositinFixed: false});
        }
    };

    isBottom = (el) => {
        // console.log('table header');console.log(el.getBoundingClientRect().bottom);
        // console.log('window.innerHeight');console.log(window.innerHeight);
        // console.log('window.scrollY');console.log(window.scrollY);
        if(0 > el.getBoundingClientRect().bottom) {
            this.setState({showFixedHeader: true});
            // console.log("showFixedHeader true");
        } else {
            this.setState({showFixedHeader: false});
            // console.log("showFixedHeader false");
        }
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    render() {

        let fixedHeader;
        let scrollDiv;
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

           

        // show fixed header table-responsive
        if(this.state.showFixedHeader) {
            console.log("this.state.showFixedHeader render true");
            fixedHeader = <div id="tableFix1" ref={this.myRefTableFix} className="stickyTableHeader">
                <table className="table table-striped table-custom-design table-sticky-header">
                    <thead>
                    <tr>{tableHeads}</tr>
                    </thead>
                </table>
            </div>;
        }

        if(this.state.scrollDivPositinFixed) {
            scrollDiv = <div id="tableScroll"  ref={this.myRefScroll} className="fl-scroll fl-scroll-position-fixed">
                <div></div>
            </div>
        } else {
            scrollDiv = <div id="tableScroll" ref={this.myRefScroll} className="fl-scroll">
                <div></div>
            </div>
        }
        return (
           <AuxWrapper>
            <table ref={this.myRefTable} id="search-result-table" className="table table-striped table-custom-design table1">
                <thead id="table-header">
                  <tr>{tableHeads}</tr>
                </thead>
                <tbody id="table-body" style={{direction: "ltr"}}>{dataParts}</tbody>
            </table>
               {fixedHeader}
               {scrollDiv}
           </AuxWrapper>
        )
    }
}

export default ProductsTable;

