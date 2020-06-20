<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> Readme</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            Our website was built with Vue.js, Express, Element UI, axios, and SQLite3. We separated the back end from the front end, there are three shell commands needs to run. First of all, users need to enter the Weather-Helper folder and run ‘npm install’ for installing all of module dependencies. Secondly, users should execute ‘npm run dev’ in order to open our website. Finally, you need to move to service folder (open another terminal), and then run ‘node app’ for opening our server.
            <br><br>
            This website allows users to search current weather information and forecast for any location including over 200,000 cities. Users can register an account for themselves by filling personal information and then log in. We also provide an account for testing (username: test password:123456). When users logged into user center, they can modify their personal information and password. If users do not want to stay in the personal center and close this session, they can click logout button in the upper right corner.
            <br><br>
            Based on our preliminary version, we fixed several bugs in this website:
            <br><br>
            1) Captcha is working now.<br><br>
            2) We keep the session of searching weather information alive.<br><br>
            3) Users can quickly return the home page by clicking the logo in the upper left corner.
            <br><br>
            Due to the limited time, we have to abandon the implementation of some extension functions such as night mode. In the future, we will spend time on improving this website.
            <br><br>
    
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>