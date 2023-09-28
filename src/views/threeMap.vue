<!-- 
暂时放弃这个功能，地图下钻效果不是很好
 -->
<template>
   <div>
      <canvas id="c2d" ref="c2d" class="c2d" width="1000" height="500"></canvas>
   </div>
</template>

<script>
import * as THREE from 'three';
import * as d3 from 'd3';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
   data() {

      return {
         camera: null,
         renderer: null,
         canvas:null,
         scene: null,
         scene2:null,
         map:null,
         map2:null,
         lastPick: null,
         loader: null,
         projection1:null
      }
   },
   methods: {
      init() {
         //!以北京为中心，修改坐标
         this.projection1 = d3.geoMercator().center([116.41, 39, 9]).translate([0, 0])
          //* 场景
         this.scene = new THREE.Scene();
         this.canvas = this.$refs.c2d;
         //* 渲染器 
         this.renderer = new THREE.WebGLRenderer(this.canvas);
         //* 透视投影相机
         this.camera = new THREE.PerspectiveCamera(40,2,0.1,1000);
         this.camera.position.set(0,0,300);
         this.camera.lookAt(0,0,0)
         this.scene.add(this.camera);
         //* 控制相机
         const controls = new OrbitControls(this.camera,this.canvas);
         controls.enableDamping = true
         controls.update();

         //* 辅助坐标轴
         var axes = new THREE.AxesHelper(700);
         this.scene.add(axes)
         //* 设置环境光
         const light = new THREE.AmbientLight(0x404040,1)
         this.scene.add(light);
         //* 加载器
         this.loader = new THREE.FileLoader();
         // 供内部使用FileLoader的所有加载器使用
         THREE.Cache.enabled = true;
         this.loader.load('china.json',
            (data)=>{
               // console.log(data);
               var jsondata = JSON.parse(data);
               this.operationData(jsondata);
            }
         )
      },

     /**
      * 
      * @param {object} polygon 多边形 点数组
      * @param {string} color 材质颜色
      */
      drawExtrudeMesh(polygon, color, projection){
         const shape = new THREE.Shape()
         polygon.forEach((row,i)=>{
            const [x, y] = projection(row)
            if(i === 0){
               shape.moveTo(x,-y)
            }
            // 连接各个点
            shape.lineTo(x,-y)
         })

         //*  挤压缓冲区 depth为挤压的深度
         const geometry = new THREE.ExtrudeGeometry(shape,{
            depth:10,
            bevelEnabled:false
         })
         //* 材质
         const material = new THREE.MeshBasicMaterial({
            color:color,
            transparent:true,
            opacity:0.5
         })
         return new THREE.Mesh(geometry, material)
      },


      //todo 图形绘制
      lineDraw(polygon, color,projection){
         const lineGeometry = new THREE.BufferGeometry()
         const pointsArray = new Array()
         polygon.forEach((row)=>{
            const [x,y] = projection(row)
            // 创建三维点
            pointsArray.push(new THREE.Vector3(x, -y, 9))
         })
         //放入多个点
         lineGeometry.setFromPoints(pointsArray);

         const lineMaterial = new THREE.LineBasicMaterial({
            color:color
         })
         return new THREE.Line(lineGeometry, lineMaterial)
      },

      // todo 解析数据,对每一个多边形绘制图形
      operationData(jsondata){
         this.map = new THREE.Object3D()
         //! 全国信息
         const features = jsondata.features;
         features.forEach((feature)=>{
            //! 单个省份 对象
            const province = new THREE.Object3D()
            //! 地址
            province.properties = feature.properties.name;
            const coordinates = feature.geometry.coordinates;
            const color = '#4b90c4'
            if(feature.geometry.type === 'MultiPolygon'){
               //多个 多边形
               coordinates.forEach((coordinate)=>{
                  // coordinate 多边形数据
                  coordinate.forEach((rows)=>{
                     const mesh = this.drawExtrudeMesh(rows, color,this.projection1);
                     const line = this.lineDraw(rows, color,this.projection1);
                     //* 唯一标识
                     mesh.properties = feature.properties.name;
                     province.add(line)
                     province.add(mesh);
                  })
               })
            }

            if (feature.geometry.type === 'Polygon'){
               //多边形
               coordinates.forEach((coordinate)=>{
                  const mesh = this.drawExtrudeMesh(coordinate, color, this.projection1)
                  const line = this.lineDraw(coordinate,color, this.projection1)
                  mesh.properties = feature.properties.name;
                  province.add(line)
                  province.add(mesh)
               })
            }
            this.map.add(province);
         })
         this.scene.add(this.map);
      },

      // todo: 计算 以画布 开始为（0，0）点的鼠标坐标
      getCanvasRelativePosition(event) {
         const rect = this.canvas.getBoundingClientRect();
         return{
            x:((event.clientX - rect.left)*this.canvas.width)/rect.width,
            y:((event.clientY - rect.top)*this.canvas.height)/rect.height
         }
      },

      //todo 获取鼠标在threejs 中归一化坐标
      setPickPosition(event) {
         let pickPosition = {x:0, y:0}
         //* 计算后 以画布 开始为（0，0）点 
         const pos = this.getCanvasRelativePosition(event)
         // * 数据归一化
         pickPosition.x = (pos.x/this.canvas.width)*2-1;
         pickPosition.y = (pos.y/this.canvas.height)*2+1;
         return pickPosition;
      },

      //todo 监听鼠标
      onRay(event){
         let pickPosition =this.setPickPosition(event);
         // * 射线
         const raycaster = new THREE.Raycaster();
         raycaster.setFromCamera(pickPosition,this.camera);

         //* 计算物体和射线的交点
         const intersects = raycaster.intersectObjects([this.map])
         //* 数组大于0表示有相交对象
         if(intersects.length >0){
            if(this.lastPick){
               if(this.lastPick.object.properties != intersects[0].object.properties){
                  this.lastPick.object.material.color.set('#4b90c4');
                  this.lastPick = null;
               }   
            }
            if(intersects[0].object.properties){
               intersects[0].object.material.color.set('#20ee49')
            }
            this.lastPick = intersects[0]
         }else{
            if(this.lastPick){
               //* 复原
               if(this.lastPick.object.properties){
                  this.lastPick.object.material.color.set('#4b90c4');
                  this.lastPick = null;
               }
            }
         }
      },


      //todo 判断下钻数据
      judgeProvince(name){
         let path;
         if(name === ''){
            path = '';
         }
         this.loader.load(path, (data)=>{
            const jsondata = JSON.parse(data);
            this.operationData2(jsondata);
         })
      },

      //todo 解析下转的数据
      operationData2(jsondata) {
         this.map2 = new THREE.Object3D();
         this.scene2 = new THREE.Scene();
        // 全国信息
        const features = jsondata.features

        features.forEach((feature) => {
          // 单个省份 对象
          const province = new THREE.Object3D()
          // 地址
          province.properties = feature.properties.name
          const coordinates = feature.geometry.coordinates
          const color = '4b90c4'
          // const color = ['重庆市', '上海市'].includes(feature.properties.name) ? 'blue' : 'yellow'

          if (feature.geometry.type === 'MultiPolygon') {
            // 多个，多边形
            coordinates.forEach((coordinate) => {
              // coordinate 多边形数据
              coordinate.forEach((rows) => {
                const mesh = this.drawExtrudeMesh(rows, color, this.projection1)
                const line = this.lineDraw(rows, color, this.projection1)
                // 唯一标识
                mesh.properties = feature.properties.name

                province.add(line)
                province.add(mesh)
              })
            })
          }

          if (feature.geometry.type === 'Polygon') {
            // 多边形
            coordinates.forEach((coordinate) => {
              const mesh = this.drawExtrudeMesh(coordinate, color, this.projection1)
              const line = this.lineDraw(coordinate, color, this.projection1)
              // 唯一标识
              mesh.properties = feature.properties.name

              province.add(line)
              province.add(mesh)
            })
          }
          this.map2.add(province)
        })
        this.map2.scale.set(8, 8, 1)
        this.scene2.add(this.map2)
      },

      // todo 时时渲染
      animate(){
         if(this.lastPick && this.lastPick.object.properties ==='重庆市'){
            this.renderer.render(this.scene2, this.camera)
         }else{
            this.renderer.render(this.scene, this.camera)
         }    
         requestAnimationFrame(this.animate)
      }
   },
   mounted() {
      this.init();
      this.animate();
      //todo 监听鼠标
      window.addEventListener('click', this.onRay)
   }

}
</script>

<style>
</style>