import React , {Component} from 'react';

class ProductBuy extends Component {
    state = {
        number: 0
    }

    componentDidMount() {
        this.setState({number: this.props.minimum_quantity});
    }

    numberChange = (e) => {
        // console.log(e);
        this.setState({number: parseInt(e.target.value)});
    }

    render() {
        return (
            <div>
                <p style={{fontSize: "20px"}}>حداقل تعداد : {this.props.minimum_quantity}</p>
                <p style={{fontSize: "20px"}}>قیمت : {this.props.unit_price} تومان</p>
                <div className="flex-row">
                    <input type="number" className="form-control col-md-4 col-sm-5" name="email" value={this.state.number} onChange={this.numberChange}
                           placeholder="0"/>
                    <button onClick={() => this.props.onOpenModal(this.props.productName, this.state.number, this.props.unit_price)} className="btn btn-success margin-right-1">خرید</button>
                </div>
                <p style={{fontSize: "20px", direction: "ltr"}}>{this.state.number} * {this.props.unit_price} = {parseInt(this.state.number)*parseInt(this.props.unit_price)}</p>
            </div>
        )
    }
}

export default ProductBuy;