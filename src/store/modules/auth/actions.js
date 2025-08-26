export default {
    async login({ commit }, payload) {
        const params = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlwBgXH5OcFcsUvq4orU97CRCj3kKZn6c`, {
            method: 'POST',
            body: JSON.stringify(params),
        });

        const resData =  await response.json();

        if(!response.ok) {
            throw new Error(resData.message || 'Failed to login!');
        }

        console.log(response, resData);

        commit('setUser', {
            token: resData.idToken,
            userId: resData.localId,
            tokenExpiration: resData.expiresIn,
        });
    },

    async signup({ commit }, payload) {
        const params = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAlwBgXH5OcFcsUvq4orU97CRCj3kKZn6c`, {
            method: 'POST',
            body: JSON.stringify(params),
        });

        const resData = await response.json();

        if(!response.ok) {
            throw new Error(resData.message || 'Failed to signup!');
        }

        console.log(response, resData);

        commit('setUser', {
            token: resData.idToken,
            userId: resData.localId,
            tokenExpiration: resData.expiresIn,
        });
    },

    logout({ commit }) {
        commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null,
        });
    }
}