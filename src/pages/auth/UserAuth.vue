<template>
    <base-card>
        <base-dialog :show="!!error" title="An error occured" @close="error = null">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating..." fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="email"></label>
                <input type="email" id="email" v-model.trim="email">
            </div>
            <div class="form-control">
                <label for="password"></label>
                <input type="password" id="password" v-model.trim="password">
            </div>
            <div class="actions">
                <base-button>{{ sButtonCap }}</base-button>
                <base-button type="button" mode="flat" @click.prevent="handleChangeMode">{{ cModeCap }}</base-button>
            </div>
        </form>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null,
        }
    },

    computed: {
        sButtonCap() {
            return this.mode == 'login' ? 'Login' : 'Signup';
        },

        cModeCap() {
            return this.mode == 'login' ? 'Signup instead' : 'Login instead';
        },
    },

    methods: {
        async submitForm() {
            this.formIsValid = true; // reset form validatin
            if(!this.email || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid = false;
                return;
            }

            this.isLoading = true;

            try {
                // send request
                if(this.mode == 'login') {
                    await this.$store.dispatch('login', {
                        email: this.email,
                        password: this.password,
                    });
                } else {
                    await this.$store.dispatch('signup', {
                        email: this.email,
                        password: this.password,
                    });
                }

                const recUrl = '/' + (this.$route.query.rec || 'coaches');
                this.$router.replace(recUrl);
            } catch (error) {
                console.log(error);
                this.error = error.message || 'Failed to authenticate. Please check email and password again!'
            }

            this.isLoading = false;
        },

        handleChangeMode() {
            if(this.mode == 'login'){
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        },
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.actions {
    display: flex;
    column-gap: 10px;
}
</style>