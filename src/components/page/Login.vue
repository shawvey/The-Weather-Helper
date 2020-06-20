<template>
    <div class="login-wrap">
        <div class="ms-title">Login</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <div v-if="errorInfo">
                    <span>{{errInfo}}</span>
                </div>
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="Username" ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="Password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item  prop="validate">
                    <el-input v-model="ruleForm.validate" class="validate-code" placeholder="" ></el-input>
                    <div class="code" @click="refreshCode">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                </div>
                <p class="register" @click="handleCommand()">Create an Account</p>
            </el-form>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';
    export default {
        name: 'login',
        data() {
            return {
                identifyCodes: "1234567890",
                identifyCode: "",
                errorInfo : false,
                ruleForm: {
                    name: '',
                    password: '',
                    validate: ''                    
                },
                rules: {
                    name: [
                        { required: true, message: 'please enter username', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'please enter password', trigger: 'blur' }
                    ],
                    validate: [
                        { required: true, message: 'please enter verification code', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            submitForm(formName) {
                // debounceAjax(formName)
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (self.ruleForm.validate != this.identifyCode){
                        alert('Please enter true verification code!')
                    }
                    else if (self.ruleForm.validate== this.identifyCode) {                      
                        axios.post('/api/user/login',JSON.stringify(self.ruleForm))
                        .then((response) => {
                            console.log(response);
                            if (response.data == -1) {
                                self.errorInfo = true;
                                self.errInfo = 'no such user';
                                console.log('Invalid username or password.')
                            } else if (response.data == 0) {
                                console.log('Invalid username or password.')
                                self.errorInfo = true;
                                self.errInfo = 'Invalid username or password.';
                            } else if (response.status == 200) {
                                sessionStorage.setItem('ms_userId',self.ruleForm.name);
                                sessionStorage.setItem('ms_username',self.ruleForm.name);
                                sessionStorage.setItem('ms_user',JSON.stringify(self.ruleForm));
                                self.$router.push('/readme');
                                console.log(JSON.stringify(self.ruleForm)); 
                            }                            
                        }).then((error) => {
                            console.log(error);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleCommand() {
                this.$router.push('/register');
            },
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ];
                }
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin:0 auto;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #5789B4;
        text-shadow: -0.05em 0.05em 0px #120E52;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:240px;
        margin:-150px 0 0 -190px;
        padding:40px;
        background: #fff;
        -webkit-box-shadow: #98B6CA 0px 0px 4px;
        -moz-box-shadow: #98B6CA 0px 0px 4px;
        box-shadow: #98B6CA 0px 0px 4px;
        border-radius:5px;
    }
    .ms-login span {
        color: red;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .code {
        width: 112px;
        height: 35px;
        border: 1px solid #ccc;
        float: right;
        border-radius: 2px;
    }
    .validate-code {
        width: 136px;
        float: left;
    }
    .register {
        font-size:14px;
        line-height:30px;
        color:#999;
        cursor: pointer;
        float:right;
    }
</style>