<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" class="el-submenu-item-css">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" class="el-menu-item-css">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: 'Readme'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'userCenter',
                        title: 'Setting',
                        subs: [
                            {
                                index: 'modifyUser',
                                title: 'Modify userInfo'
                            },
                            {
                                index: 'ModifyPassword',
                                title: 'Modify password'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background-color: #2E363F;
    }
    .el-menu-vertical-demo{
        background-color: #FBF9EB;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-menu-item-css{
        color:#48576B;
    }
    .el-menu-item-css:hover{
        background-color:#FFE082;
    }
    .el-submenu-item-css{
        background-color:#FBF9EB;
    }
    .el-submenu-item-css:hover{
        background-color:#FFE082;
    }

</style>
