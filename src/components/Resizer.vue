<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col :cols="leftPaneWidth" class="left-pane">
                <slot name="left-pane"></slot>
            </v-col>
            <v-divider vertical class="sash" @mousedown="startResize"></v-divider>
            <v-col :cols="rightPaneWidth" class="right-pane">
                <slot name="right-pane"></slot>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            leftPaneWidth: 6,
            rightPaneWidth: 6,
            isResizing: false,
            startX: 0,
            startLeftWidth: 0,
        };
    },
    methods: {
        startResize(event) {
            this.isResizing = true;
            this.startX = event.clientX;
            this.startLeftWidth = this.leftPaneWidth;
            document.addEventListener('mousemove', this.onResize);
            document.addEventListener('mouseup', this.stopResize);
        },
        onResize(event) {
            if (!this.isResizing) return;
            const deltaX = event.clientX - this.startX;
            const newLeftWidth = this.startLeftWidth + deltaX / window.innerWidth * 12;
            this.leftPaneWidth = Math.min(Math.max(newLeftWidth, 1), 11);
            this.rightPaneWidth = 12 - this.leftPaneWidth;
        },
        stopResize() {
            this.isResizing = false;
            document.removeEventListener('mousemove', this.onResize);
            document.removeEventListener('mouseup', this.stopResize);
        },
    },
};
</script>

<style scoped>
.left-pane {
    background-color: #f5f5f5;
}

.right-pane {
    background-color: #e0e0e0;
}

.sash {
    cursor: ew-resize;
    width: 5px;
    background-color: #ccc;
}
</style>