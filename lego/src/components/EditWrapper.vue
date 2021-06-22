<template>
  <div class="edit-wrapper" @click="onItemClick(id)" :class="{ active: active }">
    <slot></slot>
    <div @click="removeItem(id)">X</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ['set-active'],
  setup(props, context) {
    const store = useStore<GlobalDataProps>()

    const onItemClick = (id: string) => {
      context.emit('set-active', id)
    }

    const removeItem = (id: string) => {
      store.commit('removeComponent', id)
    }

    // 设置是否在画布区域
    store.commit('setPropsInEditor', props.id);

    return {
      onItemClick,
      removeItem
    }
  }
})
</script>

<style>
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
</style>