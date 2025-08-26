<template>
    <div>
        <base-dialog :show="!!error" title="An error occured!" @close="error = null">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @set-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button v-if="!isLoggedIn" link to="/auth?rec=register">Login as register coach</base-button>
                    <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register">Register as Coach</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches && !isLoading">
                    <coach-item 
                        v-for="coach in filteredCoaches" 
                        :key="coach.id"
                        :id="coach.id"
                        :first-name="coach.firstName"
                        :last-name="coach.lastName"
                        :rate="coach.hourlyRate"
                        :areas="coach.areas"
                    ></coach-item>
                </ul>
                <h3 v-else>No coaches found</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CoachItem from '../../components/cosches/CoachItem.vue';
import CoachFilter from '../../components/cosches/CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter,
    },

    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true,
            },

            isLoading: false,
            error: null,
        }
    },

    computed: {
        ...mapGetters('coaches', [
            'coaches',
            'hasCoaches',
            'isCoach',
        ]),

        isLoggedIn() {
            return this.$store.getters.isAuthenticate;
        },

        filteredCoaches() {
            return this.coaches.filter(coach => {
                if(this.activeFilters.frontend && coach.areas.includes('frontend')){
                    return true;
                }

                if(this.activeFilters.backend && coach.areas.includes('backend')){
                    return true;
                }

                if(this.activeFilters.career && coach.areas.includes('career')){
                    return true;
                }
            })
        }
    },

    created() {
        this.loadCoaches();
    },

    methods: {
        setFilters(filters) {
            this.activeFilters = filters;
        },

        async loadCoaches(refresh = false) {
            this.isLoading = true;
            
            try {
                await this.$store.dispatch('coaches/loadCoaches', { refresh });
            } catch (error) {
                this.error = error.message || 'Something went wrong!';
            }

            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>