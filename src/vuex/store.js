import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

const state = {
	login: false
}

const mutations = {
	changeLogState(state, val) {
		return (state.login = val);
	}
}

export default new vuex.Store({
	state,
	mutations
})