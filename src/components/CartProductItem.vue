<template>
	<van-checkbox :name="name" label-disabled v-show="productCount">
		<van-card
			:price="price.toFixed(2)"
			:title="title"
			:thumb="thumb"
			@click="toProductDetail"
			desc="描述信息"
		/>
		<van-stepper
			@change="changeProduct"
			async-change
			@plus="addCount"
			@minus="minCount"
			min="0"
			:value="productCount"
			theme="round"
			button-size="22"
			disable-input
		/>
	</van-checkbox>
</template>

<script>
import { deleteCartProduct, updateCartProduct } from "../api";

export default {
	props: [
		"id",
		"goods_id",
		"product_id",
		"name",
		"num",
		"price",
		"title",
		"thumb",
	],
	data() {
		return {
			productCount: this.num || 0,
		};
	},
	watch: {
		productCount() {
			if (this.productCount === 0) {
				let res = deleteCartProduct({
					productIds: this.name.toString(),
				});
				res.then(() => this.$toast("删除了一件商品"));
			}
		},
	},
	methods: {
		addCount(count) {
			// 向外抛出当前数量以及价格
			this.$emit("changeCount", {
				type: "add",
				price: this.price,
			});
		},
		minCount() {
			// 向外抛出当前数量以及价格
			this.$emit("changeCount", {
				type: "min",
				price: this.price,
			});
		},
		changeProduct(value) {
			this.productCount = value;

			// 更新当前商品数量
			updateCartProduct({
				goodsId: this.goods_id,
				id: this.id,
				number: this.productCount,
				productId: this.product_id,
			});
		},
		toProductDetail() {
			this.$router.push({
				path: "/product-detail",
				query: {
					id: this.goods_id,
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.van-stepper {
	position: absolute;
	right: 0;
	bottom: 10px;
}
</style>
