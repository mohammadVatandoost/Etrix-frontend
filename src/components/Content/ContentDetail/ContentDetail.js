import React, { Component } from 'react';
import axios from 'axios';
import {convertFromRaw} from 'draft-js';
import {Link} from 'react-router-dom';
import CardWrapper from '../../CardWrapper/CardWrapper';
import ContentAuthor from "../ContentAuthor/ContentAuthor";
// import Comments from '../../Comments/Comments';
import {stateToHTML} from 'draft-js-export-html';
import URLs from '../../../URLs';
import './ContentDetail.css';
import {Helmet} from "react-helmet";

class ContentDetail extends Component {
    state = {
        article: '',
        brief: '',
        product: '',
        DraftEditor: null,
        temp: '',resource: '', author: ''
    }
    componentDidMount() {
        axios.post(URLs.base_URL+URLs.cm_get_content, { id: this.props.match.params.id})
            .then((res) => {
                console.log('get-content');
                console.log(res.data);
                console.log('brief');
                console.log(res.data[0]);
                console.log('text');
                console.log(res.data[1]);
                console.log('product');
                console.log(res.data[2]);
                this.setState({brief: res.data[0], resource: res.data[0].resource, author: res.data[0].author,
                    DraftEditor: res.data[1], product: res.data[2]});
                // this.setState({temp: res.data[0].detail.text});
                // const test = JSON.parse(res.data[0].detail.text);
                // const editorState = EditorState.createWithContent(
                //     convertFromRaw(res.data[0].detail.text)
                // );
                // console.log(convertFromRaw(res.data[0].detail.text));
                // this.setState({data: res.data[0], DraftEditor: res.data[0].detail.text});
            })
            .catch((error)=> {
                console.log('get-content error');
                console.log(error);
            });
        // axios.post('http://localhost:80/ariaelec/public/api/get-content', { id: 1004})
        //     .then((res) => {
        //         console.log('get-content 1004');
        //         console.log(res);
        //         // this.setState({temp: res.data[0].detail.text});
        //         // const test = JSON.parse(res.data[0].detail.text);
        //         // const editorState = EditorState.createWithContent(
        //         //     convertFromRaw(res.data[0].detail.text)
        //         // );
        //         // console.log(convertFromRaw(res.data[0].detail.text));
        //         // this.setState({data: res.data[0], DraftEditor: res.data[0].detail.text});
        //     })
        //     .catch((error)=> {
        //         console.log('get-content error');
        //         console.log(error);
        //     });
    }

    render() {
        let showTest2;
        console.log("EditorRaw");
        console.log(this.state.DraftEditor);
        if(this.state.DraftEditor !== null) {
            console.log("convertFromRaw");
            console.log(convertFromRaw(JSON.parse(this.state.DraftEditor)));
            showTest2 = <div dangerouslySetInnerHTML={{__html: stateToHTML(convertFromRaw(JSON.parse(this.state.DraftEditor)))}}/>;
        }
        // const data = this.state.data;
        // console.log("render : ");
        // let blockArray = convertFromRaw(this.state.temp);
        // console.log(convertFromRaw(this.state.temp));
        // console.log(this.state.DraftEditor);
        // const editor = stateToHTML(this.state.DraftEditor);  className="flex-row space-around content-detail"
        return (
          <div className="container"  ref={el => (this.instance = el)}>
              {/*<div className="flex-item-2 flex-column">*/}
                  {/*/!*<ContentSmallSize/>*!/*/}
                  {/*/!*<ContentSmallSize/>*!/*/}
                  {/*/!*<ContentSmallSize/>*!/*/}
              {/*</div>*/}
              <article className="articleContainer flex-item-11">
                  <CardWrapper>
                      <br/>
                      <h1 className="text-center">{this.state.brief.title}</h1>
                        {showTest2}
                      <br/>
                      <div className="text-center">
                        <a href={this.state.resource} style={{fontSize: "20px"}}>منبع</a>
                      </div>
                      <br/>
                      <hr/>
                      <br/>
                      <ContentAuthor author={this.state.author}/>
                  </CardWrapper>
              </article>
              <br/>
              <br/>
              <br/>
              <Helmet>
                  <script type="application/ld+json">
                      {`
                          {
                              "@context": "https://schema.org",
                              "@type": "NewsArticle",
                              "mainEntityOfPage": {
                                  "@type": "WebPage",
                                  "@id": "https://google.com/article"
                              },
                              "headline": `+this.state.brief.title+`,
                              "image": [
                                  `+this.state.brief.image+`
                              ],
                              "datePublished": `+this.state.brief.created_at+`,
                              "dateModified": `+this.state.brief.updated_at+`,
                              "author": {
                                  "@type": "Person",
                                  "name": `+this.state.brief.author+`
                              },
                              "publisher": {
                                  "@type": "Organization",
                                  "name": "Etrix",
                                  "logo": {
                                      "@type": "ImageObject",
                                      "url": "https://google.com/logo.jpg"
                                  }
                              },
                              "description": `+this.state.brief.abstract+`
                          }`
                      }
                  </script>
              </Helmet>
          </div>
        )
    }
};

export default ContentDetail;

