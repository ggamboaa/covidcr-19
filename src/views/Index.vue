<template>
  <div class="container">
    <div style="height: 200px;" class="text-center">
      <h1>Covid-19 Costa Rica vs {{ country }}</h1>
      <select v-model="country" @change="onCountryChange">
        <option v-for="element in getCountries" :key="element">{{ element }}</option>
      </select>
      Acción
      <select v-model="type" @change="onTypeChange">
        <option value="confirmed">Confirmados</option>
        <option value="deaths">Muertes</option>
        <option value="recovered">Recuperados</option>
      </select>
      <graph-line
        :width="600"
        :height="400"
        :shape="'normal'"
        :axis-min="0"
        :axis-max="getTypeMax"
        :axis-full-mode="true"
        :labels="getDates"
        :names="names"
        :values="values"
      >
        <note :text="'Line Chart'"></note>
        <tooltip :names="names" :position="'right'"></tooltip>
        <legends :names="names"></legends>
        <guideline :tooltip-y="true"></guideline>
      </graph-line>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  /**  Properties that are reactives, keep hearing changes on data to apply some logic.
   * They can't receive parameters @type {Object} */
  computed: {
    /** Get the list of available countris @return {Array} */
    getCountries() {
      if (!this.dataSet) {
        return [];
      }

      return Object.keys(this.dataSet);
    },

    /** Get the date's array @return {Array} */
    getDates() {
      if (!this.dataSet) {
        return [];
      }

      return this.slice(this.dataSet['Costa Rica'].map((data) => data.date));
    },

    /** Get the max number of cases in the selected type @return {Number} */
    getTypeMax() {
      if (this.values.length === 0) {
        return;
      }

      const first = this.values[0][this.values[0].length - 1];
      const second = this.values[1][this.values[1].length - 1];

      return first > second ? first + this.limit : second + this.limit;
    },
  },

  /** The component's local methods.
   * They aren't reactive & Can receive parameters @type {Object} */
  methods: {
    /** Get the specific data @return {void} */
    getData() {
      this.values = [];

      this.values.push(
        this.slice(this.dataSet['Costa Rica'].map((data) => data[this.type])),
      );

      this.values.push(
        this.slice(this.dataSet[this.country].map((data) => data[this.type])),
      );
    },

    /** Slice the array
     * @param {Array} array
     * @return {Array} */
    slice(array) {
      return array.slice(array.length - this.limit, array.length);
    },

    /** Handle the on change country event @return {void}  */
    onCountryChange() {
      this.names.pop();

      this.names.push(this.country);

      this.getData();
    },

    /** Handle the on change type event @return {void}  */
    onTypeChange() {
      this.getData();
    },
  },

  /** The component's name used for debuggin. @type {String} */
  name: 'Index',

  /** The component's created lifecycle hook. @return {void}  */
  async created() {
    const response = await axios.get(
      'https://pomber.github.io/covid19/timeseries.json',
    );

    this.dataSet = response.data;
  },

  /** Get the component's initial state. @type {Object}  */
  data() {
    return {
      country: 'Panama',
      dataSet: null,
      limit: 10,
      names: ['Costa Rica', 'Panama'],
      type: 'confirmed',
      values: [],
    };
  },
};
</script>
