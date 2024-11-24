<template>
    <div class="p-fluid">
        <div class="p-field">
            <label for="gcodeInput">Enter gcode here</label>
            <InputText style="width:90%" id="gcodeInput" v-model="inputValue" @keyup.enter="handleEnterKey" />
            <Button icon="pi pi-times" class="p-button-rounded p-button-secondary" @click="handleEnterKey()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useStore } from "vuex";
import { ref } from 'vue';

let inputValue = ref('');
const store = useStore();
function handleEnterKey() {
    const capturedInput = inputValue.value;
    inputValue.value = '';
    store.dispatch('sendGrblCommand', capturedInput);
}
</script>
