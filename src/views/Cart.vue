<template>
    <div class="cart">
        <Tips/>

        <van-checkbox-group v-model="result">
            <CartProductItem
                    @changeCount="setProductCount"
                    v-for="item in cartList" :key="item.id"
                    :goods_id="item.goods_id"
                    :id="item.id"
                    :name="item.product_id"
                    :product_id="item.product_id"
                    :num="item.number"
                    :price="item.retail_price"
                    :title="item.goods_name"
                    :thumb="item.list_pic_url"
            />
        </van-checkbox-group>

        <van-submit-bar :price="goodsPrice * 100" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checked">全选</van-checkbox>
            <template #tip>
                累计共 <span>{{goodsCount}}</span> 件商品
            </template>
        </van-submit-bar>
    </div>
</template>

<script>
    import Tips from "../components/Tips";
    import CartProductItem from "../components/CartProductItem";
    import {getCartItem} from "../api";

    export default {
        components: {
            Tips,
            CartProductItem
        },
        data() {
            return {
                checked: true,
                result: [],
                cartList: [],
                cartTotal: [],
                goodsPrice: 0,
                goodsCount: 0
            };
        },
        watch: {
            checked() {
                // 全部选中才是选中
                if (this.checked) {
                    this.result = this.cartList.map(item => item.product_id);
                } else {
                    this.result = [];
                }
            },
            result() {
                if (this.result.length === this.cartList.length) {
                    this.checked = true;
                }

                if (this.result.length === 0) {
                    this.checked = false;
                }
            }
        },
        methods: {
            onSubmit() {
                this.$toast.loading("提交订单")
            },
            setProductCount(productInfo) {
                if (productInfo.type === "add") {
                    this.goodsCount++;
                    this.goodsPrice += productInfo.price;
                } else if (productInfo.type === "min") {
                    this.goodsCount--;
                    this.goodsPrice -= productInfo.price;
                }
            }
        },
        created() {
            getCartItem().then(res => {
                let {cartList, cartTotal} = res.data;

                this.cartList = cartList;
                this.cartTotal = cartTotal;

                // 设置选中状态
                cartList.map(item => item.checked && this.result.push(item.product_id));

                this.goodsPrice = cartTotal.checkedGoodsAmount;
                this.goodsCount = cartTotal.checkedGoodsCount;
            });
        }
    };
</script>

<style lang="scss" scoped>
    .cart {
        margin-bottom: 60px;
    }

    ::v-deep .van-checkbox-group {
        padding: 12px 4%;

        .van-checkbox__label {
            width: 100%;
            position: relative;
        }

        .van-checkbox {
            background-color: #fafafa;
            padding: 0 10px;
            margin-bottom: 10px;
            border-radius: 5px;
        }
    }

    .van-submit-bar {
        bottom: 50px;
    }
</style>
