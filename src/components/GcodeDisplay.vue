<template>
    <v-card class="gcode-display" :style="{ minWidth: '100px', minHeight: '100px' }">
        <canvas ref="canvas"></canvas>
    </v-card>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
    setup() {
        const canvas = ref(null);
        canvas;
        // console.log(canvas);
    },

    mounted() {
        // Use Vuex store to bind the "canvas" variable
        //  Example: this.canvas = this.$store.state.canvas;
        // You can also use computed properties to bind the variable
    }
}
</script>

<style scoped>
.gcode-display {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    border-radius: 5px;
}
</style>