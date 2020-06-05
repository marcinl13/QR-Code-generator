<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div>
      <label for="txt">Plain text to generate QR Code</label>
      <input id="txt" v-model="text" value @input="onChange()" />
    </div>
    <input type="button" value="Save QR Code" @click="onSave()" />
    <History v-bind="toSave" :generatedQRList="toSave" />
  </div>
</template>

<script>
import generateQRCode from "./generateQRCode";
import { load, save } from "./loadSaveData";

import History from "./components/History";

export default {
  name: "App",
  components: { History },
  data() {
    return {
      text: "",
      imgSrc: "",
      defaultImage: require("./assets/logo.png"),
      toSave: []
    };
  },
  created() {
    this.toSave = load();
  },
  methods: {
    async onChange() {
      let image = this.$el.firstElementChild;
      const toConvert = String(this.text);

      if (toConvert.length == 0) {
        image.src = this.defaultImage;
      }

      if (toConvert.length > 0) {
        const imageBase64 = await generateQRCode(this.text);

        this.imgSrc = String(imageBase64);
        image.src = imageBase64;
      }
    },
    onSave() {
      if (this.text.length == 0) return;

      const findCopy = this.toSave.some(key => key.query === this.text); //prevent duplicates return bool

      if (findCopy == false) {
        this.toSave.push({ query: this.text, img: this.imgSrc });
        save(this.toSave);
      }
    }
  },
  computed: {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 200px;
  height: 200px;
}
</style>
