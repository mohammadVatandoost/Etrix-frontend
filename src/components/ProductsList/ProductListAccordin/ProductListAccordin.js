import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import URLs from '../../../URLs';
import "./ProductListAccordin.css";
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import { ClipLoader } from 'react-spinners';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import VideoContent from "../../Content/VideoContentContainer/VideoContentContainer";

class ProductListAccordin extends Component {
    state = {
        category: [], loading: true
    }

    componentDidMount() {
        let url = URLs.base_URL + URLs.get_products_category;
        axios.get(url)
            .then(response => {
                console.log("componentDidMount Navigation");
                console.log(response);
                this.setState({category: response.data, loading: false });
            })
            .catch(err => {
                console.log("componentDidMount Navigation");console.log(err);
            });
    }

    render() {

        let categories = this.state.category.map((item) => {
            if(!( (item.product === "Boxes Enclosures Racks") || (item.product === "Cable Assemblies Coaxial Cables RF") ||
                    (item.product === "Cables Wires") || (item.product === "Connectors Interconnects") ||
                    (item.product === "Fans Thermal Management Thermal Heat Sinks") ||
                    (item.product === "Hardware Fasteners Accessories Board Supports") || (item.product === "Industrial Automation and Controls Machine Safety Light Curtains") ||
                    (item.product === "Industrial Controls Time Delay Relays") || (item.product === "Maker DIY Educational Wearables") ||
                    (item.product === "Power Supplies Board Mount") || (item.product === "Power Supplies External Internal Off Board") ||
                    (item.product === "Relays Solid State Relays") || (item.product === "Development Boards Kits Programmers") ||
                    (item.product === "Static Control ESD Clean Room Products Static Control Clothing") || (item.product === "Test and Measurement") ||
                    (item.product === "Switches Slide Switches") || (item.product === "Switches Toggle Switches") ||
                    (item.product === "Tools") || (item.product === "Uncategorized Miscellaneous")
                    || (item.product === "Line Protection Distribution Backups Power Distribution Surge Protectors")
                ) ) {
                let subcategory1;let subcategory2 = null;
                if (Object.keys(item.category).length > 0) {
                    let temp = Object.keys(item.category).map((property, j) => {
                        let tempLastCategory = null;
                        if (item.category[property].length > 0) {
                            tempLastCategory = item.category[property].map(subcategory => {
                                return (
                                    <li>
                                        <Link to={"/search/category="+item.product+"&subcategory="+subcategory}>{subcategory}</Link>
                                    </li>
                                )
                            });
                            if (tempLastCategory !== null) {
                                console.log('give subctegory if');
                                subcategory2 = <ul>
                                    {tempLastCategory}
                                </ul>
                            }
                        }
                        // else  {
                        //     console.log("else3");
                        //     console.log(subcategory1)
                        //     tempLastCategory = item.category[property].map(subcategory => {
                        //         return (
                        //             <li>
                        //                 <Link to={"/search/category="+item.product}>{subcategory}</Link>
                        //             </li>
                        //         )
                        //     });
                        //     if (tempLastCategory !== null) {
                        //         subcategory2 = <ul>
                        //             {tempLastCategory}
                        //         </ul>
                        //     }
                        //
                        // }
                        if (subcategory2 !== null) {
                            return (
                                <li>
                                    {property}
                                    {subcategory2}
                                </li>
                            )
                        }
                        if(!(property === "Surge Suppression ICs"))
                        return (
                            <li>
                                <Link to={"/search/category="+item.product+"&subcategory="+property}>{property}</Link>
                            </li>
                        )
                    });
                    if (temp !== null) {
                        subcategory1 = <ul>
                            {temp}
                        </ul>
                    }

                    if(temp === "") {
                        subcategory2 = <ul>

                        </ul>
                    }
                }



                return (
                        <AccordionItem>
                            <AccordionItemTitle>
                                <h2>{item.product}</h2>
                            </AccordionItemTitle>
                            <AccordionItemBody>
                               {subcategory1}
                            </AccordionItemBody>
                        </AccordionItem>
                )
            }
        });
        return (
            <div>
                <div className="text-center container">
                    <ClipLoader size="200" color={'#123abc'} loading={this.state.loading} />
                </div>

                <Accordion>
                    {categories}
                </Accordion>
           </div>
        )
    }
}

export default ProductListAccordin;