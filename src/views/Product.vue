<template>
    <div class="product">
        <van-search
            v-model="searchVal"
            show-action
            placeholder="请输入搜索关键字"
            @search="onSearch"
            @cancel="onCancel"
            @clear="onClear"
        />
        <!-- 筛选 -->
        <van-dropdown-menu>
            <van-dropdown-item title="综合" get-container="body" disabled />
            <van-dropdown-item
                @change="onChangePrice"
                title="价格"
                get-container="body"
                v-model="priceVal"
                :options="priceArr"
            />
            <van-dropdown-item
                @change="onChangeCategory"
                title="分类"
                get-container="body"
                v-model="CategoryVal"
                :options="filterCategory"
            />
        </van-dropdown-menu>

        <van-empty
            v-if="goodsList.length === 0"
            image="search"
            description="暂时没有此类商品"
        />

        <van-list
            v-else
            v-model="loading"
            :finished="finished"
            finished-text="没有更多商品了"
            :offset="100"
            @load="onLoad"
        >
            <ProductItem :goodsList="goodsList" />
        </van-list>
    </div>
</template>

<script>
import { getSearchKeyword } from "../api";
import ProductItem from "../components/ProductItem.vue";
export default {
    components: {
        ProductItem
    },
    data() {
        return {
            // 搜索
            searchVal: this.$route.query.keyWord || "",
            keyWord: "",
            searchConf: {
                keyword: "",
                page: 1,
                size: 10,
                order: "asc",
                categoryId: "0",
                sort: "id"
            },
            // 筛选
            priceVal: "asc",
            priceArr: [
                { text: "由低到高", value: "asc" },
                { text: "由高到低", value: "desc" }
            ],
            CategoryVal: null,
            filterCategory: [],
            goodsList: [],
            loading: false,
            finished: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            window.scroll({ top: 0 });
            // 初始化默认值 重新发起请求
            this.searchConf = {
                keyword: this.$route.query.keyWord,
                page: 1,
                size: 10,
                order: "asc",
                categoryId: "0",
                sort: "id"
            };

            this.loading = false;
            this.finished = false;
            this.filterCategory = [];
            this.goodsList = [];
            this.keyWord = this.$route.query.keyWord;
        },
        onSearch(val) {
            this.$router.replace({
                path: "/product",
                query: {
                    keyWord: val
                }
            });
        },
        onCancel() {
            this.$router.go(-1);
        },
        onClear() {
            this.keyWord = "";
            this.$router.go(-1);
        },
        onLoad() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.searchConf.page++;
                this.searchProduct();
            }, 300);
        },
        onChangePrice(order) {
            this.searchConf.order = order;
            this.searchConf.sort = "price";
            this.searchProduct();
        },
        onChangeCategory(categoryId) {
            this.searchConf.categoryId = categoryId;
            this.searchProduct();
        },

        // 搜索商品
        searchProduct() {
            getSearchKeyword(this.searchConf).then(res => {
                if (res.errno === 0) {
                    let { filterCategory, goodsList } = res.data;

                    this.filterCategory = filterCategory.map(item => {
                        item.checked && (this.CategoryVal = item.id);

                        return {
                            text: item.name,
                            value: item.id,
                            checked: item.checked
                        };
                    });

                    this.goodsList = this.goodsList.concat(goodsList);

                    if (goodsList.length === 0) {
                        this.finished = true;
                    }
                    this.loading = false;
                }
            });
        }
    },
    watch: {
        keyWord(newVal) {
            if (newVal) {
                this.searchVal = newVal;
                this.searchProduct();
            }
        },
        $route: {
            handler: function(from, to) {
                if (!from || !to) return;
                if (from.fullPath !== to.fullPath) {
                    this.getData();
                }
            },
            immediate: true
        }
    }
};
</script>

<style></style>
