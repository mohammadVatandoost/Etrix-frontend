import React, {Component} from 'react';
import Step from './Step/Step';
import './StepProcess.css';

class StepProcess extends Component {


    render() {
        let steps;
        if(parseInt(this.props.number) === 1) {
            steps = <ul className="nav process-model more-icon-preocess" role="tablist">
                <Step active="process-model-active" text="سبد خرید" icon="fa-search"/>
                <Step active="" text="اطلاعات ارسال"  icon="fa-search"/>
                <Step active="" text="پرداخت"  icon="fa-search"/>
            </ul>;
        } else if(parseInt(this.props.number) === 2) {
            steps = <ul className="nav process-model more-icon-preocess" role="tablist">
                <Step active="process-model-active" text="سبد خرید" icon="fa-search"/>
                <Step active="process-model-active" text="اطلاعات ارسال"  icon="fa-search"/>
                <Step active="" text="پرداخت"  icon="fa-search"/>
            </ul>;
        } else {
            steps = <ul className="nav process-model more-icon-preocess" role="tablist">
                <Step active="process-model-active" text="سبد خرید" icon="fa-search"/>
                <Step active="process-model-active" text="اطلاعات ارسال"  icon="fa-search"/>
                <Step active="process-model-active" text="پرداخت"  icon="fa-search"/>
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