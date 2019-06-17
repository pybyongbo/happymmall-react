import React from 'react';

import Select from 'rc-select';
import RcPageination from 'rc-pagination';

import 'rc-pagination/dist/rc-pagination.min.css';
import 'rc-select/assets/index.css';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
    }
    render(){
        return (
            <RcPageination {...this.props} hideOnSinglePage showQuickJumper selectComponentClass={Select} showSizeChanger/>
        )
    }
}


export default Pagination;