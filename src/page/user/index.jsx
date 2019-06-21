import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';

import Pagination from 'component/pagination/index.jsx';
import TableList from 'component/table-list/index.jsx'

import Moment from 'moment';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            pageNum:1,
            pageSize:20,
            total:0
        }
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    componentDidMount(){
        this.loadUserList();
    }

    loadUserList(){

        let param = {
            pageNum:this.state.pageNum,
            pageSize:this.state.pageSize
        }
        _user.getUserList(param).then((res) => {
            this.setState({
                list:res.list,
                total:res.total
            });
        }, (err) => {
            this.setState({
                list: []
            })
            _mm.errTips(err);
        });
    }

    onPageNumChange(pageNum){
        this.setState({
            pageNum
        },()=>{
            this.loadUserList();
        })
    }
    onShowSizeChange(current,pageSize){
        console.log(pageSize);
        this.setState({ 
            pageSize:pageSize,
            pageNum:1
         },()=>{
            this.loadUserList();
         });
    }

    render(){
        let list = this.state.list,
        pageNum = this.state.pageNum,
        pageSize = this.state.pageSize,
        total = this.state.total,
        listBody = list.map((user,index)=>{
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{Moment(user.createTime).format('YYYY-MM-DD HH:mm:ss')}</td>

                </tr>
            )
        });

        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" gobackUrl="/" gobackTitle="返回首页"></PageTitle>
                <TableList tableHeads= {['用户ID','用户名','邮箱','电话','注册时间']}>
                    {listBody}
                </TableList>
                <div style={{float:'right'}}>
                    <Pagination current={pageNum} total={total} defaultPageSize={this.state.pageSize} onChange={(pageNum) => this.onPageNumChange(pageNum)} onShowSizeChange={this.onShowSizeChange} />
                </div>
            </div>
        )
    }

}

export default UserList;