export default {
    async saveData({commit, rootGetters}, payload) {
        const userId = rootGetters.userId;
        const token = rootGetters.token;

        const coachData = {
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas,
        };

        const response = await fetch(`https://vue-http-e77d5-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        if(!response.ok) {
            // if errors
        }

        commit('addCoach', {
            ...coachData,
            id: userId,
        });
    },

    async loadCoaches({ commit, getters }, payload) {
        if(!payload.refresh && !getters.shouldUpdate){
            return;
        }
        
        const response = await fetch(`https://vue-http-e77d5-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`);

        const resData = await response.json();
        
        if(!response.ok){
            // if errors
            const error = new Error(resData.message || 'Failed to fetch!');
            throw error;
        }
        const coaches = [];
        for (const key in resData) {
            const newCoach = {
                id: key,
                firstName: resData[key].firstName,
                lastName: resData[key].lastName,
                description: resData[key].description,
                hourlyRate: resData[key].hourlyRate,
                areas: resData[key].areas,
            }

            coaches.push(newCoach);
        }

        commit('setCoaches', coaches);
        commit('setTimestamp');
    }
}