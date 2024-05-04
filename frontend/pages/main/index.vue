<template>
  <Tutorial/>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<template>
  <main>
    <h1>Task Board</h1>
    <p>Create a list of tasks</p>

    <div class="create-new">
      <input 
        type="text"
        v-model="newTask"
        placeholder="Add a new task"
        @keypress.enter="addTask"/>
        <button @click="addTask">Add</button>
    </div>

    <div class="tasks">
      <Task 
        v-for="(task, i) in $store.state.tasks" 
        :key="i" 
        :task="task"/>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  // name: 'IndexPage'
  middleware: 'authenticated',

  data(){
    return {
      newTask: ''
    }
  },
  methods: {
    addTask(){
      if(this.newTask){
        axios.post('http://localhost:3001/add', {taskname: this.newTask, done: false})
        .then((response)=>{
          this.$store.commit('ADD_TASK', response.data);
        }).catch((err)=>{
          console.log(err);
        });
        this.newTask = '';
      }
    }
  }
}
</script>