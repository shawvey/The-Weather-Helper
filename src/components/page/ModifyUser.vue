<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i> Personal center</el-breadcrumb-item>
                <el-breadcrumb-item>Modify user details</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="userContent">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item prop="name" label="Username">
					<el-input v-model="form.name" disabled></el-input>
				</el-form-item>
				<el-form-item prop="account" label="Account">
					<el-input v-model="form.account" disabled></el-input>
				</el-form-item>
				<el-form-item prop="email" label="Email">
					<el-input v-model="form.email" placeholder="Please enter email address"></el-input>
				</el-form-item>
				<el-form-item prop="phone" label="Phone">
					<el-input v-model="form.phone" placeholder="Please enter phone number"></el-input>
				</el-form-item>
				<el-form-item prop="card" label="ID">
					<el-input v-model="form.card" placeholder="Please enter ID number"></el-input>
				</el-form-item>
				<el-form-item prop="birth" label="Birthday">
					<el-col :span="24">
						<el-date-picker type="date" placeholder="Select date" v-model="form.birth" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item prop="sex" label="Sex">
					<el-select class="select-sex" v-model="form.sex" placeholder="Please enter sex">
						<el-option label="Male" value="man"></el-option>
						<el-option label="Female" value="woman"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="updateUserData('form')">Submit</el-button>
					<el-button @click="onCancle()">Cancel</el-button>
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
					email: '',
					phone: '',
					card: '',
					birth: '',
					sex: ''
				},
				rules: {
                    email: [
                        { required: true, message: 'Please enter email address',validator: validateEmail, trigger: 'blur' }
                    ],
                    phone: [
                        {  required: true, message: 'Please enter phone number',trigger: 'blur' }
                    ],
                    card: [
                        {  required: true, message: 'Please enter ID number',trigger: 'blur' }
                    ],
                    birth: [
                        { required: true, message: 'Please enter birthday',type: 'date', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: 'Please enter sex', trigger: 'blur' }]
                }
			}
        },
        methods:{		
			updateUserData(formName) {
				const self = this;
				let formData = {
					id: sessionStorage.getItem('ms_userId'),
					email: self.form.email,
					phone: self.form.phone,
					card: self.form.card,
					birth: self.form.birth,
					sex: self.form.sex
				};
						
				self.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/api/user/updateUser',formData).then(function(response) {								
							self.$router.push('/success');
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
	.select-sex {
		width: 320px;
	}
</style>