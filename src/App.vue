<template>
  <div class="container">
    <div>
      <p>Maslow</p>
    </div>
    <Tabs value="0">
      <TabList>
        <Tab value="0">Maslow</Tab>
        <Tab value="1">Calibration</Tab>
        <Tab value="2">Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <Maslow />
        </TabPanel>
        <TabPanel value="1">
          <p>This will be calibration</p>
        </TabPanel>
        <TabPanel value="2">
          <p>This will be setup</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Maslow from "./components/Maslow.vue";
import Menubar from 'primevue/menubar';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const store = useStore();

const activeTab = ref(0);

const menuItems = [
  {
    label: 'Maslow CNC',
    items: [
      { label: 'Maslow', command: () => { activeTab.value = 0; } },
      { label: 'Calibration', command: () => { activeTab.value = 1; } },
      { label: 'Settings', command: () => { activeTab.value = 2; } }
    ]
  }
];

onMounted(async () => {
  await store.dispatch("loadSettings");
  await store.dispatch("connectToWebsocket");
});

</script>
