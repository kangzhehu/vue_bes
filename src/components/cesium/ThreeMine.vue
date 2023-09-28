<template>
 <div class="three-mine-container" ref="screeDoment">

 </div>
</template>

<script>
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
export default {
  data () {
    return {
      threeScene:null,
      camera:null,
      renderer:null,
     
    }
  },
  methods:{
      initThree(){
        let screenDom = this.$refs.screeDoment;  
        //!初始化场景
        this.threeScene = new THREE.Scene();
        //! 创建相机
        this.camera = new THREE.PerspectiveCamera(
          100,
          screenDom.clientWidth / screenDom.clientHeight,
          0.1,
          1000
        );
        this.camera.position.set(0, 50, 200);
        //!创建渲染器
        this.renderer = new THREE.WebGLRenderer();
        // this.renderer = new THREE.WebGLRenderer({antialias: true});//开启抗锯齿
        this.renderer.setSize(screenDom.clientWidth, screenDom.clientHeight);
        screenDom.appendChild(this.renderer.domElement)
        //! 创建辅助坐标
        let axes = new THREE.AxesHelper(50);
        this.threeScene.add(axes);
        //!添加控制器
        // eslint-disable-next-line no-unused-vars
        let control = new OrbitControls(this.camera, this.renderer.domElement);
      
        //!rgba加载器，添加黑夜背景
        let hdrLoader = new RGBELoader();
        hdrLoader.load("./sky12.hdr", (texture)=>{
          texture.mapping = THREE.EquirectangularReflectionMapping;
          this.threeScene.background = texture;
          this.threeScene.environment = texture;
        })
        let name = this.$store.state.popupOverInfo.name;
        name='xinyu';
        //添加模型
        let gltfLoader = new GLTFLoader();
        gltfLoader.load(
          'http://localhost:8800/'+name+'.gltf',(gltf)=>{
           
            gltf.scene.scale.set(0.05, 0.05,0.05 );
            this.threeScene.add(gltf.scene);
           // 计算模型包围盒
              const box = new THREE.Box3().setFromObject(gltf.scene);

          // 设置相机位置和方向，确保模型在视野中心
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = this.camera.fov * (Math.PI / 180);
          let distance = maxDim / (2 * Math.tan(fov / 2));
          distance += distance * 0.4; // 加一点距离，确保模型不会贴在相机面前
          this.camera.position.set(center.x, center.y, center.z + distance);
          this.camera.lookAt(center);
          // const axis = new THREE.Vector3(0, 1, 0);
          // const angle = Math.PI ;
          // this.camera.rotateOnAxis(axis, angle);
          }
        )
        //添加直线光
        let light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(0,500,500);
        let light2 = new THREE.DirectionalLight(0xffffff, 1);  
        light2.position.set(0,500, -500);
        let light3 = new THREE.DirectionalLight(0xffffff, 1);
        light3.position.set(100,100,100);
        this.threeScene.add(light1, light2, light3);
        
        // const light = new THREE.AmbientLight( 0xffffff,1 ); // soft white light
        // this.threeScene.add( light ); 
        this.render();
      },
      render(){
        requestAnimationFrame(this.render);
        this.renderer.render(this.threeScene, this.camera)
      } 
  },
  mounted(){
    this.initThree();
  },
}
</script>

<style lang="scss" scoped>
  .three-mine-container{
    width: 100%;
    height: 100%;
  }
</style>