<template>
  <div></div>
</template>

<script>
    export default {
        mounted() {
            console.log(111);
            // 原地刷新
            this.$router.go(-1);
        }
    };
</script>