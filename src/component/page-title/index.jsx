import React from 'react';
import { Route,Link, NavLink } from 'react-router-dom';
import './index.scss'
class PageTitle extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        document.title = this.props.title+'- HAPPY MMALL';
    }
    goBack(url){
        this.props.history.push(url);
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">
                        {this.props.title}
                    </h1>
                    {this.props.children}

                    <Link to={this.props.gobackUrl} className="goback">
                        {this.props.gobackTitle}
                    </Link>

                    {/* <Link to="/">Home</Link> */}

                    {/* <a href=""></a> */}
                </div>
            </div>
        );
    }
}

export default PageTitle;