import React, {Component} from 'react';
import Step from './Step/Step';
import './StepProcess.css';

class StepProcess extends Component {


    render() {
        let steps;
        if(parseInt(this.props.number) === 1) {
            steps = <ul className="nav process-model more-icon-preocess" role="tablist">
                <Step active="process-model-active" text="سبد خرید" icon="fa fa-shopping-basket"/>
                <Step active="" text="اطلاعات ارسال" icon="fa fa-truck"/>
                <Step active="" text="پرداخت"  icon="fa fa-credit-card-alt"/>
            </ul>;
        } else if(parseInt(this.props.number) === 2) {
            steps = <ul className="nav process-model more-icon-preocess" role="tablist">
                <Step active="process-model-active" activeAfter="active-after" text="سبد خرید" icon="fa fa-shopping-basket"/>
                <Step active="process-model-active" text="اطلاعات ارسال" icon="fa fa-truck"/>
                <Step active="" text="پرداخت"  icon="fa fa-credit-card-alt"/>
            </ul>;
        } else {
            steps = <ul className="nav process-model more-icon-preocess" role="tablist">
                <Step active="process-model-active" text="سبد خرید" activeAfter="active-after" icon="fa fa-shopping-basket"/>
                <Step active="process-model-active" text="اطلاعات ارسال" activeAfter="active-after2" icon="fa fa-truck"/>
                <Step active="process-model-active" text="پرداخت"  icon="fa fa-credit-card-alt"/>
            </ul>;
        }
        return (
            <section className="design-process-section" id="process-tab" style={{direction: 'rtl'}} >
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 margin-auto">
                            {steps}
                        </div>
                    </div>
                </div>
            </section>
          )
    }
}

export default StepProcess;