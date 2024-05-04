import axios from 'axios';
import authenticated from '../middleware/authenticated';

export const state = () => ({
    tasks: [],
    authenticated: false
})

export const mutations = {
    setAuthenticated(state, isAuthenticated) {
        state.authenticated = isAuthenticated;
    },
    ADD_TASK(state, task){
        state.tasks = [{ content: task}, ...state.tasks];
        
    },
    REMOVE_TASK(state, task){
        state.tasks.splice(state.tasks.indexOf(task), 1);
        axios.delete(`https://task-tracker-app-backend.vercel.app/${task.content._id}`);
    },
    TOGGLE_TASK(state, task){
        task.content.done = !task.content.done;
        
        axios.put(`https://task-tracker-app-backend.vercel.app/${task.content._id}`, {done: true})
        .then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error)
        })
    }
}
