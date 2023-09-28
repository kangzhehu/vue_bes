<template>
  <!-- 三维分析菜单 -->
  <div class="tdAnalysis-container">
    <div class="tdAnalysis-but">
      <el-button type="primary" class="ele-btn" @click="openTerrainBox"
        >地形分析</el-button
      >
      <el-button type="primary" class="ele-btn" @click="openTransBox"
        >地表透明</el-button
      >
      <!-- <el-button type="primary" class="ele-btn">土方计算</el-button> -->
      <el-button type="primary" class="ele-btn" @click="openFloodBox"
        >水面淹没</el-button
      >
    </div>
    <div class="tdAnalysis-meun">
      <div class="dxfxbox" v-show="terrainBox">
        <el-select
          v-model="terrainValue"
          placeholder="请选择"
          @change="terrainChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="linesBox">
          <el-checkbox v-model="enableLines" @change="terrainChange"
            >启用等高线</el-checkbox
          >
          <div class="dxfxslider">
            <div>间距</div>
            <el-slider
              v-model="spacing"
              class="line"
              :max="500"
              @change="terrainChange"
              :disabled="!enableLines"
            ></el-slider>
            <div>{{ spacing }}米</div>
          </div>
          <div class="dxfxslider">
            <span>线宽</span>
            <el-slider
              v-model="lineWidth"
              class="line"
              :max="10"
              @change="terrainChange"
              :disabled="!enableLines"
            ></el-slider
            >{{ lineWidth }}px
          </div>
          <el-button :disabled="!enableLines" @click="changeColor"
            >改变线颜色</el-button
          >
        </div>
      </div>
      <div class="dbtmbox" v-show="transBox">
        <div class="dbt-but">
          <el-button type="primary" @click="addMine">加载地下矿区</el-button>
          <el-button type="primary" @click="deleteMine">移出地下矿区</el-button>
        </div>
        <el-checkbox v-model="transValue" @change="transChange"
          >地表透明</el-checkbox
        >
        <el-checkbox v-model="fabeByDistance" @change="transChange"
          >按距离衰减</el-checkbox
        >
        <div class="tmSlider">
          <span>透明度</span>
          <el-slider
            v-model="alphaValue"
            :max="1"
            :step="0.1"
            @change="transChange"
          ></el-slider>
        </div>
      </div>
      <!-- <div class="tfjsbox">
        
      </div> -->
      <div class="smymbox" v-show="floodBox">
        <div class="smymbutton">
          <el-button type="primary" @click="drawShapeRange" :disabled="isDraw">绘制范围</el-button>
          <el-button type="primary" @click="induationAnalysis"
            >淹没分析</el-button
          >
          <el-button type="primary" @click="clearAllEntities">清除</el-button>
        </div>
        <div class="smymdata">
          <div class="smymitem">
            最大高度:
            <el-input
              v-model="maxWaterHeight"
              class="smymitembut"
              size="mini"
            ></el-input>
            米
          </div>
          <div class="smymitem">
            最小高度:
            <el-input
              v-model="minWaterHeight"
              class="smymitembut"
              size="mini"
            ></el-input>
            米
          </div>
          <div class="smymitem">
            预警高度:
            <el-input
              v-model="warningWaterHeight"
              class="smymitembut"
              size="mini"
            ></el-input>
            米
          </div>
          <div class="smymitem">
            淹没速度:
            <el-input
              v-model="speed"
              size="mini"
              class="smymitembut"
            ></el-input>
            m/s
          </div>
          <div class="smymitem">
            实时高度:
            {{ waterHeight }}
            米
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let activeShapePoints = [];
let floatingPoint = undefined;
let activeShape = undefined;
let handler = undefined;
import * as ViewUtils from "../../utils/viewerUtils";
import * as Cesium from "cesium/Cesium";
import * as turf from "@turf/turf";
export default {
  data() {
    return {
      pathBox: false,
      terrainBox: false,
      transBox: false,
      floodBox: false,
      transValue: false,
      fabeByDistance: true,
      alphaValue: 0.5,
      enableLines: false,
      lineWidth: 2,
      spacing: 20,
      options: [
        {
          value: "none",
          label: "无影阴",
        },
        {
          value: "elevation",
          label: "高程",
        },
        {
          value: "slope",
          label: "坡度",
        },
        {
          value: "aspect",
          label: "坡向",
        },
      ],
      minHeight: -100,
      maxHeight: 1000,
      contourUniforms: {},
      shadingUniforms: {},
      contourColor: Cesium.Color.RED.clone(),
      terrainValue: "none",
      model: null,
      isDraw: false,
      waterHeight: 0,
      minWaterHeight: 0,
      maxWaterHeight: 2000,
      warningWaterHeight: 0,
      waterHeightShow: false,
      speed: "1",
      waterHeightTimeer: 0,
      waterPrimitive: undefined,
      tempEntities: [],
    };
  },
  methods: {
    openPathBox() {
      this.pathBox = !this.pathBox;
    },
    openTerrainBox() {
      this.terrainBox = !this.terrainBox;
    },
    openTransBox() {
      this.transBox = !this.transBox;
    },
    openFloodBox() {
      this.floodBox = !this.floodBox;
    },
    transChange() {
      if (ViewUtils.staticParams.viewer) {
        ViewUtils.setTranslucency(
          ViewUtils.staticParams.viewer,
          this.transValue,
          this.fabeByDistance,
          this.alphaValue
        );
        // console.log(ViewUtils.staticParams.viewer);
      } else {
        this.$notify({
          title: "失败",
          message: "操作失败",
          type: "fail",
        });
      }
    },
    addMine() {
      ViewUtils.staticParams.mineModel.show = true;
      // this.model = ViewUtils.loadUnderMine(
      //   ViewUtils.staticParams.viewer,
      //   "./undermine.glb"
      // );
      // console.log(this.model);
    },
    deleteMine() {
      // let entity = ViewUtils.staticParams.viewer.entities.getById("4a0a5b26-2cd2-49f9-8462-84400c89b631"); // 通过实体ID获取实体对象
      // ViewUtils.staticParams.viewer.entities.remove(this.model); // 从场景中移除实体
      ViewUtils.staticParams.mineModel.show = false;
    },

    changeColor() {
      this.contourUniforms.color = Cesium.Color.fromRandom(
        { alpha: 1 },
        this.contourColor
      );
      this.terrainChange();
    },
    terrainChange() {
      var globe = ViewUtils.staticParams.viewer.scene.globe;
      // console.log(this.terrainValue);
      let material;
      if (this.enableLines) {
        if (this.terrainValue === "elevation") {
          material = this.getElevationContourMaterial();
          this.shadingUniforms =
            material.materials.elevationRampMaterial.uniforms;
          this.shadingUniforms.minimumHeight = this.minHeight;
          this.shadingUniforms.maximumHeight = this.maxHeight;
          this.contourUniforms = material.materials.contourMaterial.uniforms;
        } else if (this.terrainValue === "slope") {
          material = this.getSlopeContourMaterial();
          this.shadingUniforms = material.materials.slopeRampMaterial.uniforms;
          this.contourUniforms = material.materials.contourMaterial.uniforms;
        } else if (this.terrainValue === "aspect") {
          material = this.getAspectContourMaterial();
          this.shadingUniforms = material.materials.aspectRampMaterial.uniforms;
          this.contourUniforms = material.materials.contourMaterial.uniforms;
        } else {
          material = Cesium.Material.fromType("ElevationContour");
          this.contourUniforms = material.uniforms;
        }
        this.contourUniforms.width = this.lineWidth;
        this.contourUniforms.spacing = this.spacing;
        this.contourUniforms.color = this.contourColor;
      } else if (this.terrainValue === "elevation") {
        material = Cesium.Material.fromType("ElevationRamp");
        // console.log("高程",material);
        this.shadingUniforms = material.uniforms;
        this.shadingUniforms.minimumHeight = this.minHeight;
        this.shadingUniforms.maximumHeight = this.maxHeight;
      } else if (this.terrainValue === "slope") {
        material = Cesium.Material.fromType("SlopeRamp");
        //  console.log("坡度",material);
        this.shadingUniforms = material.uniforms;
        this.shadingUniforms.minimumHeight = this.minHeight;
        this.shadingUniforms.maximumHeight = this.maxHeight;
      } else if (this.terrainValue === "aspect") {
        material = Cesium.Material.fromType("AspectRamp");
        this.shadingUniforms = material.uniforms;
        this.shadingUniforms.minimumHeight = this.minHeight;
        this.shadingUniforms.maximumHeight = this.maxHeight;
      }
      if (this.terrainValue !== "none") {
        // console.log(this.shadingUniforms);
        this.shadingUniforms.image = this.getColorRamp(this.terrainValue);
      }
      globe.material = material;
    },
    getElevationContourMaterial() {
      return new Cesium.Material({
        fabric: {
          type: "ElevationColorContour",
          materials: {
            contourMaterial: {
              type: "ElevationContour",
            },
            elevationRampMaterial: {
              type: "ElevationRamp",
            },
          },
          components: {
            diffuse:
              "contourMaterial.alpha == 0.0 ? elevationRampMaterial.diffuse : contourMaterial.diffuse",
            alpha: "max(contourMaterial.alpha, elevationRampMaterial.alpha)",
          },
        },
        translucent: false,
      });
    },
    getSlopeContourMaterial() {
      // Creates a composite material with both slope shading and contour lines
      return new Cesium.Material({
        fabric: {
          type: "SlopeColorContour",
          materials: {
            contourMaterial: {
              type: "ElevationContour",
            },
            slopeRampMaterial: {
              type: "SlopeRamp",
            },
          },
          components: {
            diffuse:
              "contourMaterial.alpha == 0.0 ? slopeRampMaterial.diffuse : contourMaterial.diffuse",
            alpha: "max(contourMaterial.alpha, slopeRampMaterial.alpha)",
          },
        },
        translucent: false,
      });
    },
    getAspectContourMaterial() {
      // Creates a composite material with both aspect shading and contour lines
      return new Cesium.Material({
        fabric: {
          type: "AspectColorContour",
          materials: {
            contourMaterial: {
              type: "ElevationContour",
            },
            aspectRampMaterial: {
              type: "AspectRamp",
            },
          },
          components: {
            diffuse:
              "contourMaterial.alpha == 0.0 ? aspectRampMaterial.diffuse : contourMaterial.diffuse",
            alpha: "max(contourMaterial.alpha, aspectRampMaterial.alpha)",
          },
        },
        translucent: false,
      });
    },
    getColorRamp(selectedShading) {
      const elevationRamp = [0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0];
      const slopeRamp = [0.0, 0.29, 0.5, Math.sqrt(2) / 2, 0.87, 0.91, 1.0];
      const aspectRamp = [0.0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0];
      var ramp = document.createElement("canvas");
      ramp.width = 100;
      ramp.height = 1;
      var ctx = ramp.getContext("2d");

      let values;
      if (selectedShading === "elevation") {
        values = elevationRamp;
      } else if (selectedShading === "slope") {
        values = slopeRamp;
      } else if (selectedShading === "aspect") {
        values = aspectRamp;
      }

      var grd = ctx.createLinearGradient(0, 0, 100, 0);
      grd.addColorStop(values[0], "#000000"); //black
      grd.addColorStop(values[1], "#2747E0"); //blue
      grd.addColorStop(values[2], "#D33B7D"); //pink
      grd.addColorStop(values[3], "#D33038"); //red
      grd.addColorStop(values[4], "#FF9742"); //orange
      grd.addColorStop(values[5], "#ffd700"); //yellow
      grd.addColorStop(values[6], "#ffffff"); //white
      // console.log(values);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 100, 1);

      return ramp;
    },

    getAreaHeight(_viewer, positions) {
      let startP = positions[0];
      let endP = positions[positions.length - 1];
      if (startP.x != endP.x && startP.y != endP.y && startP.z != endP.z)
        positions.push(positions[0]);

      const tempPoints = [];
      for (let i = 0; i < positions.length; i++) {
        var ellipsoid = _viewer.scene.globe.ellipsoid;
        var cartographic = ellipsoid.cartesianToCartographic(positions[i]);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        tempPoints.push([lng, lat]);
      }
      var line = turf.lineString(tempPoints);
      var chunk = turf.lineChunk(line, 10, { units: "meters" });
      const tempArray = [];
      chunk.features.forEach((feature) => {
        feature.geometry.coordinates.forEach((c) => {
          tempArray.push(Cesium.Cartographic.fromDegrees(c[0], c[1]));
        });
      });
      var promise = Cesium.sampleTerrainMostDetailed(
        _viewer.terrainProvider,
        tempArray
      );
      Cesium.when(promise, (updatedPositions) => {
        const max = Math.max.apply(
          Math,
          updatedPositions.map((item) => {
            return item.height;
          })
        );
        const min = Math.min.apply(
          Math,
          updatedPositions.map((item) => {
            return item.height;
          })
        );
        this.waterHeight = Math.ceil(min);
        this.minWaterHeight = Math.ceil(min);
        this.maxWaterHeight = Math.ceil(max);

        //禁用绘制按钮
        this.isDraw = !this.isDraw;
      });
    },
    createPoint(_viewer, worldPosition) {
      const point = _viewer.entities.add({
        position: worldPosition,
        point: {
          color: Cesium.Color.SKYBLUE,
          pixelSize: 5,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
      return point;
    },
    drawShape(_viewer, positionData, mat) {
      let shape = _viewer.entities.add({
        polygon: {
          hierarchy: positionData,
          material: mat,
          outline: true,
          outlineColor: Cesium.Color.SKYBLUE,
          outlineWidth: 4,
        },
      });
      return shape;
    },
    drawPolyline(_viewer, positions) {
      if (positions.length < 1) return;
      let startP = positions[0];
      let endP = positions[positions.length - 1];
      if (startP.x != endP.x && startP.y != endP.y && startP.z != endP.z)
        positions.push(positions[0]);

      return _viewer.entities.add({
        name: "polyline",
        polyline: {
          positions: positions,
          width: 2.0,
          material: Cesium.Color.SKYBLUE,
          clampToGround: true,
        },
      });
    },
    drawShapeRange() {
      let _viewer = ViewUtils.staticParams.viewer;
      _viewer.scene.globe.depthTestAgainstTerrain = true;
      let canvas = _viewer.scene.canvas;
      handler = new Cesium.ScreenSpaceEventHandler(canvas);
      handler.setInputAction((event) => {
        const earthPosition = _viewer.scene.pickPosition(event.position);
        if (Cesium.defined(earthPosition)) {
          if (activeShapePoints.length === 0) {
            floatingPoint = this.createPoint(_viewer, earthPosition);
            activeShapePoints.push(earthPosition);
            const dynamicPositions = new Cesium.CallbackProperty(() => {
              return new Cesium.PolygonHierarchy(activeShapePoints);
            }, false);
            activeShape = this.drawShape(
              _viewer,
              dynamicPositions,
              Cesium.Color.fromBytes(64, 157, 253, 50)
            );
          }
          activeShapePoints.push(earthPosition);
          this.tempEntities.push(this.createPoint(_viewer, earthPosition));
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      handler.setInputAction((event) => {
        if (Cesium.defined(floatingPoint)) {
          const newPosition = _viewer.scene.pickPosition(event.endPosition);
          if (Cesium.defined(newPosition)) {
            floatingPoint.position.setValue(newPosition);
            activeShapePoints.pop();
            activeShapePoints.push(newPosition);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // eslint-disable-next-line no-unused-vars
      handler.setInputAction((event) => {
        activeShapePoints.pop();
        if (activeShapePoints.length < 3) return;

        this.tempEntities.push(this.drawPolyline(_viewer, activeShapePoints));
        let ploy = this.drawShape(
          _viewer,
          activeShapePoints,
          Cesium.Color.fromBytes(64, 157, 253, 20)
        );
        this.tempEntities.push(ploy);
        this.getAreaHeight(_viewer, activeShapePoints);

        _viewer.entities.remove(floatingPoint);
        _viewer.entities.remove(activeShape);
        floatingPoint = undefined;
        activeShape = undefined;
        handler.destroy(); //关闭事件句柄
        handler = null;
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },

    induationAnalysis() {
      if (
        Number(this.warningWaterHeight) < Number(this.minWaterHeight) ||
        Number(this.warningWaterHeight) > Number(this.maxWaterHeight)
      ) {
        Notification.error({
          title: "获取失败",
          message: "失败",
          duration: 2000,
        });
        return;
      }
      let _viewer = ViewUtils.staticParams.viewer;
      let shape = _viewer.entities.add({
        polygon: {
          hierarchy: activeShapePoints,
          material: Cesium.Color.fromBytes(64, 157, 253, 20),
          extrudedHeight: Number(this.warningWaterHeight),
          outline: true,
          outlineColor: Cesium.Color.RED,
          outlineWidth: 4,
        },
      });
      this.tempEntities.push(shape);
      this.waterHeightShow = true;
      this.waterHeight = Number(this.minWaterHeight);
      const en = _viewer.entities.add({
        polygon: {
          hierarchy: activeShapePoints,
          extrudedHeight: new Cesium.CallbackProperty(() => {
            return this.waterHeight;
          }, false),
          material: Cesium.Color.fromBytes(64, 157, 253, 150),
        },
      });
      this.tempEntities.push(en);
      this.waterHeightTimeer = setInterval(() => {
        this.waterHeight += Number(this.speed);
        let l =
          this.speed.split(".").length > 1 ? this.speed(".")[1].length : 0;
        this.waterHeight = Number(this.waterHeight.toFixed(l));
        this.maxWaterHeight = Number(this.maxWaterHeight);
        this.minWaterHeight = Number(this.minWaterHeight);
        if (
          this.waterHeight > this.maxWaterHeight ||
          this.waterHeight < this.minWaterHeight
        ) {
          clearInterval(this.waterHeightTimeer);
          this.waterHeight =
            this.waterHeight > this.maxWaterHeight
              ? this.maxWaterHeight
              : this.minWaterHeight;
        }
      }, 1000);
    },

    clearAllEntities() {
      let _viewer = ViewUtils.staticParams.viewer;
       _viewer.scene.globe.depthTestAgainstTerrain = false;
      if (this.waterHeightTimeer) {
        clearInterval(this.waterHeightTimeer);
      }
      var length = this.tempEntities.length;
      for (let f = 0; f < length; f++) {
        _viewer.entities.remove(this.tempEntities[f]);
      }
      this.tempEntities = [];
      this.waterHeightShow = false;
      activeShapePoints = [];
      this.warningWaterHeight = 0;
      this.isDraw = false;
      floatingPoint = undefined;
      activeShape = undefined;
      if (handler) {
        handler.destroy();
        handler = undefined;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tdAnalysis-container {
  width: 410px;
  z-index: 1000;
  height: 240px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  // background-color:rgba(56, 85, 89, 0.8);
  position: relative;
  display: flex;
  flex-direction: row;

  .tdAnalysis-but {
    width: 100px;
    height: 240px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid skyblue;

    .ele-btn {
      margin-left: 0px;
    }
  }

  .tdAnalysis-meun {
    width: 300px;
    height: 240px;
    background-color: rgba(56, 85, 89, 0.8);
    border: 1px solid skyblue;

    .ljghbox {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    .dxfxbox {
      padding: 5px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .dxfxslider {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .line {
          width: 70%;
        }
      }
    }
    .dbtmbox {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    .smymbox {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .smymbutton {
        width: 100%;
        height: 50px;
        flex-direction: row;
        justify-content: space-between;
      }
      .smymdata {
        .smymitem {
          margin-top: 2px;
          height: 36px;
          display: flex;
          flex-direction: row;
          // justify-content: space-around;
          .smymitembut {
            padding-left: 5px;
            padding-right: 5px;
            width: 80px;
          }
        }
      }
    }
  }
}
</style>
