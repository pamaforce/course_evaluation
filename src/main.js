import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./utils/rem";
import router from "./router";
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.directive("positive-integer", {
	bind: function (el, binding) {
		el.addEventListener("input", function () {
			var cursorPosition = el.selectionStart;
			var regex = /[^0-9]/g;
			var value = parseInt(el.value.replace(regex, ""), 10).toString();
			if (value === "" || value === "NaN") {
				value = "0";
			}
			let max = parseInt(binding.expression) || 100;
			if (parseInt(value) > max) {
				value = max;
			}
			el.value = value;
			Vue.nextTick(() => {
				el.setSelectionRange(cursorPosition, cursorPosition);
			});
		});
	},
});

Vue.use(ElementUI);
new Vue({ router, render: (h) => h(App) }).$mount("#app");
