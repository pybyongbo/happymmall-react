import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss'

import MUtil from 'util/mm.jsx';
import Statistic from 'service/stattistic-service.jsx';

import PageTitle from 'component/page-title/index.jsx';

const _mm = new MUtil();
const _statistic = new Statistic();


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount: '-',
            productCount: '-',
            orderCount: '-'
        }
    }

    componentDidMount(){
        this.loadCount();
    }

    loadCount(){
        _statistic.getHomeCount().then((res)=>{
            console.log(res);
            this.setState(res)
        },(err)=>{
            _mm.errTips()
        })
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页" gobackUrl="/" gobackTitle=""/>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/product" className="color-box blue">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/order" className="color-box green">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }

}

export default Home;