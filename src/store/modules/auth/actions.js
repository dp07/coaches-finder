export default {
    async login({ commit }, payload) {
        console.log(process.env);
        const params = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        };

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASS_API_KEY}`, {
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

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASS_API_KEY}`, {
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