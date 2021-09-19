<template>
    <a-form layout="inline" @submit.prevent="handleSubmit">
        <a-form-item
            label="Задача"
            class="form-item">
            <a-input placeholder="Введите задачу" v-model.trim="title"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :disabled="disableButton">Добавить</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    import ACTIONS from "@/store/ACTIONS";

    export default {
        data: () => ({
            title: ''
        }),
        methods: {
            async handleSubmit() {
                const task = {
                    title: this.title
                };
                await this.$store.dispatch(ACTIONS.ADD_TODO, task);
                this.title = '';
            }
        },
        beforeCreate() {
            //this.form = this.$form.createForm(this, { name: 'customized_form_controls' });
        },
        computed: {
            disableButton() {
                return this.title.trim().length === 0;
            }
        }
    }
</script>

<style scoped>

</style>
