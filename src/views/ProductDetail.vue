<template>
    <div class="product-detail">
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" indicator-color="white">
            <van-swipe-item v-for="(item, index) in gallery" :key="index">
                <img :src="item.img_url" width="100%" alt="" />
            </van-swipe-item>
        </van-swipe>

        <Tips />

        <div class="info">
            <h3>{{ info.name }}</h3>
            <p>{{ info["goods_brief"] }}</p>
            <div>{{ info["retail_price"] || 0 | filterPrice }}</div>
        </div>

        <div class="attribute" v-if="attribute.length !== 0">
            <h4>产品参数</h4>
            <ul>
                <li v-for="(item, index) in attribute" :key="index">
                    <span class="van-ellipsis">{{ item.name }}</span>
                    <div class="van-ellipsis">{{ item.value }}</div>
                </li>
            </ul>
        </div>

        <div class="desc" v-html="info['goods_desc']"></div>

        <div class="issue" v-if="issue.length !== 0">
            <div class="title">
                <span>常见问题</span>
            </div>
            <ul class="question">
                <li v-for="item in issue" :key="item.id">
                    <h3>{{ item.question }}</h3>
                    <p>{{ item.answer }}</p>
                </li>
            </ul>
        </div>

        <div class="favorite">
            <div class="title">
                <span>猜你喜欢</span>
            </div>
            <ProductItem :goodsList="goodsList" />
        </div>

        <van-sku v-model="show" ref="sku" :sku="sku" :goods="goods" :hide-stock="sku.hide_stock" />

        <MyGoodsAction :badge="badge" @addToCart="addToCart" />
    </div>
</template>

<script>
import { queryProduct, addCart, queryRelatedProduct, getCartCount } from "../api";
import Tips from "../components/Tips";
import ProductItem from "../components/ProductItem";
import MyGoodsAction from "../components/MyGoodsAction";
export default {
    components: {
        Tips,
        ProductItem,
        MyGoodsAction
    },
    data() {
        return {
            gallery: [],
            info: {},
            attribute: [],
            issue: [],
            productList: [],
            show: false,
            goodsList: [],
            goods: {
                // 默认商品 sku 缩略图
                picture: "https://img01.yzcdn.cn/1.jpg"
            },
            sku: {
                tree: [],
                hide_stock: false,
                price: 0,
                stock_num: ""
            },
            badge: 0
        };
    },
    async created() {
        let token = localStorage.getItem("token");

        let {
            data: { gallery, info, attribute, issue, productList }
        } = await queryProduct({
            id: this.$route.query.id
        });

        if (gallery.length === 0) {
            this.gallery = [
                {
                    img_url: info.list_pic_url
                }
            ];
        } else {
            this.gallery = gallery;
        }

        this.info = info;
        this.attribute = attribute;
        this.issue = issue;
        this.productList = productList;

        this.goods.picture = info["list_pic_url"];
        this.sku.price = Number(info["retail_price"]).toFixed(2);
        this.sku.stock_num = info["goods_number"];

        queryRelatedProduct({
            id: this.$route.query.id
        }).then(res => {
            this.goodsList = res.data.goodsList;
        });

        if (token) {
            getCartCount().then(res => {
                this.badge = res.data.cartTotal.goodsCount;
            });
        }
    },
    methods: {
        async addToCart() {
            if (this.show) {
                let token = localStorage.getItem("token");
                if (!token) {
                    this.$toast("请先登录");
                    this.$router.push({ name: "User" });
                    return;
                }

                // 加入购物车

                let res = await addCart({
                    goodsId: this.$route.query.id,
                    productId: this.productList[0].id,
                    number: this.$refs.sku.getSkuData().selectedNum
                });

                this.badge = res.data["cartTotal"]["goodsCount"];
                this.show = false;
                this.$toast("成功加入购物车");
            } else {
                this.show = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.product-detail {
    margin-bottom: 80px;
}
.info {
    background-color: #fff;
    text-align: center;
    padding: 20px 0;

    h3 {
        font-weight: normal;
        font-size: 1.2rem;
    }

    p {
        color: #999;
        font-size: 1rem;
        margin: 10px 0;
    }

    div {
        color: #f40;
        font-size: 1rem;
    }
}
.attribute {
    background-color: #fff;
    padding: 20px 4%;

    h4 {
        font-weight: normal;
        margin-bottom: 15px;
    }

    ul {
        background-color: #efefef;
        border-radius: 5px;
        padding: 5px;

        li {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            line-height: 1.4rem;

            span {
                width: 20%;
                text-align: right;
            }

            div {
                flex: 1;
                margin-left: 10px;
            }
        }
    }
}
.desc {
    ::v-deep p {
        font-size: 0;

        img {
            display: block;
            width: 100%;
        }
    }
}
.issue {
    background-color: #fff;
    padding: 12px 0;
    .question {
        padding: 0 4%;

        li {
            list-style: square;
            margin: 0 6% 10px;

            h3 {
                height: 1.6rem;
                line-height: 1.6rem;
            }

            p {
                font-size: 0.8rem;
                color: #666;
                margin-top: 5px;
            }
        }
    }
}

div.title {
    width: 100%;
    height: 3rem;
    position: relative;
    background-color: #fff;

    &:before {
        content: "";
        position: absolute;
        width: 50%;
        height: 1px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #ccc;
    }

    > span {
        position: relative;
        display: block;
        width: 25%;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        margin: 0 auto;
        color: #999;
        background-color: #fff;
    }
}

.van-goods-action {
    z-index: 9999;
}

.van-sku-container {
    min-height: auto;
}
</style>
