import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "@/utils/auth";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

let routes = [
	{
		path: "/",
		redirect: "/myCourse",
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login.vue"),
		meta: {
			title: "登录",
		},
	},
	{
		path: "/myCourse",
		name: "myCourse",
		component: () => import("@/views/myCourse.vue"),
		meta: {
			title: "我的课程",
			authType: 5,
		},
	},
	{
		path: "/courseDetail",
		name: "courseDetail",
		component: () => import("@/views/courseDetail.vue"),
		meta: {
			title: "课程详情",
			authType: 5,
		},
	},
	{
		path: "/evaluationProcess",
		name: "evaluationProcess",
		component: () => import("@/views/evaluate.vue"),
		meta: {
			title: "评价进程",
			authType: 5,
		},
	},
	{
		path: "/evaluationResult",
		name: "evaluationResult",
		component: () => import("@/views/evaluate.vue"),
		meta: {
			title: "评价结果",
			authType: 5,
		},
	},
	{
		path: "/*",
		redirect: "/",
	},
];
const router = new VueRouter({
	scrollBehavior: () => ({ y: 0 }),
	routes,
});

router.beforeEach(async (to, from, next) => {
	let token = getToken();
	console.log(token);
	if (
		to.meta.authType &&
		(token ? token[0] != to.meta.authType && to.meta.authType !== 5 : true)
	) {
		next({
			path: "/login",
		});
	} else {
		window.document.title =
			to.meta.title == undefined
				? "课程评价系统"
				: `${to.meta.title} - 课程评价系统`;
		next();
	}
});

export default router;
