import  React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx'


import Moment from 'moment';

import './index.scss';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            list:[],
            pageNum:1,
            total:0,
            listType:'list'
        }
    }

    componentDidMount(){
        this.loadProductList();
    }

    loadProductList(){
        let param = {
            pageNum:this.state.pageNum,
            listType:this.state.listType
        }
        if(this.state.listType === 'search') {
            param.searchType = this.state.searchType;
            param.keyword = this.state.searchKeyword;
        }

        _product.getProductList(param).then((res)=>{
            console.log(res);
            this.setState(res.data);
        },(err)=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(err);
        })

    }

    onPageNumChange(pageNum){
        this.setState({
            pageNum:paageNum
        },()=>{
            this.loadProductList();
        })
    }

    onSearch(searchType,searchKeyword) {
        let listType = searchKeyword===''?'list':'search';
        this.setState({
            listType:listType,
            pageNum:1,
            searchType:searchType,
            searchKeyword:searchKeyword
        },()=>{
            this.loadProductList();
        })
    }



}