import  React from 'react';
import {Link} from 'react-router-dom';


import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'component/pagination/index.jsx';
import TableList from 'component/table-list/index.jsx';
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
            pageSize: 10,
            total:0,
            listType:'list'
        }
        this.onPageNumChange = this.onPageNumChange.bind(this);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    componentDidMount(){
        this.loadProductList();
    }
    loadProductList(){
        let param = {
            pageNum:this.state.pageNum,
            pageSize:this.state.pageSize,
            listType:this.state.listType
        }
        if(this.state.listType === 'search') {
            param.searchType = this.state.searchType;
            param.keyword = this.state.searchKeyword;
        }
        _product.getProductList(param).then((res)=>{
            this.setState({
                list:res.list,
                total:res.total
            })
        },(err)=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(err);
        })
    }

    onPageNumChange(pageNum){
        console.log(pageNum)
        this.setState({
            pageNum
        },()=>{
            this.loadProductList();
         })
    }

    onShowSizeChange(current,pageSize){
        console.log(pageSize);
        this.setState({ 
            pageSize:pageSize,
            pageNum:1
         },()=>{
            this.loadProductList();

         });

      }

    // onShowSizeChange (pageSize) {
    //     console.log(pageSize);
    //     this.setState({
    //         pageSize,
    //         pageNum:1
    //     },()=>{
    //         this.loadProductList();
    //     })
    //     // this.setState({ pageSize });
    // }

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

    onSetProductStatus(id,status){

        let newStatus = status==1?2:1,
        confirmTips = status ==1 ?'确认要下架改商品':'确认要上架该商品';

        _mm.comfirmDialog(confirmTips,()=>{
            _product.setProductStatus({
                productId:id,
                status:newStatus
            }).then((res)=>{
                _mm.successTips(res.data);
                this.loadProductList();
            },(err)=>{
                _mm.errTips(err);
            })
        }) 
    }

    render() {
        let list = this.state.list,
            firstLoading = this.state.firstLoading,
            pageNum = this.state.pageNum,
            total = this.state.total,
            tableHeads = [
                {
                    name: '商品ID',
                    width: '10%'
                },
                {
                    name: '商品名称',
                    width: '50%'
                },
                {
                    name: '价格',
                    width: '10%'
                },
                {
                    name: '状态',
                    width: '15%'
                },
                {
                    name: '操作',
                    width: '15%'
                }
            ],
            listBody = list.map((product, index) => {
                return (
                    <tr key={index}>
                        <td>{product.id}</td>
                        <td>
                            <p>{product.name}</p>
                            <p>{product.subtitle}</p>
                        </td>
                        <td>{product.price}元</td>
                        <td>
                            <button className="btn btn-sm btn-warning" onClick={() => {
                                    this.onSetProductStatus(product.id, product.status)
                                }}>
                                {product.status == 1 ? '在售' : '已下架'}
                            </button>
                        </td>
                        <td>
                            <Link className="btn btn-sm btn-info opera" to={`/product/detail/${product.id}`}>查看</Link>
                            <Link className="btn btn-sm btn-primary opera" to={`/product/save/${product.id}`}>编辑</Link>
                        </td>
                    </tr>
                );
            }),
            onSearch = (searchType, searchKeyword) => {
                this.onSearch(searchType, searchKeyword);
        }
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"/>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                {/* <ListSearch onSearch={onSearch}/> */}
                <TableList tableHeads={tableHeads}>
                    {listBody}
                </TableList>
                <div style={{float:'right'}}>
                <Pagination 
                    current={pageNum} 
                    total={total} 
                    onShowSizeChange={this.onShowSizeChange} 
                    onChange={this.onPageNumChange} 
                />
                </div>
            </div>
        );
    }
}

export default ProductList;