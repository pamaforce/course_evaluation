<template>
  <div>
    <div class="wrapper" v-if="showWrapper">
      <p class="title">课程详情</p>
      <img src="../assets/card.svg" class="card" />
    </div>
    <div
      class="nav"
      ref="stickyElement"
      :style="showWrapper ? 'width:100%' : ''"
    >
      <div
        class="backBtn"
        v-if="!showWrapper"
        @click="() => (showWrapper = true)"
      >
        返回
      </div>
      <div
        :class="'nav-item' + (activeItem === 0 ? ' active' : '')"
        @click="changeActiveItem(0)"
      >
        教学结构
      </div>
      <div
        :class="'nav-item' + (activeItem === 1 ? ' active' : '')"
        @click="changeActiveItem(1)"
      >
        评价角色
      </div>
      <div :class="'capsule active' + activeItem"></div>
    </div>
    <div class="wrapper" v-if="activeItem === 0">
      <div class="map" onselectstart="return false" ref="map">
        <div id="container"></div>
        <div :class="'btn1' + (showMenu ? '' : ' top-hide')" @click="toProcess">
          评价进程
        </div>
        <div :class="'btn2' + (showMenu ? '' : ' top-hide')" @click="toResult">
          评价结果
        </div>
        <div
          :class="'eye' + (showMenu ? '' : ' left-hide')"
          @click="toggleGrid"
        >
          <img :src="require('../assets/eye-fill.svg')" />
        </div>
        <div
          :class="'copy' + (showMenu ? '' : ' right-1-hide')"
          @click="copyAndPaste"
        >
          <img :src="require('../assets/copy.svg')" />
        </div>
        <div
          :class="'bin' + (showMenu ? '' : ' right-2-hide')"
          @click="deleteCell"
        >
          <img :src="require('../assets/bin.svg')" />
        </div>
        <div :class="'search' + (showMenu ? '' : ' top-2-hide')">
          <el-input placeholder="分支搜索" v-model="search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i
          ></el-input>
        </div>
        <div :class="'list' + (showMenu ? '' : ' top-3-hide')"></div>
        <div :class="'slide' + (showMenu ? '' : ' bottom-1-hide')">
          <el-slider
            v-model="slideValue"
            :min="0.8"
            :max="3"
            :step="0.01"
            @input="handleSlide"
          ></el-slider>
        </div>
      </div>
    </div>
    <div class="wrapper" v-else>
      <div class="grid">
        <div class="grid-item grid-item-1">
          <div class="item-top-line">
            <div class="item-title">
              <img class="item-icon" src="../assets/logo-icon-0.svg" />
              <p>学生角色信息</p>
            </div>
            <img
              :src="require('../assets/convert' + isMap + '.svg')"
              class="convert-icon"
              @click="changeConvert"
            />
          </div>
          <div v-if="isMap" class="map-view">
            <div
              class="map-view"
              id="graph0"
              ref="graph0"
              v-loading="layoutLoading0"
            ></div>
            <div class="slide-2">
              <el-slider
                v-model="slideValue0"
                :min="0.5"
                :max="3"
                :step="0.01"
                @input="handleSlide0"
              ></el-slider>
            </div>
          </div>
          <div v-else class="grid-table">
            <div class="action-line">
              <div class="action">导入数据</div>
              <div class="action">删除</div>
              <div class="action">修改</div>
              <div class="action">标记组长</div>
              <div class="action">新建组群</div>
            </div>
            <div class="row-table">
              <div class="row-table-item">
                <el-table
                  ref="multipleTable"
                  :data="tableData.slice(0, 15)"
                  tooltip-effect="dark"
                >
                  <el-table-column type="selection" width="40" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    :index="(i) => i + 1"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column label="组" width="30" align="center">
                    <template slot-scope="scope">
                      <div
                        class="group-dot"
                        :style="
                          'background-color:' +
                          color[parseInt(scope.$index / 4)]
                        "
                      ></div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="80"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="stu_num"
                    label="学号"
                    width="90"
                    align="center"
                    sortable
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
              <div class="row-table-item">
                <el-table
                  ref="multipleTable"
                  :data="tableData.slice(15, 30)"
                  tooltip-effect="dark"
                >
                  <el-table-column type="selection" width="40" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center"
                    :index="(i) => i + 16"
                  >
                  </el-table-column>
                  <el-table-column label="组" width="30" align="center">
                    <template slot-scope="scope">
                      <div
                        class="group-dot"
                        :style="
                          'background-color:' +
                          color[parseInt(scope.$index / 4)]
                        "
                      ></div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="80"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="stu_num"
                    label="学号"
                    width="90"
                    align="center"
                    sortable
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
              <div class="row-table-item">
                <el-table
                  ref="multipleTable"
                  :data="tableData.slice(30)"
                  tooltip-effect="dark"
                >
                  <el-table-column type="selection" width="40" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center"
                    :index="(i) => i + 31"
                  >
                  </el-table-column>
                  <el-table-column label="组" width="30" align="center">
                    <template slot-scope="scope">
                      <div
                        class="group-dot"
                        :style="
                          'background-color:' +
                          color[parseInt(scope.$index / 4)]
                        "
                      ></div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="80"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="stu_num"
                    label="学号"
                    width="90"
                    align="center"
                    sortable
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="item-top-line">
            <div class="item-title">
              <img class="item-icon" src="../assets/logo-icon-1.svg" />
              <p>教师角色信息</p>
            </div>
            <img
              :src="require('../assets/convert' + isMap1 + '.svg')"
              class="convert-icon"
              @click="changeConvert1"
            />
          </div>
          <div v-if="isMap1" class="map-view">
            <div
              class="map-view"
              id="graph1"
              ref="graph1"
              v-loading="layoutLoading1"
            ></div>
            <div class="slide-2">
              <el-slider
                v-model="slideValue1"
                :min="0.5"
                :max="3"
                :step="0.01"
                @input="handleSlide1"
              ></el-slider>
            </div>
          </div>
          <div v-else class="grid-table">
            <div class="action-line">
              <div class="action">导入数据</div>
              <div class="action">删除</div>
              <div class="action">修改</div>
            </div>
            <div class="row-table">
              <div class="row-table-item-2">
                <el-table
                  ref="multipleTable"
                  :data="tableData.slice(0, 4)"
                  tooltip-effect="dark"
                >
                  <el-table-column type="selection" width="40" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    :index="(i) => i + 1"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="80"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="stu_num"
                    label="学号"
                    width="90"
                    align="center"
                    sortable
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
              <div class="row-table-item-2">
                <el-table
                  ref="multipleTable"
                  :data="tableData.slice(5, 7)"
                  tooltip-effect="dark"
                >
                  <el-table-column type="selection" width="40" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center"
                    :index="(i) => i + 5"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="80"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="stu_num"
                    label="学号"
                    width="90"
                    align="center"
                    sortable
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div class="item-top-line">
            <div class="item-title">
              <img class="item-icon" src="../assets/logo-icon-2.svg" />
              <p>专家角色信息</p>
            </div>
            <img
              :src="require('../assets/convert' + isMap2 + '.svg')"
              class="convert-icon"
              @click="changeConvert2"
            />
          </div>
          <div v-if="isMap2" class="map-view">
            <div
              class="map-view"
              id="graph2"
              ref="graph2"
              v-loading="layoutLoading2"
            ></div>
            <div class="slide-2">
              <el-slider
                v-model="slideValue2"
                :min="0.5"
                :max="3"
                :step="0.01"
                @input="handleSlide2"
              ></el-slider>
            </div>
          </div>
          <div v-else class="grid-table">
            <div class="action-line">
              <div class="action">导入数据</div>
              <div class="action">删除</div>
              <div class="action">修改</div>
            </div>
            <div class="row-table">
              <div class="row-table-item-2">
                <el-table
                  ref="multipleTable"
                  :data="tableData.slice(0, 4)"
                  tooltip-effect="dark"
                >
                  <el-table-column type="selection" width="40" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    :index="(i) => i + 1"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="80"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="stu_num"
                    label="学号"
                    width="90"
                    align="center"
                    sortable
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
              <div class="row-table-item-2">
                <el-table
                  ref="multipleTable"
                  :data="tableData.slice(5, 7)"
                  tooltip-effect="dark"
                >
                  <el-table-column type="selection" width="40" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center"
                    :index="(i) => i + 5"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="80"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="stu_num"
                    label="学号"
                    width="90"
                    align="center"
                    sortable
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Graph, Path } from "@antv/x6";
import { ForceLayout } from "@antv/layout";
import NameCard from "../components/nodes/NameCard.vue";
import SegmentCard from "../components/nodes/SegmentCard.vue";
import PersonCircle from "../components/nodes/PersonCircle.vue";
import GroupCircle from "../components/nodes/GroupCircle.vue";
import TextRect from "../components/nodes/TextRect.vue";
import { register } from "@antv/x6-vue-shape";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { History } from "@antv/x6-plugin-history";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Selection } from "@antv/x6-plugin-selection";
register({
  shape: "custom-vue-node-name-card",
  component: NameCard,
});
register({
  shape: "custom-vue-node-segment-card",
  component: SegmentCard,
});
register({
  shape: "custom-vue-node-person-circle",
  component: PersonCircle,
});
register({
  shape: "custom-vue-node-group-circle",
  component: GroupCircle,
});
register({
  shape: "custom-vue-node-text-rect",
  component: TextRect,
});
Graph.registerEdge(
  "dag-edge",
  {
    inherit: "edge",
    attrs: {
      line: {
        stroke: "#3ab6f5",
        strokeWidth: 2,
        targetMarker: null,
      },
    },
  },
  true
);
Graph.registerConnector(
  "algo-connector",
  (s, e) => {
    const offset = 4;
    const deltaX = Math.abs(e.x - s.x);
    const control = Math.floor((deltaX / 3) * 2);
    const v1 = { y: s.y, x: s.x + offset + control };
    const v2 = { y: e.y, x: e.x - offset - control };
    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x + offset} ${s.y}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x - offset} ${e.y}
       L ${e.x} ${e.y}
      `
    );
  },
  true
);
export default {
  data() {
    return {
      activeItem: 0,
      showMenu: false,
      showGrid: true,
      showWrapper: true,
      search: "",
      isMap: 0,
      isMap1: 0,
      isMap2: 0,
      tableData: [
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
        {
          name: "李平安",
          stu_num: "3019204220",
        },
      ],
      slideValue: 0,
      slideValue0: 0,
      slideValue1: 0,
      slideValue2: 0,
      layoutLoading0: false,
      layoutLoading1: false,
      layoutLoading2: false,
      graph: null,
      graph0: null,
      graph1: null,
      graph2: null,
      colorList: [
        "#00EBBD",
        "#59A996",
        "#B9CDC9",
        "#07725D",
        "#447168",
        "#068A70",
        "#15C3A1",
      ],
      labelPos: [
        [0, 200],
        [-120, 120],
        [120, 120],
      ],
      color: [
        "#A2DAD4",
        "#DED571",
        "#71CADE",
        "#A2ABDA",
        "#A2DAD4",
        "#DED571",
        "#71CADE",
        "#A2ABDA",
      ],
      groups: {
        in: {
          attrs: {
            circle: {
              r: 5,
              magnet: true,
              stroke: "#C2C8D5",
              strokeWidth: 1,
              fill: "#fff",
            },
          },
          position: {
            name: "absolute",
            args: {
              x: "8%",
              y: 36,
            },
          },
        },
        out: {
          attrs: {
            circle: {
              r: 5,
              magnet: true,
              stroke: "#C2C8D5",
              strokeWidth: 1,
              fill: "#fff",
            },
          },
          position: {
            name: "absolute",
            args: {
              x: "92%",
              y: 36,
            },
          },
        },
      },
    };
  },
  methods: {
    changeActiveItem(val) {
      if (this.activeItem === 1 && val === 0) {
        this.activeItem = val;
        this.$nextTick(() => {
          this.initGraph();
        });
      } else if (this.activeItem === 0 && val === 1) {
        this.activeItem = val;
        this.graph.dispose();
      }
    },
    toggleGrid() {
      if (this.showGrid) {
        this.showGrid = false;
        this.graph.hideGrid();
      } else {
        this.showGrid = true;
        this.graph.showGrid();
      }
    },
    toProcess() {
      this.$router.push("/evaluationProcess");
    },
    toResult() {
      this.$router.push("/evaluationResult");
    },
    changeConvert() {
      this.isMap = 1 - this.isMap;
      if (this.isMap == 1) {
        this.$nextTick(() => {
          this.initGraph0();
        });
      } else {
        this.graph0.dispose();
      }
    },
    changeConvert1() {
      this.isMap1 = 1 - this.isMap1;
      if (this.isMap1 == 1) {
        this.$nextTick(() => {
          this.initGraph1();
        });
      } else {
        this.graph1.dispose();
      }
    },
    changeConvert2() {
      this.isMap2 = 1 - this.isMap2;
      if (this.isMap2 == 1) {
        this.$nextTick(() => {
          this.initGraph2();
        });
      } else {
        this.graph2.dispose();
      }
    },
    copyAndPaste() {
      let cells = this.graph.getSelectedCells();
      cells = cells.filter((item) => !item.data.disableClone);
      if (cells.length) {
        this.graph.copy(cells);
      }
      if (!this.graph.isClipboardEmpty()) {
        const cells = this.graph.paste({ offset: 32 });
        this.graph.cleanSelection();
        this.graph.select(cells);
      }
    },
    deleteCell() {
      let cells = this.graph.getSelectedCells();
      cells.forEach((cell) => {
        if (cell.data && cell.data.disableRemove) return;
        cell.remove();
      });
    },
    setGraph(graph) {
      graph.use(
        new Snapline({
          enabled: true,
          sharp: true,
        })
      );
      graph.use(
        new Clipboard({
          enabled: true,
        })
      );
      graph.use(
        new Keyboard({
          enabled: true,
          global: true,
        })
      );
      graph.use(
        new History({
          enabled: true,
        })
      );
      graph.use(
        new Selection({
          enabled: true,
          multiple: true,
          rubberband: true,
          movable: true,
          pointerEvents: "none",
          showNodeSelectionBox: true,
        })
      );
      graph.bindKey("backspace", () => {
        let cells = graph.getSelectedCells();
        cells.forEach((cell) => {
          if (cell.data && cell.data.disableRemove) return;
          cell.remove();
        });
        return false;
      });
      graph.bindKey("ctrl+c", () => {
        let cells = graph.getSelectedCells();
        cells = cells.filter((item) => !item.data || !item.data.disableClone);
        if (cells.length) {
          graph.copy(cells);
        }
        return false;
      });
      graph.bindKey("ctrl+v", () => {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 });
          graph.cleanSelection();
          graph.select(cells);
        }
        return false;
      });
      graph.bindKey("ctrl+z", () => {
        if (graph.canUndo()) graph.undo();
        return false;
      });
      graph.bindKey("ctrl+y", () => {
        if (graph.canRedo()) graph.redo();
        return false;
      });
      setTimeout(() => {
        graph.zoomToFit({ maxScale: 1.8 });
        graph.centerContent();
        graph.cleanHistory();
      }, 100);
    },
    initGraph() {
      const graph = new Graph({
        container: document.getElementById("container"),
        autoResize: true,
        panning: {
          enabled: true,
          eventTypes: ["rightMouseDown"],
        },
        mousewheel: true,
        scaling: { max: 3, min: 0.8 },
        grid: {
          visible: true,
          type: "doubleMesh",
          args: [
            {
              color: "#eee",
              thickness: 1,
            },
            {
              color: "#ddd",
              thickness: 2,
              factor: 8,
            },
          ],
        },
        connecting: {
          snap: {
            radius: 20,
          },
          allowBlank: false,
          allowLoop: false,
          allowNode: false,
          allowEdge: false,
          highlight: true,
          connector: "algo-connector",
          connectionPoint: "anchor",
          anchor: "center",
          validateMagnet({ magnet }) {
            return magnet.getAttribute("port-group") === "out";
          },
          validateConnection({ targetMagnet }) {
            return targetMagnet.getAttribute("port-group") === "in";
          },
          createEdge() {
            return graph.createEdge({
              shape: "dag-edge",
              attrs: {
                line: {
                  strokeDasharray: "5 5",
                },
              },
              zIndex: -1,
            });
          },
        },
        highlighting: {
          magnetAdsorbed: {
            name: "stroke",
            args: {
              attrs: {
                fill: "#fff",
                stroke: "#3ab6f5",
                strokeWidth: 2,
              },
            },
          },
        },
      });
      graph.resize(
        this.$refs.map.getBoundingClientRect().width,
        this.$refs.map.getBoundingClientRect().height
      );
      this.graph = graph;
      this.showGrid = true;
      graph.on("scale", () => {
        this.slideValue = parseFloat(this.graph.zoom().toFixed(2));
      });
      graph.on("blank:dblclick", () => {
        graph.zoomToFit({ maxScale: 3 });
        graph.centerContent();
      });
      graph.on("edge:connected", ({ edge }) => {
        console.log(edge);
        edge.attr({
          line: {
            strokeDasharray: "",
          },
        });
      });
      graph.on("edge:mouseup", ({ e, edge }) => {
        console.log(edge.getTargetCell(), e);
        if (!edge.getTargetCell()) {
          const targetPoint = graph.clientToLocal(e.clientX, e.clientY);
          this.createNewNodeAndConnect(targetPoint, edge);
          console.log(edge);
        }
      });
      this.setGraph(graph);
      const groups = this.groups;
      const nameNode = graph.addNode({
        shape: "custom-vue-node-name-card",
        x: 0,
        y: 0,
        data: {
          title: "展示展览设计",
          score: 100,
          disableClone: true,
          disableRemove: true,
        },
        ports: {
          groups: groups,
          items: [{ id: "out-port-1", group: "out" }],
        },
      });
      const segmentNode1 = graph.addNode({
        shape: "custom-vue-node-segment-card",
        x: 400,
        y: -200,
        data: {
          title: "环节名称1",
          score: 15,
          max: 100,
        },
        ports: {
          groups: groups,
          items: [
            { id: "in-port-1", group: "in" },
            { id: "out-port-1", group: "out" },
          ],
        },
      });
      const segmentNode2 = graph.addNode({
        shape: "custom-vue-node-segment-card",
        x: 400,
        y: 0,
        data: {
          title: "环节名称2",
          score: 50,
          max: 100,
        },
        ports: {
          groups: groups,
          items: [
            { id: "in-port-1", group: "in" },
            { id: "out-port-1", group: "out" },
          ],
        },
      });
      const segmentNode3 = graph.addNode({
        shape: "custom-vue-node-segment-card",
        x: 400,
        y: 200,
        data: {
          title: "环节名称3",
          score: 35,
          max: 100,
        },
        ports: {
          groups: groups,
          items: [
            { id: "in-port-1", group: "in" },
            { id: "out-port-1", group: "out" },
          ],
        },
      });
      graph.addEdge({
        shape: "dag-edge",
        zIndex: -1,
        source: { cell: nameNode, port: "out-port-1" },
        target: { cell: segmentNode1, port: "in-port-1" },
      });
      graph.addEdge({
        shape: "dag-edge",
        zIndex: -1,
        source: { cell: nameNode, port: "out-port-1" },
        target: { cell: segmentNode2, port: "in-port-1" },
      });
      graph.addEdge({
        shape: "dag-edge",
        zIndex: -1,
        source: { cell: nameNode, port: "out-port-1" },
        target: { cell: segmentNode3, port: "in-port-1" },
      });
      setTimeout(() => {
        this.showMenu = true;
      }, 1000);
      console.log(graph);
    },
    handleSlide(val) {
      if (this.graph) this.graph.zoomTo(val);
    },
    handleSlide0(val) {
      if (this.graph0) this.graph0.zoomTo(val);
    },
    handleSlide1(val) {
      if (this.graph1) this.graph1.zoomTo(val);
    },
    handleSlide2(val) {
      if (this.graph2) this.graph2.zoomTo(val);
    },
    createNewNodeAndConnect(targetPoint, edge) {
      const segmentNode = this.graph.addNode({
        shape: "custom-vue-node-segment-card",
        x: targetPoint.x,
        y: targetPoint.y,
        data: {
          title: "环节名称",
          score: 0,
        },
        ports: {
          groups: this.groups,
          items: [
            { id: "in-port-1", group: "in" },
            { id: "out-port-1", group: "out" },
          ],
        },
      });
      this.graph.addEdge({
        shape: "dag-edge",
        zIndex: -1,
        source: edge.getSource(),
        target: { cell: segmentNode, port: "in-port-1" },
      });
    },
    initGraph0() {
      this.layoutLoading0 = true;
      const graph = new Graph({
        container: document.getElementById("graph0"),
        autoResize: true,
        panning: {
          enabled: true,
          eventTypes: ["rightMouseDown"],
        },
        mousewheel: true,
        scaling: { max: 3, min: 0.5 },
        interacting: (d) => {
          return {
            nodeMovable: d.cell.shape === "custom-vue-node-group-circle",
          };
        },
        highlighting: {
          embedding: {
            name: "stroke",
            args: {
              padding: -1,
              attrs: {
                stroke: "#73d13d",
              },
            },
          },
        },
      });
      graph.resize(
        this.$refs.graph0.getBoundingClientRect().width,
        this.$refs.graph0.getBoundingClientRect().height
      );
      this.graph0 = graph;
      graph.on("scale", () => {
        this.slideValue0 = parseFloat(this.graph0.zoom().toFixed(2));
      });
      graph.on("blank:dblclick", () => {
        graph.zoomToFit({ maxScale: 2 });
        graph.centerContent();
      });
      this.activeForceLayout(graph, 0, 0);
      graph.zoomToFit({ maxScale: 2 });
      graph.centerContent();
    },
    activeForceLayout(graph, no, k) {
      let memberGroups = [5, 7, 3, 12, 18, 8];
      let numType = [
        [800, 300],
        [700, 300],
        [400, 200],
      ];
      if (no !== 0) {
        memberGroups = [3, 1, 2];
      }
      const centerList = [[0, 0]];
      for (let i = 1; i < memberGroups.length; i++) {
        let circleX,
          circleY,
          validPosition = false;
        do {
          validPosition = true;
          const angle = Math.random() * 2 * Math.PI;
          const radius = numType[no][0];
          const offsetX = Math.cos(angle) * radius;
          const offsetY = Math.sin(angle) * radius;
          circleX = offsetX;
          circleY = offsetY;
          for (let j = 0; j < i; j++) {
            const prevCircleX = centerList[j][0];
            const prevCircleY = centerList[j][1];
            const distance = this.calculateDistance(
              circleX,
              circleY,
              prevCircleX,
              prevCircleY
            );
            if (distance < numType[no][1]) {
              validPosition = false;
              break;
            }
          }
        } while (!validPosition);
        centerList.push([circleX, circleY]);
      }
      const model = { nodes: [], edges: [], center: { x: 0, y: 0 } };
      const centerX = centerList[k][0];
      const centerY = centerList[k][1];
      model.center = {
        x: centerX,
        y: centerY,
        scale: Math.floor(Math.sqrt(3000 * memberGroups[k])) / 250,
      };
      for (let i = 1; i <= memberGroups[k]; i++) {
        const x = 0.8 + Math.random() * 0.7;
        const angle = Math.random() * 2 * Math.PI;
        const radius = 50 * x;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        const circleX = centerX + offsetX;
        const circleY = centerY + offsetY;
        const ranN2 = Math.floor(Math.random() * centerList.length);
        let data =
          no === 0
            ? {
                sno: "3019204220",
                name: "李平安",
                color: this.colorList[ranN2],
                scale: x,
              }
            : {
                sno: "",
                name: "赵平安",
                color: "#C3C3C3",
                scale: 1,
              };
        model.nodes.push({
          shape: "custom-vue-node-person-circle",
          x: circleX - radius,
          y: circleY - radius,
          size: {
            width: 2 * radius,
            height: 2 * radius,
          },
          data: data,
        });
      }
      const ranN = Math.floor(Math.random() * this.labelPos.length);
      model.nodes.push({
        shape: "custom-vue-node-text-rect",
        fx: centerX - 50 + 50 + this.labelPos[ranN][0] * model.center.scale,
        fy: centerY - 20 + 50 + this.labelPos[ranN][1] * model.center.scale,
        size: {
          width: 100,
          height: 40,
        },
        data: {
          width: no === 0 ? 100 : 220,
          text:
            no === 0
              ? "第" + (k + 1) + "组"
              : "中国第" + (k + 1) + "科技有限公司",
        },
      });
      const forceLayout = new ForceLayout({
        type: "force",
        center: [centerX, centerY],
        preventOverlap: true,
        collideStrength: 1,
        linkDistance: 0,
        nodeStrength: 98,
        onLayoutEnd: () => {
          const groupNode = graph.addNode({
            shape: "custom-vue-node-group-circle",
            x: centerX - 250 * model.center.scale + 50,
            y: centerY - 250 * model.center.scale + 50,
            size: {
              width: 500 * model.center.scale,
              height: 500 * model.center.scale,
            },
            data: {
              scale: model.center.scale,
            },
            zIndex: 10,
          });
          model.nodes.forEach((item) => {
            groupNode.addChild(
              graph.createNode({
                id: item.id,
                shape: item.shape,
                x: item.x,
                y: item.y,
                size: item.size,
                data: item.data,
                zIndex: 40,
              })
            );
          });
          if (k < memberGroups.length - 1) {
            this.activeForceLayout(graph, no, k + 1);
          } else {
            graph.zoomToFit({ maxScale: 1.8 });
            graph.centerContent();
            if (no === 0) this.layoutLoading0 = false;
            else this.layoutLoading2 = false;
          }
        },
        tick: () => {},
      });
      forceLayout.layout(model);
    },
    calculateDistance(x1, y1, x2, y2) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    },
    initGraph1() {
      this.layoutLoading1 = true;
      const graph = new Graph({
        container: document.getElementById("graph1"),
        autoResize: true,
        panning: {
          enabled: true,
          eventTypes: ["rightMouseDown"],
        },
        mousewheel: true,
        scaling: { max: 3, min: 0.5 },
        highlighting: {
          embedding: {
            name: "stroke",
            args: {
              padding: -1,
              attrs: {
                stroke: "#73d13d",
              },
            },
          },
        },
      });
      graph.resize(
        this.$refs.graph1.getBoundingClientRect().width,
        this.$refs.graph1.getBoundingClientRect().height
      );
      this.graph1 = graph;
      graph.on("scale", () => {
        this.slideValue1 = parseFloat(this.graph1.zoom().toFixed(2));
      });
      graph.on("blank:dblclick", () => {
        graph.zoomToFit({ maxScale: 2 });
        graph.centerContent();
      });
      const model = { nodes: [], edges: [], center: { x: 0, y: 0 } };
      for (let i = 1; i <= 6; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = 50;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        const circleX = offsetX;
        const circleY = offsetY;
        model.nodes.push({
          shape: "custom-vue-node-person-circle",
          x: circleX - radius,
          y: circleY - radius,
          size: {
            width: 2 * radius,
            height: 2 * radius,
          },
          data: {
            sno: "",
            name: "李平安",
            color: "#C3C3C3",
            scale: 1,
          },
        });
      }
      const forceLayout = new ForceLayout({
        type: "force",
        center: [0, 0],
        preventOverlap: true,
        collideStrength: 1.2,
        linkDistance: 0,
        nodeStrength: 10,
        onLayoutEnd: () => {
          model.nodes.forEach((item) => {
            graph.addNode({
              id: item.id,
              shape: item.shape,
              x: item.x,
              y: item.y,
              size: item.size,
              data: item.data,
              zIndex: 40,
            });
          });
          graph.zoomToFit({ maxScale: 1.8 });
          graph.centerContent();
          this.layoutLoading1 = false;
        },
        tick: () => {},
      });
      forceLayout.layout(model);
    },
    initGraph2() {
      this.layoutLoading2 = true;
      const graph = new Graph({
        container: document.getElementById("graph2"),
        autoResize: true,
        panning: {
          enabled: true,
          eventTypes: ["rightMouseDown"],
        },
        mousewheel: true,
        scaling: { max: 3, min: 0.5 },
        interacting: (d) => {
          return {
            nodeMovable: d.cell.shape === "custom-vue-node-group-circle",
          };
        },
        highlighting: {
          embedding: {
            name: "stroke",
            args: {
              padding: -1,
              attrs: {
                stroke: "#73d13d",
              },
            },
          },
        },
      });
      graph.resize(
        this.$refs.graph2.getBoundingClientRect().width,
        this.$refs.graph2.getBoundingClientRect().height
      );
      this.graph2 = graph;
      graph.on("scale", () => {
        this.slideValue2 = parseFloat(this.graph2.zoom().toFixed(2));
      });
      graph.on("blank:dblclick", () => {
        graph.zoomToFit({ maxScale: 2 });
        graph.centerContent();
      });
      this.activeForceLayout(graph, 2, 0);
      graph.zoomToFit({ maxScale: 2 });
      graph.centerContent();
    },
    handleScroll() {
      const stickyElement = this.$refs.stickyElement;
      const elementTop = stickyElement.getBoundingClientRect().top;
      if (elementTop <= 0) {
        this.showWrapper = false;
      }
    },
  },
  mounted() {
    this.initGraph();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // 组件销毁时移除事件监听器
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {},
};
</script>

<style scoped>
.wrapper {
  padding: 60px 112px;
  position: relative;
}
.btn1 {
  position: absolute;
  cursor: pointer;
  width: 140px;
  height: 40px;
  cursor: pointer;
  left: 48px;
  top: 28px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #dddddd;
  font-size: 16px;
  letter-spacing: 0.05em;
  color: #333333;
  background-color: white;
  transition: all 0.5s ease-in-out;
}
.btn2 {
  position: absolute;
  cursor: pointer;
  width: 140px;
  height: 40px;
  cursor: pointer;
  left: 203px;
  top: 28px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #dddddd;
  font-size: 16px;
  letter-spacing: 0.05em;
  color: #333333;
  background-color: white;
  transition: all 0.6s ease-in-out;
}
.eye {
  position: absolute;
  top: 442px;
  left: 50px;
  width: 60px;
  height: 60px;
  background: rgba(61, 61, 61, 0.6);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.6s ease-in-out;
}
.eye img {
  width: 30px;
  height: 30px;
}
.copy {
  position: absolute;
  top: 380px;
  right: 90px;
  width: 80px;
  height: 80px;
  background: rgba(61, 61, 61, 0.6);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.6s ease-in-out;
}
.bin {
  position: absolute;
  top: 470px;
  right: 50px;
  width: 60px;
  height: 60px;
  background: rgba(61, 61, 61, 0.6);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.6s ease-in-out;
}
.search {
  position: absolute;
  top: 20px;
  right: 50px;
  width: 160px;
  height: 30px;
  background: #ffffff;
  border: 0.5px solid #c0c0c0;
  border-radius: 12px;
  transition: all 0.6s ease-in-out;
  overflow: hidden;
}
.list {
  position: absolute;
  top: 60px;
  right: 50px;
  width: 160px;
  height: 220px;
  background: rgba(245, 245, 245, 0.4);
  border: 0.4px solid #c0c0c0;
  border-radius: 12px;
  transition: all 0.6s ease-in-out;
}
.slide {
  position: absolute;
  bottom: 30px;
  right: 80px;
  width: 200px;
  transition: all 0.6s ease-in-out;
}
.slide-2 {
  position: absolute;
  bottom: 0px;
  right: 10px;
  width: 150px;
  z-index: 100;
}
.search >>> .el-input__inner {
  height: 30px !important;
  border: none;
}
.search >>> .el-input__icon {
  line-height: 30px !important;
}
.top-hide {
  top: -40px;
}
.top-2-hide {
  top: -260px;
}
.top-3-hide {
  top: -220px;
}
.bottom-1-hide {
  bottom: -60px;
}
.left-hide {
  left: -50px;
}
.right-1-hide {
  right: -70px;
}
.right-2-hide {
  right: -50px;
}
.title {
  font-weight: 700;
  font-size: 26px;
  color: #010101;
}
.card {
  width: 100%;
  box-shadow: 0px 0px 37px 2px rgba(0, 0, 0, 0.1);
  border-radius: 21px;
  overflow: hidden;
}
.nav {
  width: calc(100% - 640px);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 66px;
  border-bottom: 1px solid #d9d9d9;
  position: sticky;
  top: 0;
  z-index: 99;
  margin: 0 auto;
}
.nav-item {
  width: 140px;
  height: 60px;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
  color: #333333;
  cursor: pointer;
  z-index: 99;
}
.backBtn {
  position: absolute;
  cursor: pointer;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
}
.active {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
}
.capsule {
  height: 2px;
  width: 40px;
  background: #333333;
  position: absolute;
  left: 50%;
  bottom: -2px;
  border-radius: 4px;
  transform: translateX(calc(-50% - 70px));
  transition: all 0.3s;
}
.active0 {
  transform: translateX(calc(-50% - 70px));
}
.active1 {
  transform: translateX(calc(-50% + 70px));
}
.map {
  position: relative;
  width: 1696px;
  height: 943px;
  box-shadow: 0px 0px 37px 2px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
}
.grid {
  display: grid;
  width: 1696px;
  height: 943px;
  gap: 36px;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr 1fr;
}
.grid-item-1 {
  grid-row-start: 1;
  grid-row-end: 3;
}
.grid-item {
  background-color: #ffffff;
  box-shadow: 0px 0px 37px 2px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
  padding: 24px 36px;
}
.item-top-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.item-title {
  display: flex;
  align-items: center;
}
.item-title p {
  font-family: "Smiley Sans";
  font-style: italic;
  font-size: 20px;
  color: #1f1f1f;
  margin: 0;
}
.item-icon {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  background-color: #afafaf;
  margin: 6px;
}
.convert-icon {
  width: 26px;
  height: 26px;
  cursor: pointer;
}
.grid-table {
  width: 100%;
  height: calc(100% - 60px);
}
.map-view {
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
}
.action-line {
  width: 100%;
  display: flex;
  margin: 12px 0;
}
.action {
  margin: 6px;
  margin-left: 0;
  padding: 3px 14px;
  font-size: 13px;
  color: #333333;
  background: #dddddd;
  border: 0.4px solid #dddddd;
  border-radius: 15px;
  cursor: pointer;
}
.row-table {
  display: flex;
  overflow-x: auto;
}
.row-table-item {
  width: max-content;
  height: 780px;
  margin-right: 40px;
  flex-shrink: 0;
}
.group-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 auto;
}
.row-table-item-2 {
  width: max-content;
  height: 290px;
  margin-right: 40px;
  flex-shrink: 0;
}
</style>