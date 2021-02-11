<template>
  <div>
    This is a Vue component! <span v-html="first"/> <span v-html="globaldata"/>
  </div>
</template>
<style>

</style>
<script>
export default {
  props: {},
  data: function() {
    return {
      first: "first"
    };
  },
  components: {}
}
</script>