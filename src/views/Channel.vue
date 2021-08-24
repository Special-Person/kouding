<template>
    <div>
        <van-tabs @click="toChannel(curIndex)" v-model="curIndex">
            <van-tab :name="item.id" v-for="item in brotherCategory" :title="item.name" :key="item.id">
                <div class="title_desc">
                    <h2>{{ item.name }}</h2>
                    <p>{{ item.front_desc }}</p>
                </div>
            </van-tab>
        </van-tabs>

        <ProductItem :goodsList="goodsList" />
    </div>
</template>

<script>
import ProductItem from "../components/ProductItem.vue";
import { getGoodsCategory, getGoodsList } from "../api";
export default {
    components: {
        ProductItem
    },
    data() {
        return {
            brotherCategory: [],
            currentCategory: {},
            curIndex: +sessionStorage.getItem("ChannelTabIndex"),
            goodsList: []
        };
    },
    async created() {
        if (this.$route.params.id >= 0 || +sessionStorage.getItem("ChannelTabIndex")) {
            // 获取所有栏
            let {
                data: { brotherCategory, currentCategory }
            } = await getGoodsCategory({
                id: this.$route.params.id || +sessionStorage.getItem("ChannelTabIndex")
            });

            this.brotherCategory = brotherCategory;
            this.currentCategory = currentCategory;
            this.curIndex = currentCategory.id;
            sessionStorage.setItem("ChannelTabIndex", this.curIndex);

            // 获取当前栏的数据
            this.getGoodsList();
        }
    },
    methods: {
        toChannel(id) {
            this.curIndex = id;
            sessionStorage.setItem("ChannelTabIndex", this.curIndex);
            this.getGoodsList();
        },
        getGoodsList() {
            getGoodsList({
                categoryId: this.curIndex,
                page: 1,
                size: 1000
            }).then(res => {
                this.goodsList = res.data.goodsList || [];
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.title_desc {
    text-align: center;

    h2 {
        font-size: 1.2rem;
        height: 50px;
        line-height: 50px;
    }
    p {
        height: 30px;
        line-height: 30px;
        color: #666;
    }
}
</style>
