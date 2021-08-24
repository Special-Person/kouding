<template>
	<div class="">
		<div class="history">
			<div class="title">
				<p>历史记录</p>
				<van-icon @click="clearMyHistory" name="delete-o" />
			</div>
			<div class="tags">
				<van-tag
					@click="toProduct(item)"
					class="tag"
					plain
					size="medium"
					v-for="(item, index) in historyList"
					:key="index"
					>{{ item }}
				</van-tag>
			</div>
		</div>
		<div class="hot">
			<div class="title">
				<p>热门搜索</p>
			</div>
			<div class="tags">
				<van-tag
					@click="toProduct(item.keyword)"
					class="tag"
					v-for="(item, index) in hotList"
					:key="index"
					plain
					size="medium"
					:type="item['is_hot'] === 1 ? 'danger' : 'default'"
					>{{ item.keyword }}
				</van-tag>
			</div>
		</div>
	</div>
</template>

<script>
import { clearHistory } from "../api";

export default {
	name: "HomePopupHistoryHot",
	props: {
		defaultInfo: Object,
		historyList: Array,
		hotList: Array,
	},
	methods: {
		toProduct(val) {
			// 跳转到产品搜索列表
			if (val) {
				this.$router.push({
					path: "/product",
					query: {
						keyWord: val,
					},
				});
			}
		},
		clearMyHistory() {
			clearHistory().then((res) => {
				if (res.errno === 0) {
					this.$toast.success("删除成功");
					this.$emit("clearList");
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.history,
.hot {
	padding: 0 12px;
	margin-bottom: 20px;

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;
		line-height: 30px;
		margin: 10px 0;

		p {
			font-size: 1.4rem;
		}

		.van-icon {
			padding: 8px;
			font-size: 1.2rem;
		}
	}

	.tags {
		.tag {
			display: inline-block;
			font-size: 1rem;
			margin-right: 10px;
			margin-bottom: 10px;
		}
	}
}
</style>
