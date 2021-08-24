<template>
    <div class="user">
        <van-row class="header" @click="loginPopup">
            <van-col span="6" :style="`background-image:  url(${getAvatar})`" />
            <van-col span="17" class="name">{{ getNickName }}</van-col>
            <van-col span="1">
                <van-icon name="arrow" />
            </van-col>
        </van-row>
        <van-grid :column-num="3" square>
            <van-grid-item @click="toLink(item.to)" v-for="(item, index) in menu" :key="index" :icon="item.icon" :text="item.name" />
            <van-grid-item @click="exit" v-if="this.userInfo" icon="delete-o" text="退出" />
        </van-grid>
        <van-popup v-model="show">
            <van-form @submit="onSubmit">
                <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="pwd" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">登录 (没有账号将自动注册)</van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
import { loginUser } from "../api";

export default {
    data() {
        return {
            show: false,
            username: "",
            password: "",
            userInfo: null,
            menu: [
                { name: "我的订单", icon: "label-o", to: "" },
                { name: "优惠券", icon: "coupon-o", to: "" },
                { name: "礼品卡", icon: "gift-card-o", to: "" },
                { name: "我的收藏", icon: "location-o", to: "" },
                { name: "我的足迹", icon: "flag-o", to: "" },
                { name: "会员福利", icon: "manager-o", to: "" },
                { name: "地址管理", icon: "aim", to: "" },
                { name: "账号安全", icon: "info-o", to: "" },
                { name: "联系客服", icon: "service-o", to: "" },
                { name: "帮助中心", icon: "question-o", to: "" },
                { name: "意见反馈", icon: "records", to: "" }
            ]
        };
    },
    computed: {
        getAvatar() {
            if (this.userInfo) {
                return this.userInfo["avatar"];
            }
            return "https://img01.yzcdn.cn/vant/cat.jpeg";
        },
        getNickName() {
            if (this.userInfo) {
                return this.userInfo["nickname"];
            }
            return "立即登录";
        }
    },
    mounted() {
        let token = localStorage.getItem("token");

        if (token) {
            this.userInfo = JSON.parse(localStorage.getItem("userinfo"));
        }
    },
    methods: {
        onSubmit(values) {
            loginUser(values).then(
                res => {
                    if (res.errno === 0) {
                        let { token, userInfo } = res.data;
                        this.userInfo = userInfo;
                        localStorage.setItem("token", token);
                        localStorage.setItem("userinfo", JSON.stringify(userInfo));
                        this.show = false;
                        this.$toast.success("登录成功");
                    }
                },
                err => {
                    this.$toast.fail("登录失败");
                }
            );
        },
        loginPopup() {
            !localStorage.getItem("token") && (this.show = true);
        },
        toLink(to) {
            if (!to) {
                return this.$toast("功能暂未开放");
            }
            this.$router.push(to);
        },
        exit() {
            this.$toast.loading("退出中");
            setTimeout(() => {
                localStorage.setItem("token", "");
                this.$router.go(0);
            }, 1000);
        }
    }
};
</script>

<style lang="scss" scoped>
.user {
    margin-bottom: 60px;

    .van-popup {
        border-radius: 5px;
    }

    .van-row {
        padding: 1.8rem 1rem;
        height: 6rem;
        line-height: 6rem;
        background-color: #333;
    }

    .van-col {
        color: #fff;
        font-size: 1.2rem;

        &:first-child {
            width: 5rem;
            height: 5rem;
            vertical-align: middle;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            margin: 0.5rem 0;
        }

        &:first-child,
        &:last-child {
            text-align: center;
        }

        &.name {
            padding-left: 10px;
        }
    }
}

.van-form {
    width: 90vw;
    margin: 16px 0;
}
</style>
