import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footerProperties: {}, //底部地理信息属性
    isShowHoverOver:false,//鼠标悬浮矿区显示自定义信息
    hoverOverInfo:{},//鼠标悬浮矿区显示自定义信息
    isShowSwitcher:false,//switch
    isShowPopupOver:false,//点击的简要信息框显示或隐藏
    popupOverInfo:{},//点击的简要信息框
    isShowPopupWindow:false,//false
    popupWindowInfo:{},
    chartProductInfo:{},// 图表的数据：矿山的产品总类和分布
  },
  getters:{
    getFooterProperties:(state) => {
      return state.footerProperties
    },
    getIsShowHoverOver:(state) => {
      return state.isShowHoverOver
    },
    getHoverInfo:(state) => {
      return state.hoverOverInfo
    },
    getIsShowSwitcher:(state) => {
      return state.isShowSwitcher
    },
    getIsShowPopupOver:(state) => {
      return state.isShowPopupOver
    },
    getPopupOverInfo:(state) => {
      return state.popupOverInfo
    },
    getIsshowPopupWindow:(state) => { 
      return state.isShowPopupWindow
    },
    getPopupWindowInfo:(state) => {
      return state.popupWindowInfo;
    },
    getChartProductInfo:(state) => {
      return state.chartProductInfo;
    }
  },
  //必须同步
  mutations: {
    setFooterProperties:(state, payload) => {
      state.footerProperties = payload
    },
    setIsShowHoverOver:(state,payload)=>{
      state.isShowHoverOver = payload;
    },
    setHoverInfo:(state,payload)=>{
      state.hoverOverInfo = payload
    },
    setIsShowSwitcher:(state,payload)=>{
      state.isShowSwitcher = payload
    },
    setIsShowPopupOver:(state,payload)=>{
      state.isShowPopupOver = payload
    },
    setPopupOverInfo:(state,payload)=>{
      state.popupOverInfo = payload
    },
    setIsShowPopupWindow:(state,payload)=>{
      state.isShowPopupWindow = payload
    },
    setPopupWindowInfo:(state,payload)=>{
      state.popupWindowInfo = payload;
    },
    setChartProductInfo:(state,payload)=>{
      state.chartProductInfo = payload;
    }
  },
  //可以异步
  actions: {
    setFooterPropertiesAsync({commit},payload){
      commit('setFooterProperties', payload)
    },
    setIsShowHoverOverAsync({commit}, payload){
      commit('setIsShowHoverOver', payload)
    },
    setHoverInfoAsync({commit}, payload){
      commit('setHoverInfo', payload)
    },
    setIsShowSwitcherAsync({commit}, payload){
      commit('setIsShowSwitcher', payload)
    },
    setIsShowPopupOverAsync ({commit},payload){
      commit('setIsShowPopupOver', payload)
    },
    setPopupOverInfoAsync({commit}, payload){
      commit('setPopupOverInfo', payload)
    },
    setIsShowPopupWindowAsync({commit}, payload){
      commit('setIsShowPopupWindow', payload)
    },
    setPopupWindowInfoAsync({commit},payload){
      commit('setPopupWindowInfo', payload)
    },
    setChartProductInfoAsync({commit},payload){
      commit('setChartProductInfo', payload)
    }
  }
})