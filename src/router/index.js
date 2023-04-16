import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

let routes = [{
        path: "/",
        redirect: "/myCourse",
    },
    {
        path: "/myCourse",
        name: "myCourse",
        component: () =>
            import ("@/views/myCourse.vue"),
        meta: {
            title: "我的课程",
        },
    },
    {
        path: "/courseDetail",
        name: "courseDetail",
        component: () =>
            import ("@/views/courseDetail.vue"),
        meta: {
            title: "课程详情",
        },
    },
];
const router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
});

router.beforeEach(async(to, from, next) => {
    window.document.title =
        to.meta.title == undefined ?
        "课程评价系统" :
        `${to.meta.title} - 课程评价系统`;
    next();
});

export default router;