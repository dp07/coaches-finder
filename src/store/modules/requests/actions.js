export default {
    async coachContact({ commit }, payload) {
        const coachId = payload.coachId;

        const newRequest = {
            email: payload.email,
            message: payload.message,
        };

        const response = await fetch(`https://vue-http-e77d5-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });
        
        const resData = await response.json();

        if(!response.ok) {
            throw new Error(resData.message || 'Failed to send request!');
        }

        // set new id and coach id
        newRequest.id = resData.name;
        newRequest.coachId = coachId,

        commit('addRequest', newRequest);
    },

    async loadRequests({commit, rootGetters}) {
        const userId = rootGetters.userId;
        const token = rootGetters.token;

        const response = await fetch(`https://vue-http-e77d5-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${userId}.json?auth=${token}`);
        
        const resData = await response.json();

        if(!response.ok) {
            throw new Error(resData.message || 'Failed to fetch data!');
        }

        const requests = [];
        for (const key in resData) {
            const newReq = {
                id: key,
                coachId: userId,
                email: resData[key].email,
                message: resData[key].message,
            };

            requests.push(newReq);
        }

        commit('setRequests', requests);
    },
}