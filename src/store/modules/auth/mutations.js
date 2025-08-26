export default {
    setUser(state, payload) {
        console.log(payload, state);
        state.token = payload.token;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
    },
}