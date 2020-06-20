<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i> Personal center</el-breadcrumb-item>
                <el-breadcrumb-item>Modify password</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="userContent">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item prop="pass" label="password">
					<el-input v-model="form.pass" type="password" placeholder="Please enter password"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass" label="confirm password">
					<el-input v-model="form.checkPass" type="password" placeholder="Please enter password again"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('form')">Submit</el-button>
					<el-button @click="onCancle()">Cancel</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
    import axios from 'axios';
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('Please enter password'));
				} else {
					if(this.form.checkPass !== '') {
						this.$refs.form.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('Please enter password again'));
				} else if (value !== this.form.pass) {
					callback(new Error('The two passwords you typed do not match'));
				} else {
					callback();
				}
			};
            return {
				form: {
					pass: '',
					checkPass: ''
				},
				rules: {
					pass: [
                        { validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
				}
			}
        },
        methods:{
        	onSubmit(formName) {
				const self = this;
				let formData = {
					id: sessionStorage.getItem('ms_userId'),
					pass: self.form.pass,
					checkPass: self.form.checkPass
				};			
				self.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/api/user/modifyPassword',formData).then(function(response) {
							console.log(response);
							self.$router.push('/login');
						}).then(function(error) {
							console.log(error);
						})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
        	},
        	onCancle() {
        		this.$router.push('/userCenter');
        	}        	
        }
	}
</script>

<style>
	.userContent {
		width: 400px;
		margin: 0 auto;
	}
</style>
   