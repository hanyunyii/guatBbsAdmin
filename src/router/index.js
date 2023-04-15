import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "@/views/user/Login";
import OrderList from "@/views/order/orderList";
import Userlist from "@/views/user/Userlist";
import list from "@/views/ticket/ticketList";
import ticketList from "@/views/ticket/ticketList";
import localList from "@/views/local/localList";
import Banner from "@/views/small/Banner";
import Hotel from "@/views/small/Hotel";
import MakeHotel from "@/views/make/MakeHotel";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '/orderList',
                name: 'orderList',
                component: OrderList
            },
            {
                path: '/userList',
                name: 'userList',
                component: Userlist
            },
            {
                path: '/ticketList',
                name: 'ticketList',
                component: ticketList
            },
            {
                path: '/localList',
                name: 'localList',
                component: localList
            },
            {
                path:'/banner',
                name: 'Banner',
                component: Banner
            },
            {
                path:'/hotel',
                name:'Hotel',
                component: Hotel
            },
            {
                path:'/makeHotel',
                name:'makeHotel',
                component: MakeHotel
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },

]

const router = new VueRouter({
    routes
})

export default router
