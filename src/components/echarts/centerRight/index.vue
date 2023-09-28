<template>
    <div>
       <Chart :cdata = "cdata"/>
    </div>
   </template>
   
   <script>
   import Chart from './chart.vue'
   export default {
     components:{
       Chart
     },
     data() {
       return {
           cdata: [
               {
                   name:'南昌市',
                   value:15
               },
               {
                   name:'九江市',
                   value:310
               },
               {
                   name:'上饶市',
                   value:307
               },
               {
                   name:'抚州市',
                   value:201
               },
               {
                   name:'吉安市',
                   value:360
               },
               {
                   name:'鹰潭市',
                   value:70
               },
               {
                   name:'景德镇市',
                   value:107
               },
               {
                   name:'宜春市',
                   value:288
               },
               {
                   name:'新余市',
                   value:90
               },
               {
                   name:'赣州市',
                   value:822
               },
               {
                   name:'萍乡市',
                   value:119
               }
           ]
       }
     },
   }
   </script>
   
   <style>
   
   </style>