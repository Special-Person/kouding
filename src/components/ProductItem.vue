<template>
    <ul class="product">
        <li class="product-item" @click="gotoDetail(item)" v-for="item in goodsList" :key="item.id">
            <div class="img">
                <img v-lazy="item['list_pic_url']" alt="" />
            </div>
            <p class="title van-ellipsis">{{ item.name }}</p>
            <p class="price">{{ item["retail_price"] | filterPrice }}</p>
        </li>
    </ul>
</template>

<script>
export default {
    name: "ProductItem",
    props: {
        goodsList: Array
    },
    data() {
        return {};
    },
    methods: {
        gotoDetail(product) {
            // 跳转详情页
            this.$router.push({
                path: "/product-detail",
                query: {
                    id: product.id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.product {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: scroll;
    background-color: #fff;

    &-item {
        width: 50%;
        box-sizing: border-box;
        background-color: #fff;
        text-align: center;
        margin-bottom: 10px;

        &:nth-child(odd) {
            padding-right: 10px;
        }

        &:nth-child(even) {
            padding-left: 10px;
        }

        .img {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }

        .title {
            font-size: 0.8rem;
            margin: 5px 0;
            color: #333;
        }

        .price {
            font-size: 0.6rem;
            color: #f40;
        }
    }
}
</style>
