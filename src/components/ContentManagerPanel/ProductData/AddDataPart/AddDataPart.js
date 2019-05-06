import React , {Component} from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import InlineError from '../../../messages/InlineError';
import URLs from '../../../../URLs';
import { connect } from 'react-redux';

class AddDataPart extends Component {
    state = {
        commons: {},
        separate: {},
        website: 'Ickala',
        map_name: '',
        loading: false,
        errors: {},
        category: [], chosenCategory: null
    }

    componentDidMount() {
        this.getProductsCategory();
    }

    validate = (data) => {
        const errors = {};
        if (!data.partName) errors.partName = "Can't be blank";
        if (!data.count) errors.count = "Can't be blank";
        if (!data.dataSheet) errors.dataSheet = "Can't be blank";
        if (!data.imagePart) errors.imagePart = "Can't be blank";

        return errors;
    }

    onChange = e =>
        this.setState({ [e.target.name]: e.target.value });

    onChangeFile = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.files[0] }
        });

    sendData = (event) => {
        event.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            const fd = new FormData();
            fd.append('partName',this.state.data.partName);
            fd.append('count',this.state.data.count);
            fd.append('dataSheet',this.state.data.dataSheet);
            fd.append('imagePart',this.state.data.imagePart);
            console.log('this.state.data : ');
            console.log(this.state.data);
            // let headers = {
            //     'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI4OWUzNTI1NDA4MzI3ZGNmNTI1YjAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTIyMDkxNTcxfQ.qXaRtkUsRd6zBxT9Fzwj1BpmGE-0OIQ1nZxfpN82y-M'
            // };
            let axiosConfig = {
                headers: {
                    'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI4OWUzNTI1NDA4MzI3ZGNmNTI1YjAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTIyMDkxNTcxfQ.qXaRtkUsRd6zBxT9Fzwj1BpmGE-0OIQ1nZxfpN82y-M'
                }
            };
            console.log('fd : ');
            console.log(fd);
            axios.post('http://localhost:4000/admin/addPart', this.state.data , axiosConfig )
                .then((req,res) => {
                  console.log(req);
                    if(req.data) {
                        console.log('redirect');
                    }
                    this.setState({loading: false});
                })
                .catch((error)=> {
                    this.setState({loading: false});
                    console.log('error');
                    console.log(error);
                });
        }

    };

    getProductsCategory = () => {
        let url = URLs.base_URL + URLs.get_products_category;
        axios.get(url)
            .then(response => {
                console.log("componentDidMount AddData part get category");
                console.log(response);
                this.setState({category: response.data});
            })
            .catch(err => {
                console.log("componentDidMount AddData part get category");console.log(err);
            });
    };

    selectChange = (event) => {
        let temp = event.target.value;
        if(temp !== 'لطفا نوع محصول را انتخاب کنید') {
            this.setState({chosenCategory: temp});
            axios.post(URLs.base_URL+URLs.get_category_columns+temp,{token: this.props.token})
                .then(response => {
                    console.log("SetFactorInfo get_category_columns ");console.log(response);
                    this.setState({separate: this.replaceDashwithNullValue(response.data.separate), commons: this.replaceDashwithNullValue(response.data.commons)});
                })
                .catch(err => {
                    console.log("SetFactorInfo get_category_columns")
                    console.log(err);
                });
        }

    };

    replaceDashwithNullValue = (data) => {
        let temp = {};
        Object.keys(data).map((property) => {
            if(property === 'original') {
                temp[property] = '1';
            } else if(data[property] === '') {
                temp[property] = '-';
            } else {
                temp[property] = data[property];
            }
        });
        console.log(temp);
        return temp;
    }

    addProduct = () => {
        axios.post(URLs.base_URL+URLs.add_product,{commons: this.state.commons, separate: this.state.separate, website: this.state.website, map_name: this.state.map_name})
            .then(response => {
                console.log("SetFactorInfo  addProduct error");console.log(response);
            })
            .catch(err => {
                console.log("SetFactorInfo addProduct error")
                console.log(err);
            });
    }

    onChangeCommons = (e) => {
        this.setState({
            commons: { ...this.state.commons, [e.target.name]: e.target.value }
        });
    };

    onChangeSeparate = (e) => {
        this.setState({
            separate: { ...this.state.separate, [e.target.name]: e.target.value }
        });
    };

    render() {
        const { data, errors, loading } = this.state;
        let category, commons, separate, websiteName, mapName;
        if(this.state.category.length > 0) {
            category = this.state.category.map((item,i) => {
              if(Object.keys(item.category).length > 0) {
                  let temp = Object.keys(item.category).map((property, j) => {
                      if(item.category[property].length>0) {
                          let temp2 =  item.category[property].map((subcategory,t)=> {
                              return <option key={i+j+t} value={item.product +"*"+ property+" "+subcategory}>{item.product + " " + property+" "+subcategory}</option>;
                          });
                          return temp2;
                      } else {
                          return <option key={i+j} value={item.product +"*"+ property}>{item.product + " " + property}</option>;
                      }
                  });
                  return temp;
              } else {
                  return <option key={i} value={item.product}>{item.product}</option>;
              }
            })
        }

        if(Object.keys(this.state.commons).length) {
           commons = Object.keys(this.state.commons).map((property, i) => {
               return  <div className="form-group" key={i}>
                   <label className="text-right" >{property}</label>
                   <input name={property} value={this.state.commons[property]} onChange={this.onChangeCommons} type="text" className="form-control-file"/>
               </div>
           })
        }
        if(Object.keys(this.state.separate).length) {
            separate = Object.keys(this.state.separate).map((property, i) => {
                return  <div className="form-group" key={i}>
                    <label className="text-right" >{property}</label>
                    <input name={property} value={this.state.separate[property]} onChange={this.onChangeSeparate} type="text" className="form-control-file"/>
                </div>
            })

            websiteName = <div className="form-group">
                <label className="text-right" >نام سایت</label>
                <input name="website" value={this.state.website} onChange={this.onChange} type="text" className="form-control-file"/>
            </div>;

            mapName = <div className="form-group">
                <label className="text-right" >نام قطعه در سایت دیگر</label>
                <input name="map_name" value={this.state.map_name} onChange={this.onChange} type="text" className="form-control-file"/>
            </div>;
        }
        return (
          <div className="container">
            <br/>
              <div className="form-group">
                  <select name="category" value={this.state.chosenCategory} onChange={this.selectChange}>
                      <option value={null}>لطفا نوع محصول را انتخاب کنید</option>
                      {category}
                  </select>
              </div>
            <br/>
            <form className="text-right">
                <h2 className="text-center">Commons</h2>
                {commons}
                <br/>
                <h2 className="text-center">Separate</h2>
                {separate}
                <br/>
                <h2 className="text-center">Others</h2>
                {websiteName}
                {mapName}
                <button hidden={loading} onClick={this.addProduct} type="button" className="btn btn-primary">Send</button>
                <ClipLoader color={'#123abc'} loading={loading} />
            </form>
          </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps,null)(AddDataPart);
