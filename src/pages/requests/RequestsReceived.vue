<template>
    <section>
        <base-dialog :show="!!error" title="An error occured!" @close="error = null">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card>
            <header>
                <h2>Requests Received</h2>
            </header>
            <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
            <ul v-else-if="hasRequests && !isLoading">
                <request-item 
                    v-for="req in requests" 
                    :key="req.id"
                    :email="req.email"
                    :message="req.message"
                ></request-item>
            </ul>
            <h3 v-else>You haven't any requests yet!</h3>
        </base-card>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import RequestItem from '../../components/requests/RequestsItem.vue';

export default {
    components: {
        RequestItem,
    },

    data() {
        return {
            isLoading: false,
            error: null,
        }
    },

    computed: {
        ...mapGetters('requests', ['requests', 'hasRequests']),
    },

    async created() {
        this.isLoading = true;

        try {
            await  this.$store.dispatch('requests/loadRequests');
        } catch (error) {
            this.error = error.message || 'Something went wrong!';
        }

        this.isLoading = false;
    },
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>