<template>
	<div class="my-popup">
		<van-search
			v-model="searchVal"
			show-action
			:placeholder="defaultInfo['keyword'] || '请输入搜索关键字'"
			@input="onInput"
			@search="onSearch"
			@cancel="onCancel"
		/>

		<HomePopupHistoryHot
			:hotList="hotList"
			:historyList="historyList"
			@clearList="historyList = []"
			v-if="!this.searchList.length"
		/>

		<search-list v-else :searchList="searchList" />
	</div>
</template>

<script>
import { getHomePopupData, getRealTimeSearchKeyword } from "../api";
import HomePopupHistoryHot from "@/components/HomePopupHistoryHot";
import SearchList from "@/components/SearchList";

export default {
	components: {
		HomePopupHistoryHot,
		SearchList,
	},
	data() {
		return {
			defaultInfo: {},
			historyList: [],
			hotList: [],
			searchList: [],
			searchVal: "",
		};
	},
	created() {
		getHomePopupData().then((res) => {
			if (res.errno === 0) {
				let {
					defaultKeyword,
					historyKeywordList,
					hotKeywordList,
				} = res.data;

				this.defaultInfo = defaultKeyword;

				this.historyList = historyKeywordList;

				this.hotList = hotKeywordList;
			}
		});
	},
	methods: {
		onSearch(val) {
			// 跳转到产品列表页
			if (val) {
				this.$router.push({
					path: "/product",
					query: {
						keyWord: val,
					},
				});
			}
		},
		onCancel() {
			this.$router.go(-1);
		},
		onInput(val) {
			if (val) {
				getRealTimeSearchKeyword({ keyword: val }).then((res) => {
					this.searchList = res ? res.data : [];
				});
			} else {
				this.searchList = [];
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.my-popup {
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 9;
	overflow: hidden scroll;
	background-color: #ffffff;

	::v-deep .van-list {
		position: absolute;
		top: 54px;
		background-color: #fff;
		width: 100%;
		height: auto;
	}
}
</style>
