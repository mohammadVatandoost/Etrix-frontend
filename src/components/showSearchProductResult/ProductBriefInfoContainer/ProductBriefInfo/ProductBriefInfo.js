import React , {Component} from 'react';
import URLs from '../../../../URLs';
import './ProductBriefInfo.css';

class ProductBriefInfo extends Component {
    render() {
        return (
            <div className="col-lg-3 col-md-4 col-sm-12 row productBriefInfo" style={{marginTop: '1%'}}>
                <div className="col-md-8 col-sm-8">
                    <h4>{this.props.productInfo.manufacturer_part_number}</h4>
                    <p>{this.props.productInfo.description}</p>
                </div>
                <div className="col-md-4 col-sm-4">
                    <img src={URLs.images_URL+this.props.productInfo.ld_image} alt={this.props.productInfo.ld_image} />
                </div>
            </div>
        )
    }
}

export default ProductBriefInfo;