<template>
    <base-card>
        <h2>Regitser as a coach now!</h2>
        <coach-form @save-data="onSaveData"></coach-form>
    </base-card>
</template>

<script>
import CoachForm from '../../components/cosches/CoachForm.vue';

export default {
    components: {
        CoachForm,
    },

    methods: {
        onSaveData(formData) {
            this.$store.dispatch('coaches/saveData', formData);
            this.$router.replace('/coaches');
        }
    }
}
</script>