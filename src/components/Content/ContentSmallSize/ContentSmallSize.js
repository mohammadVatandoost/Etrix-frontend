import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import './ContentSmallSize.css';
import {Helmet} from "react-helmet";

class ContentSmallSize extends Component {
    render() {
        const link = "/magazine/"+this.props.id+"/"+this.props.title.replace(" ","-");
        return (
          <article className="ContentSmallSize">
              <Link to={link}>
              <figure>
               <img  height="225px" width="100%" src={this.props.image} alt={this.props.title} />
               <figcaption style={{right: 0}}>{this.props.category}</figcaption>
              </figure>
              <div>
               <h3>{this.props.title}</h3>
               <p>{this.props.abstract}</p>
               <span><time>{this.props.days} روز</time></span>
              </div>
              </Link>
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
                              "headline": `+this.props.title+`,
                              "image": [
                                  `+this.props.image+`
                              ],
                              "datePublished": `+this.props.created_at+`,
                              "dateModified": `+this.props.updated_at+`,
                              "author": {
                                  "@type": "Person",
                                  "name": `+this.props.author+`
                              },
                              "publisher": {
                                  "@type": "Organization",
                                  "name": "Etrix",
                                  "logo": {
                                      "@type": "ImageObject",
                                      "url": "https://google.com/logo.jpg"
                                  }
                              },
                              "description": `+this.props.abstract+`
                          }`
                      }
                  </script>
              </Helmet>
          </article>
        )
    }
}

export default ContentSmallSize;