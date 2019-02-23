import React , {Component} from 'react';
import axios from 'axios';
import ContentSmallSize from '../ContentSmallSize/ContentSmallSize';
import './ContainerSmallSize.css';
import URLs from '../../../URLs';
import { isArray } from '../../../store/utility';
import { ClipLoader } from 'react-spinners';

class ContainerSmallSize extends Component {
    state = {
        contents: [], lastConetent: true, loading: true,
        counter: 0
    }
    componentDidMount() {
        axios.post(URLs.base_URL+URLs.home,{ num: 0})
            .then((res) => {
                console.log('res ContainerSmallSize');
                console.log(res);
                let lasteConternt = false;
                if(res.data.length < 10) {
                    lasteConternt = true;
                }
                this.setState({contents: res.data, lastConetent: lasteConternt, loading: false});
            })
            .catch((error)=> {
                console.log('error');
                console.log(error);
            });
    }

    moreContent = () => {
        let counter = this.state.counter;
        counter = counter + 1 ;
        this.setState({counter: counter, loading: true});
        axios.post(URLs.base_URL+URLs.get_more_content, { num: counter})
            .then((res) => {
                console.log('res moreContent');
                console.log(res);
                let temp = this.state.contents;
                if(isArray(res.data)) {
                    let lasteConternt = this.state.lastConetent;
                    if(res.data.length < 5) {
                        lasteConternt = true;
                    }
                    this.setState({contents: temp.concat(res.data), lastConetent: lasteConternt, loading: false});
                }
            })
            .catch((error)=> {
                console.log('error');
                console.log(error);
            });
    }

    render() {
        const contentsBrief = this.state.contents.map((obj) => {
            return <ContentSmallSize updated_at={obj.updated_at}  created_at={obj.created_at} author={obj.author} id={obj.id} abstract={obj.abstract} category={obj.category} days={obj.days} key={obj.id} image={obj.image} product={obj.product} title={obj.title} />
        });
        let moreButton;
        if(this.state.lastConetent === false) {
            moreButton = <div>
                <button hidden={this.state.loading} onClick={this.moreContent} className="btn btn-primary"> بیشتر... </button>
                <ClipLoader sizeUnit={"px"} size={150} color={'#123abc'} loading={this.state.loading} />
            </div>
        }
        return (
         <div className="text-center" style={{ marginTop: "1%"}}>
             <h1>مقالات</h1>
          <div className="containerSmallSize">
              {contentsBrief}
              <ClipLoader sizeUnit={"px"} size={300} color={'#123abc'} loading={this.state.loading} />
          </div>
          <br/>
             {moreButton}
          <br/>
          <br/>
         </div>
        )
    }
}

export default ContainerSmallSize;