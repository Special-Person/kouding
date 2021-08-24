<template>
    <div class="topic">
        <div class="box" v-for="item in boxList" :key="item.id" @click="showToast">
            <img v-lazy="item.scene_pic_url" alt="" />
            <div class="title">{{ item.title }}</div>
            <div class="tip">{{ item.subtitle }}</div>
            <div class="price">{{ item.price_info | filterPrice }}起</div>
        </div>
        <van-pagination v-model="page" :page-count="totalPages" mode="simple" @change="changePage" />
    </div>
</template>

<script>
import { getTopicList } from "../api";
export default {
    data() {
        return {
            page: 1,
            totalPages: 1,
            boxList: []
        };
    },
    created() {
        this.getTopicList();
    },
    methods: {
        getTopicList() {
            // 获取数据
            getTopicList({
                page: this.page,
                size: 10
            }).then(res => {
                let { data, totalPages } = res.data;
                this.boxList = data;
                this.totalPages = totalPages;
            });
        },
        changePage(page) {
            this.page = page;
            this.getTopicList();
            window.scroll({
                top: 0,
                behavior: "smooth"
            });
        },
        showToast() {
            this.$toast("暂时没有接口");
        }
    }
};
</script>

<style lang="scss" scoped>
.topic {
    margin-bottom: 60px;
    ::v-deep .van-pagination__page-desc {
        display: none;
    }
}

.box {
    background-color: #fff;
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 20px;

    img {
        width: 100%;
    }

    .title {
        font-size: 1.1rem;
        margin: 10px;
    }

    .tip {
        font-size: 1rem;
        margin: 20px;
        color: #1f1f1f;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .price {
        color: #9b0000;
        margin-bottom: 10px;
    }
}
</style>
