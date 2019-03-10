import Vuex from 'vuex';

import defalutState from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './actions/actions';

const isDev = process.env.NODE_ENV === 'development';

export default () => {
    const store = new Vuex.Store({
        strict: isDev, // 规范更改state的方法, (不能再组件中通过$store去更改, 要通过mutation去更改才规范), 正式环境要去掉
        state: defalutState,
        mutations,
        getters,
        actions
    });

    // 热更新相关代码
    if (module.hot) {
        module.hot.accept(
            ['./state/state', './mutations/mutations', './actions/actions', './getters/getters'],
            () => {
                const newState = require('./state/state').default;
                const newMutations = require('./mutations/mutations').default;
                const newActions = require('./actions/actions').default;
                const newGetters = require('./getters/getters').default;

                store.hotUpdate({
                    state: newState,
                    mutations: newMutations,
                    actions: newActions,
                    getters: newGetters
                });
            }
        );
    }

    return store;
};
