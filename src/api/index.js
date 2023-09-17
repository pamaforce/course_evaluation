import http from "../utils/http";

// 登录验证接口
export function login(params) {
	return http.post(`user/login`, params);
}
