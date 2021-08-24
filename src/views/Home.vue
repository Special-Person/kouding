<template>
    <div class="home">
        <!-- 搜索框点击跳转 -->
        <van-search v-model="searchVal" shape="round" background="#fff" disabled placeholder="请输入搜索关键词" @click="toPopup" />

        <!-- 轮播图  -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in banner" :key="item.id" @click="showToast">
                <img :src="item['image_url']" :alt="item.content" :title="item.content" src="" />
            </van-swipe-item>
        </van-swipe>

        <!--  -->
        <van-grid :column-num="5" square>
            <van-grid-item v-for="item in channel" :key="item.id" :icon="item['icon_url']" :text="item.name" @click="toChannel(item)" />
        </van-grid>

        <!--  -->
        <div class="sale">
            <div class="title">品牌制造商直供</div>
            <ul class="brand">
                <li v-for="item in brandList" :key="item.id" @click="showToast">
                    <img v-lazy="item.list_pic_url" alt="" />
                    <h4>{{ item.name }}</h4>
                    <div>{{ item["floor_price"] | filterPrice }}</div>
                </li>
            </ul>
        </div>

        <!-- 新品发布 -->
        <div class="new-product">
            <h4>周一周四·新品首发</h4>
            <ProductItem :goodsList="goodsList" />
        </div>

        <!-- 人气推荐 -->
        <div class="hot-product">
            <h4>人气推荐</h4>
            <van-card v-for="item in hotGoodsList" :key="item.id" :price="item.retail_price.toFixed(2) + '元'" :desc="item.goods_brief" :title="item.name" :thumb="item.list_pic_url" @click="toProductDetail(item)" />
        </div>

        <!-- 人气推荐 -->
        <div class="special-product">
            <h4>专题精选</h4>

            <van-swipe :loop="false" :width="300" :show-indicators="false">
                <van-swipe-item v-for="item in topicList" :key="item.id">
                    <div @click="showToast">
                        <img :src="item.item_pic_url" alt="" height="200" />
                        <h2>
                            {{ item.title }}
                            <span>{{ item.price_info | filterPrice }}</span>
                        </h2>
                        <p>{{ item.subtitle }}</p>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- 新品发布 -->
        <div class="related-product" v-for="item in categoryList" :key="item.id">
            <h4>{{ item.name }}</h4>
            <ProductItem :goodsList="item.goodsList" />
        </div>

        <!-- popup -->
        <transition name="van-slide-right">
            <router-view />
        </transition>
    </div>
</template>

<script>
import ProductItem from "../components/ProductItem";
import { getHomeData } from "../api";

export default {
    name: "Home",
    components: {
        ProductItem
    },
    data() {
        return {
            searchVal: "",
            banner: [], // 轮播图
            channel: {}, // 五个小导航
            brandList: [], // 产品直供
            goodsList: [], // 新品发布
            hotGoodsList: [], // 人气推荐
            topicList: [], // 专题精选
            categoryList: [] // 相关产品
        };
    },
    async created() {
        let res = await getHomeData();
        const { banner, channel, brandList, newGoodsList, hotGoodsList, topicList, categoryList } = res.data;

        this.banner = banner;
        this.channel = channel;
        this.brandList = brandList;

        this.goodsList = newGoodsList;
        this.hotGoodsList = hotGoodsList;
        this.topicList = topicList;
        this.categoryList = categoryList;
    },
    methods: {
        toPopup() {
            this.$router.push({ name: "HomePopup" });
        },
        toChannel(item) {
            this.$router.push({
                name: "Channel",
                params: {
                    id: item.id
                }
            });
        },
        toProductDetail(item) {
            // 跳转详情页
            this.$router.push({
                path: "/product-detail",
                query: {
                    id: item.id
                }
            });
        },
        showToast() {
            this.$toast("暂时没有接口");
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
    margin-bottom: 60px;
}
.van-swipe-item {
    color: #fff;
    font-size: 0;
    background-color: #f5f7f9;

    img {
        width: 100%;
        max-height: 30vh;
    }

    h2 {
        color: #323232;
        line-height: 40px;
        font-size: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        span {
            color: darkred;
        }
    }

    p {
        color: #323232;
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 90%;
    }
}

.title {
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font-size: 1.2rem;
    color: #333;
}
.sale {
    background-color: #fff;
    margin: 12px 0;
}
.brand {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 4% 12px;
    box-sizing: border-box;

    li {
        width: 50%;
        box-sizing: border-box;
        position: relative;
        margin-top: 10px;

        &:nth-child(odd) {
            padding-right: 5px;
        }
        &:nth-child(even) {
            padding-left: 5px;
        }

        h4 {
            position: absolute;
            left: 10px;
            top: 10px;
            font-size: 1rem;
            color: #fff;
        }

        img {
            width: 100%;
            filter: brightness(0.8);
        }

        div {
            position: absolute;
            left: 10px;
            top: 2rem;
            color: #f40;
            font-size: 0.8rem;
        }
    }
}

.new-product,
.hot-product,
.special-product,
.related-product {
    margin: 12px 0;
    background-color: #fff;
    h4 {
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 1.2rem;
    }
}

.special-product {
    margin: 12px 0;
    padding-left: 15px;
    .van-swipe-item {
        width: 300px;
        padding-bottom: 10px;
        height: auto;
        background-color: #fff;
        div {
            margin-right: 15px;
        }
    }
}
</style>
