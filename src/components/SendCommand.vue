<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="inputValue" label="Enter gcode here" outlined clearable
                    @keyup.enter="handleEnterKey"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            inputValue: ''
        };
    },
    methods: {
        handleEnterKey() {
            const capturedInput = this.inputValue;
            this.$store.commit('updateInputValue', capturedInput);
            this.inputValue = '';
            this.$store.dispatch('sendGrblCommand', capturedInput);
        }
    }
});
</script>
