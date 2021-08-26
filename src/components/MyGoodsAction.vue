<template>
    <van-goods-action>
        <van-goods-action-icon
                :icon="isCollect ? 'like' : 'like-o'"
                :color="isCollect ? 'darkred' : 'gray'"
                :text="isCollect ? '已收藏' : '未收藏'"
                @click="isCollect = !isCollect"/>
        <van-goods-action-icon @click="$router.push({name: 'Cart'})" icon="cart-o" text="购物车" :badge="badge > 0 ? badge : '' "/>
        <van-goods-action-button @click="addCart" type="warning" text="加入购物车"/>
        <van-goods-action-button @click="nowBuy" type="danger" text="立即购买"/>
    </van-goods-action>
</template>

<script>
    export default {
        props: {
            badge: Number
        },
        data() {
            return {
                isCollect: false
            };
        },
        methods: {
            addCart() {
                this.$emit("addToCart");
            },
            nowBuy() {
            }

        }
    };
</script>