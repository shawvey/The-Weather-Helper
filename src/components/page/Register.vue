<template>
	<div class="login-wrap">
        <div class="ms-title">Register</div>
		<div class="userContent">
			<el-form ref="form" :model="form" :rules="rules" label-width="100px">
				<el-form-item prop="name" label="Username">
					<el-input v-model="form.name" placeholder="Please enter username"></el-input>
				</el-form-item>
				<el-form-item prop="account" label="Account">
					<el-input v-model="form.account" placeholder="Please enter account"></el-input>
				</el-form-item>
				<el-form-item prop="pass" label="Password">
					<el-input v-model="form.pass" type="password" placeholder="Please enter password"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass" label="Confirm password">
					<el-input v-model="form.checkPass" type="password" placeholder="Please enter password again"></el-input>
				</el-form-item>
				<el-form-item prop="email" label="Email">
					<el-input v-model="form.email" placeholder="Please enter email address"></el-input>
				</el-form-item>
				<el-form-item prop="phone" label="Phone">
					<el-input v-model="form.phone" placeholder="Please enter phone number"></el-input>
				</el-form-item>
				<el-form-item prop="card" label="ID">
					<el-input v-model="form.card" placeholder="Please enter ID card number"></el-input>
				</el-form-item>
				<el-form-item prop="birth" label="Birth">
					<el-col :span="24">
						<el-date-picker type="date" placeholder="Select date" v-model="form.birth" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item prop="sex" label="Sex">
					<el-select class="select-sex" v-model="form.sex" placeholder="Select sex">
						<el-option label="Male" value="man"></el-option>
						<el-option label="Female" value="woman"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
                    <div class="bottom-position">
					   <el-button type="primary" @click="onSubmit('form')">Submit</el-button>
					   <el-button @click="onCancle()">Cancle</el-button>
                    </div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Util from '../../utils/utils';
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
			var validateEmail = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Please enter email address'));
				} else if (!Util.emailReg.test(this.form.email)){
					callback(new Error('Please enter correct email address'));
				} else {
					callback();
				}
			};
            return {
				form: {
					name: '',
					account: '',					
					pass: '',
					checkPass: '',
					email: '',
					phone: '',
					card: '',
					birth: '',
					sex: ''
                },
                rules: {
                    name: [
                        { required: true, message: 'Please enter username', trigger: 'blur' }
                    ],
                    account: [
                        { required: true, message: 'Please enter account', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true,validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true,validator: validatePass2, trigger: 'blur' }
                    ],
                    email: [
                        { required: true,validator: validateEmail, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, trigger: 'blur' }
                    ],
                    card: [
                        { required: true, trigger: 'blur' }
                    ],
                    birth: [
                        { required: true, message: 'Please enter birth date',type: 'date', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: 'Please enter sex', trigger: 'blur' }
                    ]
                }
			}
        },
        methods:{
        	onSubmit(formName) {
				const self = this;
				self.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/api/user/addUser',self.form).then(function(response) {
							self.$router.push('/register-success');
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
        		this.$router.push('/login');
			},
			getDateTimes(str) {
				var str = new Date(str);
        		return str;
			}       	
        }
	}
</script>

<style>
    .ms-title{
        width:100%;
        margin-top: 20px;
        margin-bottom: 15px;
        text-align: center;
        font-size:30px;
        color: #5789B4;
        margin-left: 35px;
        text-shadow: -0.05em 0.05em 0px #120E52;

    } 
	.crumbs-register {
		background-color: #324157;
		height: 50px;
		line-height: 50px;
	}
	.register-title {
		line-height: 50px;
		margin: 0 auto;
    	width: 100px;
    	font-size: 16px;
	}	
	.userContent {
		width: 400px;
		margin: 0 auto;
        margin-top:30px;
	}
	.select-sex {
		width: 320px;
	}
    .bottom-position{
        margin-left: 50px;
    }
</style>