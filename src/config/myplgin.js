//引入axios
import Axios from 'axios'
import Vue from 'vue';
import axios from "axios";

//插件是一个对象 对象中必须有install方法  我们在install方法的形参Vue就是Vue原型,我们可以在方法中编写逻辑代码
var myplgin = {
    install(Vue) {
        //添加拦截器
        var my_axios = Axios.create({
            //设置基准url以后调用axios请求都会将这里的url拼接在请求的url前

        })
        my_axios.interceptors.request.use((config) => {
            //回调函数中的config就是使用axios发送请求的本身,我们可以往请求头中添加参数
            // config.headers = {'satoken': localStorage.getItem('token')}

            // config.headers.token = localStorage.getItem('token')
            //     ,'userId': config.headers.userId=this.$store.state.userInfo.id
            //将添加完毕的请求返回
            return config;

        })

        //处理好的axios设置到vue原型对象中
        // axios.defaults.baseURL="http://182.92.190.125:9918/"
        // axios.defaults.baseURL="https://lxhz123.com:9919"

        // axios.defaults.baseURL = 'http://1.117.105.116:9997'
        // axios.defaults.baseURL = 'http://182.92.190.125:8081'
        // axios.defaults.baseURL = 'http://127.0.0.1:9918'
        axios.defaults.baseURL = 'https://lxhz123.com:9919'
        //将token塞进请求头中，后端会根据token判断是否登录


        axios.defaults.headers.satoken=localStorage.getItem('token')
        Vue.prototype.$http = my_axios
    }
}

//打包导出
export default myplgin;