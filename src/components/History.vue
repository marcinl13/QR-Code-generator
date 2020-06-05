<template>
  <div>
    <!-- <p>{{ msg }}</p> -->
    <table v-if="generatedQRList.length>0">
      <thead>
        <th>No.</th>
        <th>Query</th>
        <th>QR Code</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="(key, index) in generatedQRList" :key="index">
          <td>{{index+1}}</td>
          <td>{{key.query}}</td>
          <td>
            <img :src="key.img" :alt="key.query" />
          </td>
          <td>
            <input type="button" value="delete" @click="deleteItem(key.query, index)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { save } from "../loadSaveData";

export default {
  name: "History",
  props: {
    generatedQRList: Array
  },
  methods: {
    deleteItem(item, index) {
      const afterRemove = this.generatedQRList.splice(index, 1);

      save(afterRemove);
    }
  }
};
</script>

<style scoped>
th,
tr,
td {
  border: 1px solid black;
}

img {
  width: 90px;
  height: 90px;
}
</style>