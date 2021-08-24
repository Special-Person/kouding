<template>
    <div id="app">
        <keep-alive>
            <router-view :key="$route.fullPath" />
        </keep-alive>
        <MyTabbar v-if="$route.meta['showTabbar']" />
    </div>
</template>

<script>
import MyTabbar from "@/components/MyTabbar";

export default {
    components: {
        MyTabbar
    }
};
</script>

<style lang="scss">
* {
    -webkit-text-size-adjust: none;
}
body {
    background: #efefef;
}
</style>
