export default {
    updateCount(state, num) {
        state.count = num;
    },
    updateFirstName(state, name) {
        state.firstName = name || state.firstName;
    }
};
