import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Order {

    //订单列表
    getOrderList(param){

        let url = '',
        data = {};
        data.pageNum = param.pageNum;
        data.pageSize = param.pageSize;
        if(param.listType === 'list'){
            url= '/manage/order/list.do';
        } else if(param.listType === 'search') {
            url ='/manage/order/search.do';
            data[param.searchType] = param.keyword;
        }

        return _mm.request({
            type:'post',
            url:url,
            data:data
        })
    }

    //获取订单详情
    getOrder(orderNo){
        return _mm.request({
            type:'post',
            url:'/manage/order/detail.do',
            data:{
                orderNo:orderNo
            }
        })
    }

    //订单发货
    sendGoods(orderNo){
        return _mm.request({
            type:'post',
            url:'/manage/order/send_goods.do',
            data:{
                orderNo:orderNo
            }
        })
    }

}

export default Order;