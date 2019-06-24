import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import TableList from 'component/table-list/index.jsx';
import ListSearch from './list-search.jsx';
import Moment from 'moment';

import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';

const _mm = new MUtil();
const _order = new Order()

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            pageSize:15,
            total: 0,
            listType: 'list'
        }
    }

    componentDidMount(){
        this.loadOrderList();
    }

    loadOrderList(){
        let param = {
            pageNum:this.state.pageNum,
            pageSize:this.state.pageSize,
            listType:this.state.listType
        }

        if(this.state.listType === 'search') {
            param.searchType = this.state.searchType;
            param.keyword = this.state.searchKeyword;
        }

        _order.getOrderList(param).then((res)=>{
            console.log(res);
            this.setState(res)
        },(err)=>{
            this.setState({
                list:[]
            });
            _mm.errTips(err)
        })
    }

    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadOrderList();
        })
    }

    onShowSizeChange(current,pageSize) {
        console.log(pageSize);
        this.setState({ 
            pageSize:pageSize,
            pageNum:1
         },()=>{
            this.loadOrderList();
         });
    }

    onSearch(searchType,searchKeyword){
        let listType = searchKeyword === ''?'list':'search';
        this.setState({
            listType:listType,
            pageNum:1,
            searchType:searchType,
            searchKeyword:searchKeyword
        },()=>{
            this.loadOrderList();
        })
    }

    statustoStr(status) {
        switch (status) {
            case 10:
              return <span className="label label-warning">未支付</span>
              break;
            case 0:
                return <span className="label label-danger">已取消</span>
                break;
            default:
                return <span className="label label-success">已支付</span>
        }
    }

    render(){
        let list = this.state.list,
        firstLoading = this.state.firstLoading,
        pageNum = this.state.pageNum,
        total= this.state.total,
        tableHeads = [
            {
                name:'订单号',
                width:'20%'
            },
            {
                name:'收件人',
                width:'40%'
            },
            {
                name:'订单状态',
                width:'10%'
            },
            {
                name:'订单总价',
                width:'15%'
            },
            {
                name:'创建时间',
                width:'15%'
            },
            {
                name:'操作',
                width:'15%'
            }
        ],
        listBody = list.map((order,index)=>{

            return (
                <tr key={index}>
                    <td>
                        <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                    </td>
                    <td>{order.receiverName || '--'}</td>
                    <td>{this.statustoStr(order.status)}</td>
                    {/* <td>{order.status==10?<span class="label label-warning">未支付</span>:<span class="label label-success">已支付</span>}</td> */}
                    <td>{order.payment}</td>
                    <td>{order.createTime}</td>
                    <td>
                        <Link className="btn btn-sm btn-info opera" to={`/order/detail/${order.orderNo}`}>查看</Link>
                    </td>
                </tr>
            )

        }),
        onSearch = (searchType,searchKeyword) =>{
            this.onSearch(searchType,searchKeyword)
        }
        
        return(
            <div id="page-wrapper" className="nobtn-wrapper">
                <PageTitle title="订单列表" gobackUrl="/" gobackTitle="返回首页"></PageTitle>
                <ListSearch onSearch={onSearch}/>
                <TableList tableHeads={tableHeads}>
                    {listBody}
                </TableList>
                <div style={{float:'right'}}>
                <Pagination 
                current={pageNum} 
                total={total} 
                pageSizeOptions={['15', '20', '30', '50']}
                defaultPageSize={this.state.pageSize}
                onChange={(pageNum)=>{this.onPageNumChange(pageNum)}}
                onShowSizeChange={(current,pageSize)=>this.onShowSizeChange(current,pageSize)}
                />
                </div>
               
            </div>
        )
    }

}

export default OrderList;