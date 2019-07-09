import axios from 'axios';
import {
	Message
} from 'element-ui';
//创建axios实例
var service = axios.create({
	baseURL: '',
	timeout: 500000,
	/*headers: {
		'content-type': 'application/json',
		"token": window.localStorage.getItem("apiToken")
	}*/
});
export default {
	//get请求，其他类型请求复制粘贴，修改method
	get(url, param) {
		var headers = {}
		if (typeof window.localStorage.getItem("apiToken") == "object") {
			headers = {
				'content-type': 'application/json',
			}
		} else {
			headers = {
				'content-type': 'application/json',
				"token": window.localStorage.getItem("apiToken")
			}
		}
		return new Promise((cback, reject) => {
			service({
				method: 'get',
				url,
				params: param,
				headers: headers
			}).then(res => {
				//axios返回的是一个promise对象 
				var res_code = res.status.toString();
				if (res_code.charAt(0) == 2) {
					cback(res); //cback在promise执行器内部
				} else {
					console.log(res, '异常1')
				}
			}).catch(err => {
				if (!err.response) {
					console.log('请求错误')
					//Message是element库的组件，可以去掉
					Message({
						showClose: true,
						message: '请求错误',
						type: 'error'
					});
				} else {
					reject(err.response);
					console.log(err.response, '异常2')
				}
			})

		})
	},
	post(url, param) {
		var headers = {}
		if (typeof window.localStorage.getItem("apiToken") == "object") {
			headers = {
				'content-type': 'application/json',
			}
		} else {
			headers = {
				'content-type': 'application/json',
				"token": window.localStorage.getItem("apiToken")
			}
		}
		return new Promise((cback, reject) => {
			service({
				method: 'post',
				url,
				data: param,
				headers: headers
			}).then(res => {
				//axios返回的是一个promise对象 
				var res_code = res.status.toString();
				if (res_code.charAt(0) == 2) {
					cback(res); //cback在promise执行器内部
				} else {
					console.log(res, '异常1')
				}
			}).catch(err => {
				if (!err.response) {
					console.log('请求错误')
					//Message是element库的组件，可以去掉
					Message({
						showClose: true,
						message: '请求错误',
						type: 'error'
					});
				} else {
					reject(err.response);
					console.log(err.response, '异常2')
				}
			})

		})
	}
}