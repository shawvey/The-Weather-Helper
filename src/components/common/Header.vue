<template>
    <div class="header">
        <div class="logo" @click='backToHomepage'>
            <img src='static/img/logo.svg'/>
            <div class='product-name'>
				<span>The<br>Weather<br>Helper</span>
			</div>
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userCenter">User Center</el-dropdown-item>
                    <el-dropdown-item command="loginout">Log out</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import AppModel from '../page/AppModel.js'
    export default {
        data() {
            return {
                name: 'shaw'
            }
        },
        computed:{
            username(){
                let username = sessionStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    sessionStorage.removeItem('ms_username')
                    sessionStorage.removeItem('ms_userId')
                    this.$router.push('/');
                } else if (command == 'userCenter') {
                    this.$router.push('/readme');
                }
            },
            backToHomepage(){
                this.$router.push('/')
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        display:block;
        float:left;
        margin:0 auto;
        width:75px;
        font-size: 10px;
        line-height:10px;
        margin-top:15px;
        margin-left:30px;
        cursor:pointer;
    }

	.header .logo .product-name {
		font-weight: bold;
        float:right;
        margin-top:7px;
        color:#5789B4;
        filter: drop-shadow(-1.5px 1.5px 0px #120E52);
	}

	.header .logo img {
        float:left;
        max-width:20px;
		filter: drop-shadow(-4px 4px 0px #120E52);
	}
    
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
