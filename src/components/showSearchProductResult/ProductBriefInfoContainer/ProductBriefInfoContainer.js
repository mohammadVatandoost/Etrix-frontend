import React , {Component} from 'react';
import ProductBriefInfo from './ProductBriefInfo/ProductBriefInfo'

class ProductBriefInfoContainer extends Component {
    render() {
        let productBrief = this.props.products.map((product,i)=>{
            return (<ProductBriefInfo key={i} productInfo={product} />)
        });
        return (
            <div className="row">
                {productBrief}
            </div>
        )
    }
}

export default ProductBriefInfoContainer;