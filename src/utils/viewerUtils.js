import * as Cesium from 'cesium/Cesium'
// import axios from 'axios'
// import * as turf from '@turf/turf'
import {HttpManager} from '../api/index'
import {Notification} from 'element-ui'
import Store from '../store';
// import kriging from './kriging'
/*********************全局静态变量************************/
export const staticParams = {
  viewer: undefined,
  mountainsCollection: [], //* 存储山信息点实体
  threeBuildCollection: [], //* 山体图层
  dataSourcePromise: null, //
  mineModel: null, //
  temporaryLayers: {
    //临时图层
    markerColls: [], //临时标注
    jsonColls: [], //临时json（矢量）图层
  },
  analysisLayer:{
    krigningColls:[], //克里金插值结果图层
  },
};

/**
 * 初始化视图
 * @param {Viewer容器} _viewerId
 */
export function initViewer(_viewerId) {
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmY2IxMjNmMS0wMGFkLTRmNmQtYjEyYS1lNTI3N2JmODY0ZDMiLCJpZCI6MTMzMDUxLCJpYXQiOjE2ODExNzY4ODB9.7mK0rWf_5VJ9K7eASj1fNiv9Tzj5bLcrL24TnIQNPEA";
  staticParams.viewer = new Cesium.Viewer(_viewerId, {
    animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPicker: false, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: false, //是否显示3D/2D选择器
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    scene3DOnly: true, //*如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    //! 加载天地图
    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=48bb1dd3563a5bc657b0c78d2bd37bc3",
      layer: "img",
      style: "default",
      tileMatrixSetID: "w",
      format: "tiles",
      maximumLevel: 18,
    }),   
   //创建三维地形
    terrainProvider: Cesium.createWorldTerrain(),
    //基于太阳位置开启地形照明
    requestVertexNormals: true,
    //启用水体效果
    requestWaterMask: true,
    
  });

  //!加载江西省矢量底图
  loadDataSource(staticParams.viewer, require("../assets/json/jiangxi.json"));
  // loadGeoJson(staticParams.viewer, require("../assets/json/jiangxi.json"))
  
  staticParams.viewer.scene.debugShowFramesPerSecond = true;
  //去除底部的商标（版权）信息
  staticParams.viewer.cesiumWidget.creditContainer.style.display = "none";
  staticParams.viewer.scene.globe.enableLighting = true;
  //不显示主页按钮
  //飞到目标区域
  staticParams.viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      115.846268,
      28.629769,
      8000.0
    ),
    //设置相机朝向：俯仰角、倾角
    orientation: {
      heading: Cesium.Math.toRadians(350),
      pitch: Cesium.Math.toRadians(-50),
      roll: 0.0,
    },
  })
  //初始化矿区
  initMines(staticParams.viewer);
  mouseHovershowInfo(staticParams.viewer);
  mouseClickGetInfo(staticParams.viewer);
  createBuilds(staticParams.viewer);
  staticParams.mineModel = loadUnderMine(staticParams.viewer,"./undermine.glb");
  // staticParams.viewer.entities.remove(modelMine);
}

/**
 *  加载矢量数据
 * @param {视图对象} _viewer
 * @param {数据源路径} _dataSource
 */
export function loadDataSource(_viewer, _dataSource) {

  let promise = Cesium.GeoJsonDataSource.load(_dataSource, {});
  //! 记录josn数据源
  staticParams.dataSourcePromise = promise;
  promise
    .then(
      (dataSource)=>{
       //! 1 添加数据源
       _viewer.dataSources.add(dataSource);
      //  console.log(dataSource);
       //! 2 设置数据源样式
       let entitiesArr = dataSource._entityCollection.values;
      //  console.log(entitiesArr);
       //设置颜色表
       let colorHash = {};
       //遍历实体数组，初始化颜色&&高度值
       for(let i = 0; i <entitiesArr.length; i++){
        let entity = entitiesArr[i];
        // let name = entity.properties.name;
        let _id = entity.id 
        // let name = entity.name;
        // console.log(_id);
        let color = colorHash[_id];
        if(!color){
          color = Cesium.Color.fromRandom({
            alpha: 0.5, //透明度限制
          });
          colorHash[_id] = color; //设置颜色属性值
        }
       
        // console.log(entity.polygon.material);
        // entity.polygon.material.color.setValue(color)
        entity.polygon.material = new Cesium.ColorMaterialProperty(color);
        entity.polygon.outline = true;
        entity.polygon.show  = false;
        // entity.polygon.extrudedHeight = entity.properties.OBJECTID * 100;
       }
      //  console.log(entitiesArr);
      //  console.log(colorHash);
  })
    
}

/**
 * 加载GeoJson数据源
 * @param {Cesium.Viewer} viewer Cesium Viewer
 * @param {string} url GeoJson文件路径
 */
// eslint-disable-next-line no-unused-vars
function loadGeoJson(viewer, url) {
  return new Promise((resolve, reject) => {
    Cesium.GeoJsonDataSource.load(url,{
      stroke: Cesium.Color.HOTPINK,
      fill: Cesium.Color.PINK.withAlpha(0.5),
      strokeWidth: 3,
      markerSymbol: '?',
    }).then(
      (dataSource) => {
        viewer.dataSources.add(dataSource);
        viewer.zoomTo(dataSource);
        resolve(dataSource);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/**
 * 加载地下矿区
 * @param {*} _viewer 
 * @param {*} url 
 */
export function loadUnderMine(_viewer,url){
  var position = Cesium.Cartesian3.fromDegrees(
    115.47,
    29.4,
    -10,
  )
  // eslint-disable-next-line no-unused-vars
  var entity = _viewer.entities.add({
    name: 'testMine',
    position:position,
    model:{
      uri:url,
    }
  })
  entity.show = false;
 return entity
}
/**
 * 设置地表透明
 * @param {*} _viewer 
 */

export function setTranslucency(_viewer,transValue, fabeByDistance, alphaValue) {
  var scene= _viewer.scene;
  var globe = scene.globe;
  scene.screenSpaceCameraController.enableCollisionDetection = false;
  globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(
    400.0,
    0.0,
    800.0,
    1.0
  );
  // console.log(globe.translucency);
  globe.translucency.enabled = transValue;
  // scene.globe.baseColor.alpha = 0.5;
  alphaValue = !isNaN(alphaValue) ? alphaValue :1.0;
  alphaValue = Cesium.Math.clamp(alphaValue, 0.0, 1.0);
  // console.log( globe.translucency.enable);
  globe.translucency.frontFaceAlphaByDistance.nearValue = alphaValue;
  globe.translucency.frontFaceAlphaByDistance.farValue =fabeByDistance?1.0:alphaValue;
}

/**
 * 初始化矿区点
 * @param {} _viewer 
 */
// eslint-disable-next-line no-unused-vars
export function initMines(_viewer) {
    //请求数据
    HttpManager.getAllMine().then((res)=>{
      if(res.data && res.data.length > 0){
        let data = res.data;
        // console.log(data);
        Notification.success({
          title:'Loading Success...',
          message:'正在加载矿区',
          duration:5000,
        })
        // 优化版for循环，节约时间
        for(var i = 0,len = data.length; i < len; i++) {
          createMounPoint(staticParams.viewer, data[i])
        }
      }else{
        Notification.error({
          title:'Loading Failure...',
          message:'矿区点加载失败,请刷新重试',
          duration:5000,
        })
      }
    })
}




/**
 * 创建实体
 * @param {场景} _viewer 
 * @param {实体信息} _ptInfo 
 * @param {图标路径} imgurl 
 */
export function createMounPoint(
  _viewer,
  _ptInfo,
  imgurl = require('../assets/imgs/1.png')
){
  /**
   * {
        "id":1,
        "number":"CX01",
        "name"://矿区名称
        "region":" "
        "area":" "
        "Lat":35.1764,
        "Lon":113.197,
        "products":"",
        "notes"://备注
    }       
   */
  //! 记录当前点实体的信息
  //! 创建Cesium.Entity实例
  let entity = new Cesium.Entity({
    // 地理位置属性(及维度转Cesium世界坐标)
    position: Cesium.Cartesian3.fromDegrees(
      _ptInfo.lon, //经度
      _ptInfo.lat, //维度
      0.0 //高度,默认为0
    ),
    //图标
    billboard:{
      image:imgurl,
      width:42,
      height:42,
    },
    //标签
    label:{
       // text: _poiInfo.name,
                // backgroundColor: Cesium.Color.TRANSPARENT,
                // font: 'small-caps bold 12px/1 sans-serif',
                // pixelOffset: new Cesium.Cartesian2(10, -15), //偏移
    },
    //信息点
    // point: {
    //     color: Cesium.Color.RED, //颜色
    //     pixelSize: 15, //尺寸
    //     show: true, //是否显示
    // },
    name: _ptInfo.name,
    show: true, //是否显示实体
  })
  staticParams.mountainsCollection.push(entity);
  // console.log("实体信息",entity);
  //将entity添加到Viewer场景中
  _viewer.entities.add(entity);
}

/**
 * 加载三D建筑模型
 * @param {*} _viewer 
 */
export  function createBuilds(_viewer){
  const osmBuildingsTileset =  Cesium.createOsmBuildings();
 _viewer.scene.primitives.add(osmBuildingsTileset);

}


/**
 * 是否显示矢量行政区划图
 * @param {标志位} _flag
 */
export function showShpDataSOurce(_flag) {
  staticParams.dataSourcePromise.then((datasource) => {
      let entitiesArr = datasource.entities.values //获取json中包含的entity实体
          //遍历实体数组，设置geometry的显隐状态值
      let len = entitiesArr.length - 1
      while (len >= 0) {
          let entity = entitiesArr[len--] //获取当前实体
          // console.log(entity)
              //修改geometry（polygon）的show属性
          entity.polygon.show = _flag
      }
  })
  staticParams.viewer.zoomTo(staticParams.dataSourcePromise)
}

/**
 * 通过3dTiles加载山体模型
 * @param {*} _viewer 
 */
export function loadThreeMountains(_viewer) {
   let mine = new Cesium.Cesium3DTileset({
      url:'http://172.22.5.188:8800/tileset.json',
      show: false,//默认不显示
   })
  staticParams.threeBuildCollection.push(mine);

   var tileset = _viewer.scene.primitives.add(mine);
   tileset.readPromise.then(function(tileset){
    let scene = window.earth.scene;
    // let globe = scene.globe;
     //开启地下可视化
    scene.screenSpaceCameraController.enableCollisionDetection = false;
  
    var boundingSphere = tileset.boundingSphere
    var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center)
    var surface = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        0.0
    )
    var offset = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        10
    )
    var translation = Cesium.Cartesian3.subtract(
        offset,
        surface,
        new Cesium.Cartesian3()
    )
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
   })

   _viewer.zoomTo(tileset)
}



/**
 * 显示底部信息
 * @param {三维视图实例} _viewer 
 * @param {鼠标位置} _position 
 */
export function ShowFooterInfo(_viewer, _position) {
  //! 根据鼠标悬停的位置，在二维世界坐标系中创建 相机视线
  var windowPosition = _viewer.camera.getPickRay(_position);

  var cartesianCoordinates = _viewer.scene.globe.pick(
    windowPosition,
    _viewer.scene
  )
  var cartographic = _viewer.scene.globe.ellipsoid.cartesianToCartographic(
    cartesianCoordinates
  ) 
  let itemProperty = {
    lng: Cesium.Math.toDegrees(cartographic.longitude).toFixed(6), //经度值
    lat: Cesium.Math.toDegrees(cartographic.latitude).toFixed(6), //纬度值
    // alt: Cesium.Math.toDegrees(cartographic.height).toFixed(6), //高程值(本身为m，无需转换)
    alt: cartographic.height.toFixed(6), //高程值
    dir: Math.floor((_viewer.camera.heading * 180) / Math.PI), //相机方向-弧度转角度
    angle: Math.floor((_viewer.camera.pitch * 180) / Math.PI), //相机俯仰角-弧度转角度
    sceneAlt: _viewer.camera.positionCartographic.height.toFixed(2), //视高-相机高度
  } 
  Store.dispatch('setFooterPropertiesAsync',itemProperty);
}

/**
 * 信息点添加点击事件
 * @param {三维视图实例} _viewer 
 */
export function mouseClickGetInfo(_viewer) {
  let canvas = _viewer.scene.canvas;
  let infoHandler = new Cesium.ScreenSpaceEventHandler(canvas);
  infoHandler.setInputAction(function(click){
    //隐藏正在显示的HoverOver组件
    Store.dispatch('setIsShowHoverOverAsync',false)
    
    let pickedFeature = _viewer.scene.pick(click.position)
    if(!Cesium.defined(pickedFeature)){
      return false;
    }

    //获取窗体中心点坐标
    // eslint-disable-next-line no-unused-vars
    let windowCenterPos = {
        top:document.body.clientHeight /2 - 270 + 'px',
        left:document.body.clientWidth /2 - 140 + 'px',
    }
    let name = pickedFeature.id._name
    if(!name){
      return false;
    }
    HttpManager.getMineOfName(name).then((res)=>{
      if(res.status == 200){
        //先暂时隐藏
        Store.dispatch('setIsShowPopupOverAsync', false);
        moveCameraToPos(pickedFeature.id.position._value,_viewer)
        setTimeout(() => {
          showPopUpOver(res.data, windowCenterPos, true);
        }, 3000);
  
      }else{
        Notification.error({
          title:'获取失败',
          message: '信息查询失败',
          duration:2000,
        })
      }
    })
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}


/**
 * 信息点鼠标悬浮展示信息
 * @param {三维视图实例} _viewer 
 */
export function mouseHovershowInfo(_viewer) {
    let canvas = _viewer.scene.canvas
    let infoHandler = new Cesium.ScreenSpaceEventHandler(canvas)
    //设置要在输入事件上执行的功能
    infoHandler.setInputAction(function(click){
      try{
        ShowFooterInfo(_viewer,click.endPosition)
      }catch(error){
        console.log(error);
      }
      let pickedFeature = _viewer.scene.pick(click.endPosition)
      // console.log('=====',pickedFeature);
      if(!Cesium.defined(pickedFeature)){
        return false;
      }
      //wgs84世界坐标系转为window窗口坐标
      if(pickedFeature.id.position == undefined){
        return false;
      }
      let transWindowPos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        _viewer.scene,
        pickedFeature.id.position._value
      )
      // eslint-disable-next-line no-unused-vars
      let positionWindow = {
        top:transWindowPos.y - 70 + 'px',
        left:transWindowPos.x - 140 +'px',
      }
      let name = pickedFeature.id._name 
      if(!name){
        return false;
      }
      // console.log("name", name);
      HttpManager.getMineOfName(name)
      .then((res)=>{
        let data = res.data
        // console.log("请求的数据",data);
        if(data){
          //修改全局状态
          Store.dispatch('setHoverInfoAsync',{
            name:data.name,
            area:data.area,
            classification:data.classification,
            products:data.products,
            positionStyle:positionWindow,
          })
          Store.dispatch('setIsShowHoverOverAsync', true)
        }
      }).catch((err)=>{console.error(err);})
    },Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}

/**
 * 控制点的显示和隐藏
 * @param {点集合} _array 
 * @param {标识} _flag 
 */
export function showHidePoints(_array, _flag = true){
  for(let i=0, len=_array.length; i<len; i++){
    _array[i]._show = _flag
  }
}

/**
 * 控制矢量行政区显示或隐藏
 * @param {标识} _flag 
 */
export function showShpData(_flag){
  staticParams.dataSourcePromise.then((dataSource)=>{
    //* 获取json中包含的entity实体
    let entitiesArr = dataSource.entities.values 
    for(let i=0, len=entitiesArr.length; i<len; i++){
      let entity = entitiesArr[i]
      entity.polygon.show = _flag
    }
  })
  staticParams.viewer.zoomTo(staticParams.dataSourcePromise)
}

/**
 * 3dTiles山体模型的显示or隐藏
 * @param {*} _value 
 */
export function showThreeMines(_value){
  for(let i=0, len=staticParams.threeBuildCollection.length;i<len;i++){
    staticParams.threeBuildCollection[i]._show = _value;
  }
}


/**
 * 三维场景相机移动
 * @param {WGS84世界坐标} position 
 * @param {三维视图} _viewer 
 */
export function moveCameraToPos(position, _viewer){
  //* 将提供的笛卡尔函数转换为地图表示。在椭球体的中心没有定义笛卡尔函数。
  let cartographic = _viewer.scene.globe.ellipsoid.cartesianToCartographic(
    position
  )
  let lat = Cesium.Math.toDegrees(cartographic.latitude);
  let lng = Cesium.Math.toDegrees(cartographic.longitude);
  _viewer.camera.flyTo({
    destination:Cesium.Cartesian3.fromDegrees(
      Number(lng.toString().match(/^\d+(?:\.\d{0,4})?/)),
      Number(lat.toString().match(/^\d+(?:\.\d{0,4})?/)),
      8000.0
    )
  })
}



export function showPopUpOver(_mineInfo, posInwin, payload) {
  _mineInfo.positionStyle = posInwin;
  Store.dispatch('setPopupOverInfoAsync', _mineInfo);
  Store.dispatch('setIsShowPopupOverAsync',payload);
}



/*******************************淹没分析************************************************** */




/**
 * 绘制范围
 */
// export function drawExtent(_viewer){
//   //开启深度检测
//   _viewer.scene.globe.depthTestAgainstTerrain = true;
//   let canvas = _viewer.scene.canvas
//   handler = new Cesium.ScreenSpaceEventHandler(canvas);
//   handler.setInputAction((event)=>{
//     const earthPosition = _viewer.scene.pickPosition(event.position);
//     if(Cesium.defined(earthPosition)){
//       if(activeShapePoints.length === 0){
//         floatingPoint = createPoint(_viewer,earthPosition);
//         activeShapePoints.push(earthPosition);
//         const dynamicPositions = new Cesium.CallbackProperty(()=>{
//           return new Cesium.PolygonHierarchy(activeShapePoints);
//         },false)
//         activeShape = drawShape(_viewer,dynamicPositions, Cesium.Color.fromBytes(64,157, 253,50));
//       }
//       activeShapePoints.push(earthPosition);
//       staticParams.tempEntities.push(createPoint(_viewer,earthPosition))
//     }
//   },Cesium.ScreenSpaceEventType.LEFT_CLICK);

//   handler.setInputAction((event)=>{
//     if(Cesium.defined(floatingPoint)){
//       const newPosition = _viewer.scene.pickPosition(event.endPosition);
//       if(Cesium.defined(newPosition)){
//         floatingPoint.position.setValue(newPosition);
//         activeShapePoints.pop();
//         activeShapePoints.push(newPosition);
//       }
//     }
//   },Cesium.ScreenSpaceEventType.MOUSE_MOVE);

//   // eslint-disable-next-line no-unused-vars
//   handler.setInputAction((event)=>{
//     activeShapePoints.pop();
//     if(activeShapePoints.length < 3) return;

//     staticParams.tempEntities.push(drawPolyline(_viewer,activeShapePoints))
//     let ploy = drawShape(_viewer,activeShapePoints, Cesium.Color.fromBytes(64,157,253,20))
//     staticParams.tempEntities.push(ploy);
//     getAreaHeight(_viewer,activeShapePoints);

//     _viewer.entities.remove(floatingPoint);
//     _viewer.entities.remove(activeShape);
//     floatingPoint = undefined;
//     activeShape = undefined;
//     handler.destroy()//关闭事件句柄
//     handler = null;
//   },Cesium.ScreenSpaceEventType.RIGHT_CLICK)
// }

// export function getAreaHeight(_viewer,positions) {
//   let startP = positions[0]
//   let endP = positions[positions.length - 1]
//   if(startP.x != endP.x && startP.y != endP.y && startP.z != endP.z) positions.push(positions[0])

//   const tempPoints = []
//   for(let i=0;i<positions.length;i++){
//     var ellipsoid = _viewer.scene.globe.ellipsoid
//     var cartographic = ellipsoid.cartesianToCartographic(positions[i])
//     var lat = Cesium.Math.toDegrees(cartographic.latitude)
//     var lng = Cesium.Math.toDegrees(cartographic.longitude)
//     tempPoints.push([lng,lat])
//   }
//   var line =turf.lineString(tempPoints)
//   var chunk = turf.lineChunk(line,10, {units:'meters',});
//   const tempArray = [];
//   chunk.features.forEach(feature => {
//     feature.geometry.coordinates.forEach(c=>{
//       tempArray.push(Cesium.Cartographic.fromDegrees(c[0], c[1]))
//     })
//   })
//   var promise = Cesium.sampleTerrainMostDetailed(_viewer.terrainProvider, tempArray)
//   Cesium.when(promise, (updatedPositions) => {
//     const max = Math.max.apply(Math, updatedPositions.map(item=>{return item.height}))
//     const min = Math.min.apply(Math, updatedPositions.map(item =>{return item.height}))
//     staticParams.waterHeight = Math.ceil(min)
//     staticParams.minWaterHeight = Math.ceil(min)
//     staticParams.maxWaterHeight = Math.ceil(max)

//     //禁用绘制按钮
//     staticParams.isDraw = !staticParams.isDraw

//   })

// }




// export function createPoint(_viewer,worldPosition){
//   const point = _viewer.entities.add({
//     position: worldPosition,
//     point:{
//       color:Cesium.Color.SKYBLUE,
//       pixelSize:5,
//       heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,
//     },
//   });
//   return point;
// }


// export function drawShape(_viewer,positionData, mat){
//   let shape = _viewer.entities.add({
//     polygon:{
//       hierarchy:positionData,
//       material:mat,
//       outline:true,
//       outlineColor:Cesium.Color.SKYBLUE,
//       outlineWidth:4,
//     }
//   });
//   return shape;
// }

// export function drawPolyline(_viewer,positions){
//   if(positions.length < 1) return
//   let startP = positions[0]
//   let endP = positions[positions.length -1]
//   if(startP.x != endP.x && startP.y != endP.y && startP.z != endP.z) positions.push(positions[0])

//   return _viewer.entities.add({
//     name: 'polyline',
//     polyline:{
//       positions: positions,
//       width:2.0,
//       material:Cesium.Color.SKYBLUE,
//       clampToGround: true,
//     }
//   })
// }

// /**
//  * 淹没分析
//  */
// export function induationAnalysis(_viewer){
//   console.log(staticParams.minWaterHeight);
//   console.log(staticParams.maxWaterHeight);
//   if(Number(staticParams.warningWaterHeight)<Number(staticParams.minWaterHeight) || Number(staticParams.warningWaterHeight)>Number(staticParams.maxWaterHeight)){
//     Notification.error({
//       title:'获取失败',
//       message: '失败',
//       duration:2000,
//     })
//     return
//   }

//   let shape = _viewer.entities.add({
//     polygon:{
//       hierarchy:activeShapePoints,
//       material:Cesium.Color.fromBytes(64,157,253,20),
//       extrudedHeight:Number(staticParams.warningWaterHeight),
//       outline:true,
//       outlineColor:Cesium.Color.RED,
//       outlineWidth:4,
//     }
//   });
//   staticParams.tempEntities.push(shape)
//   staticParams.waterHeightShow = true;
//   staticParams.waterHeight = Number(this.minWaterHeight)
//   const en = _viewer.entities.add({
//     polygon:{
//       hierarchy:activeShapePoints,
//       extrudedHeight:new Cesium.CallbackProperty(()=>{
//         return staticParams.waterHeight
//       },false),
//       material:Cesium.Color.fromBytes(64, 157,253, 150)
//     }
//   })
//   staticParams.tempEntities.push(en)
//   staticParams.waterHeightTimeer = setInterval(()=>{
//     staticParams.waterHeight += Number(staticParams.speed)
//     let l = staticParams.speed.split('.').length > 1 ? staticParams.speed('.')[1].length : 0
//     staticParams.waterHeight = Number(staticParams.waterHeight.toFixed(l))
//     staticParams.maxWaterHeight =Number(staticParams.maxWaterHeight)
//     staticParams.minWaterHeight =Number(staticParams.minWaterHeight)
//     if(staticParams.waterHeight > staticParams.maxWaterHeight || staticParams.waterHeight < staticParams.minWaterHeight){
//       clearInterval(staticParams.waterHeightTimeer)
//       staticParams.waterHeight = staticParams.waterHeight > staticParams.maxWaterHeight ? staticParams.maxWaterHeight : staticParams.minWaterHeight
//     }


//   },1000)


// }

// export function clearAllEntities(_viewer){
//   if(staticParams.waterHeightTimeer){
//     clearInterval(staticParams.waterHeightTimeer)
//   }
//   var length = staticParams.tempEntities.length;
//   for(let f=0; f<length; f++){
//     _viewer.entities.remove(staticParams.tempEntities[f]);
//   }
//   staticParams.tempEntities = [];
//   staticParams.waterHeightShow = false;
//   activeShapePoints = []; 
//   staticParams.warningWaterHeight = 0;
//   floatingPoint = undefined;
//   activeShape = undefined;
//   if(handler){
//     handler.destroy();
//     handler = undefined;
//   }
// }


