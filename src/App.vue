<template>
    <div id="app">
        <keep-alive exclude="ProductItem,Product,ProductDetail,Popup">
            <router-view/>
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
