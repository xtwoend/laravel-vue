<template>
    <div>
        <div class="layout">
            <!-- <div class="layout-ceiling">
                <div class="layout-ceiling-main">
                    <a href="#">Home</a> |
                    <a href="#">About</a> |
                    <a href="#">Login</a>
                </div>
            </div> -->
            <div class="layout-header">
                <Menu mode="horizontal">
                    <div class="layout-logo"></div>
                    <div class="layout-nav"  v-if="$store.getters.isAuth">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-bell" size="24"></Icon>
                            </template>
                            <Menu-group title="Group 1">
                                <Menu-item name="1-1">Hello</Menu-item>
                            </Menu-group>
                            <Menu-group title="Group 2">
                                <Menu-item name="1-4">testing</Menu-item>
                            </Menu-group>
                        </Submenu>
                        <i-button type="text" @click="logOut">
                            <Icon type="log-out" size="24"></Icon>
                        </i-button>
                    </div>
                </Menu>
            </div>
            <div class="layout-content">
                <slot></slot>
            </div>
            <div class="layout-copy">
                2017 &copy; xtwoend
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'default',
    methods: {
        logOut () {
            this.$store.commit('LOGOUT');
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="css" scoped>
.layout{
    /*border: 1px solid #d7dde4;*/
    background: #f5f7f9;
    position: relative;
    /*border-radius: 4px;*/
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-content {
    margin: 10px;
    min-height: 100%;
}
.layout-nav {
    float: right;
}
.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.layout-ceiling{
    background: #464c5b;
    padding: 10px 0;
    overflow: hidden;
}
.layout-ceiling-main{
    float: right;
    margin-right: 15px;
}
.layout-ceiling-main a{
    color: #9ba7b5;
}
</style>