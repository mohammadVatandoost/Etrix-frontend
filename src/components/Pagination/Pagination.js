import React , {Component} from 'react';

class Pagination extends Component {
    render() {
        return (
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">قبلی</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">بعدی</a></li>
            </ul>
        )
    }
}

export default Pagination;