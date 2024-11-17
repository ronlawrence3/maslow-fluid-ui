<template>
    <Card :style="{ width: '100%', height: '100%' }">
        <template #title>GCode</template>
        <template #content>
            <canvas class="gcode-display" id="gcode-canvas" style="width: 100%; height:calc(100% - 60px)"></canvas>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Card from 'primevue/card'

let canvasContext: CanvasRenderingContext2D;

onMounted(() => {
    console.log('HERE');
    const canvas = document.querySelector<HTMLCanvasElement>('#gcode-canvas');
    canvasContext = canvas?.getContext('2d') as any;
    if (canvasContext) {
        canvasContext.fillStyle = "#ffaaff"
        canvasContext.fillRect(0, 0, 100, 100);

    }
});
</script>

<style scoped>
.gcode-display {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    border-radius: 5px;
    width: 100%;
    height: 100%;
}
</style>