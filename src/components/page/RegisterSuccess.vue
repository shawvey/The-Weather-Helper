<template>
	<div class="whole">
		<div class="userContent2">
			<div class="eidt-success">
                <div class="show-success">
                    <i class="el-icon-check"></i>&nbsp;&nbsp;<span>Congratulations! You've successfully registered!</span>
                </div> 
                <div class="click-login">
                    <a href="#" @click="handleCommand()">Go to login</a>
                </div>            	
            </div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
            return {
				form: {

				}
			}
        },
        methods: {
            handleCommand() {
                this.$router.push('/login');
            }
        }	
    }
	
</script>

<style>
    .whole{
        position:absolute;
        top:0;
        left:0;
        height:100%;
        width:100%;
        background-image:url("/static/img/bg.png"); 
        background-position: center 0;
        background-repeat: no-repeat;
        background-attachment:fixed;
        background-size: cover;
        -webkit-background-size: cover;/* 兼容Webkit内核浏览器如Chrome和Safari */
        -o-background-size: cover;/* 兼容Opera */
        zoom: 1; 
    }
	.userContent2 {
		width: 100%;
		margin: 0 auto;
		background-size: cover;
        margin-top:250px;
	}
    .eidt-success {
		margin: 0 auto;
		position: relative;
        margin-top:100px;
		
	}
	.eidt-success .show-success {
		position: absolute;
		margin-left: -190px;
		left: 50%;
	}
    .click-login {
        position: absolute;
        left: 50%;
        top: 50px;
    }
	.eidt-success i {
		color: #67C23A;
	}
	.eidt-success i,.eidt-success span {
		font-size: 20px;
	}
</style>