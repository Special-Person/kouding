<template>
	<van-list :finished="finished" finished-text="没有更多了">
		<van-cell
			@click="toProduct(item)"
			v-for="item in searchList"
			:key="item"
			:title="item"
		/>
	</van-list>
</template>

<script>
export default {
	props: {
		searchList: Array,
	},
	data() {
		return {
			list: [],
			finished: true,
		};
	},
	methods: {
		toProduct(val) {
			if (val) {
				this.$router.push({
					path: "/product",
					query: {
						keyWord: val,
					},
				});
			}
		},
	},
};
</script>

<style lang="" scoped></style>
