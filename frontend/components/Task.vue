<template>
    <div :class="`task ${task.content.done ? 'is-complete' : ''}`">
        <div class="content">{{ task.content.taskname }}</div>
        <div class="buttons">
            <button @click="toggleDone">{{ task.content.done ? 'undo' : 'Done' }}</button>
            <button @click="removeTask" class="delete">Delete</button>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['task'],
        methods: {
            toggleDone(){
                this.$store.commit('TOGGLE_TASK', this.task);
                //console.log(this.task);
            },
            removeTask(){
                this.$store.commit('REMOVE_TASK', this.task);
            }
        }
    }

</script>
<style></style>