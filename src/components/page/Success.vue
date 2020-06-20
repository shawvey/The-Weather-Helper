<template>
	<div class="main-content">
		<div class="crumbs">
			<el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>&nbsp;&nbsp;Modified successfully</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="eidt-success">
			<div>
				<i class="el-icon-check"></i>&nbsp;&nbsp;<span>Congratulations! You've successfully modified!</span>
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
		}	
    }
	
</script>

<style>
	.main-content{
		background-size: cover;
		height: 100%;
	}
	.eidt-success {
		margin: 0 auto;
		position: relative;
        top:100px;
		
	}
	.eidt-success div {
		position: absolute;
		margin-left: -190px;
		left: 50%;
	}
	.eidt-success i {
		color: #67C23A;
	}
	.eidt-success i,.eidt-success span {
		font-size: 15px;
	}
</style>