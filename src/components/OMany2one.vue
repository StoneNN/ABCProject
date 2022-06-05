<!--
 * @Author: Nn
 * @Date: 2022-05-31 17:03:12
 * @LastEditors: Nn
 * @LastEditTime: 2022-06-02 16:45:27
 * @Description: 
-->
<template>
  <!-- <div>
    <div>value: {{ value }}</div>
    <div>value2: {{ value2 }}</div>
    <div>options: {{ options }}</div>

    <a-select
      v-model="value2"
      label-in-value
      @change="handleChange"
      style="width: 120px"
    >
      <a-select-option v-for="op in options" :key="op[0]" :value="op[0]">
        {{ op[1] }}
      </a-select-option>
    </a-select>
  </div> -->

  <a-select
    v-model="value2"
    label-in-value
    @change="handleChange"
    :style="compute_style"
    :placeholder="placeholderSet"
  >
    <a-select-option v-for="op in options" :key="op[0]" :value="op[0]">
      {{ op[1] }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: 'OInput',
  props: {
    value: { type: Array, default: null },
    options: { type: Array, default: () => [] },
    width: { type: String, default: undefined },
    placeholder: { type: String, default: undefined }
  },

  data() {
    return {}
  },
  computed: {
    compute_style() {
      if (this.width) {
        return `width: ${this.width}`
      } else {
        return undefined
      }
    },
    placeholderSet(){
      if (this.placeholder) {
        console.log('===================',this.placeholder);
        return this.placeholder;
      } else {
        return '';
      }
    },
    value2: {
      get() {
        return this.value ? { key: this.value[0] } : {}
      },

      set(val) {
        const { key, label } = val
        const label2 = label.trim()
        this.$emit('input', [key, label2])
      }
    }
  },
  methods: {
    handleChange(value) {
      const { key, label } = value
      const label2 = label.trim()
      this.$emit('change', [key, label2])
    }
  }
}
</script>

<style scoped></style>
