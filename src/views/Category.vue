<template>
	<div class="category">
		<van-search
			v-model="searchVal"
			shape="round"
			background="#fff"
			disabled
			placeholder="请输入搜索关键词"
			@click="toPopup"
		/>

		<div class="content">
			<van-sidebar class="content__left" v-model="activeKey">
				<van-sidebar-item
					v-for="item in categoryList"
					:key="item.id"
					:title="item.name"
				/>
			</van-sidebar>
			<div class="content__right">
				<div class="banner">
					<img v-lazy="currentCategory.banner_url" alt="" />
					<h5>{{ currentCategory.front_name }}</h5>
				</div>
				<div class="title">
					<span>{{ currentCategory.name }}</span>
				</div>
				<van-grid :column-num="3">
					<van-grid-item
						v-for="item in currentCategory.subCategoryList"
						:key="item.id"
						:icon="item.wap_banner_url"
						:text="item.name"
						@click="toProduct(item)"
					/>
				</van-grid>
			</div>
		</div>

		<!-- popup -->
		<transition name="van-slide-right">
			<router-view />
		</transition>
	</div>
</template>

<script>
import { getAllCategory, getCurCategory } from "../api";

export default {
	data() {
		return {
			searchVal: "",
			activeKey: 0,
			categoryList: [],
			currentCategory: {},
		};
	},
	created() {
		getAllCategory().then((res) => {
			let { categoryList, currentCategory } = res.data;
			this.categoryList = categoryList;
			this.currentCategory = currentCategory;
		});
	},
	methods: {
		toPopup() {
			this.$router.push({ name: "CategoryPopup" });
		},
		toProduct(item) {
			if (item.name) {
				this.$router.push({
					path: "/product",
					query: {
						keyWord: item.name,
					},
				});
			}
		},
	},
	watch: {
		async activeKey(newVal, oldVal) {
			await getCurCategory({
				id: this.categoryList[newVal].id,
			}).then((res) => {
				let { currentCategory } = res.data;
				this.currentCategory = currentCategory;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.category {
	margin-bottom: 60px;
}

.content {
	position: absolute;
	top: 54px;
	bottom: 50px;
	width: 100%;
	background-color: #fff;

	&__left {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 80px;
	}

	&__right {
		position: absolute;
		left: 80px;
		right: 0;
		top: 0;
		bottom: 0;
		padding: 15px 5px;
		overflow: hidden scroll;

		.banner {
			width: 100%;
			position: relative;

			img {
				height: 140px;
				width: 95%;
				margin: 0 7px;
				border-radius: 5px;
				box-shadow: 0 0 6px #000;
				filter: brightness(0.5);
			}

			h5 {
				color: #fff;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
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
		width: 40%;
		height: 2px;
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
		color: #333;
		background-color: #fff;
	}
}
</style>
