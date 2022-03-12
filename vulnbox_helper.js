// ==UserScript==
// @name         vulbox helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       blue_wayne
// @match        https://user.vulbox.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vulbox.com
// @grant        none
// ==/UserScript==

(function() {
    //得到漏洞类型
    function getType(str){
        var temp='other';
        switch(str){
            case 'Web漏洞 / 注入 / SQL注入':
                temp='sql';
                break;
            case 'Web漏洞 / XSS / 反射型XSS':
                temp='reflex_xss';
                break;
            case 'Web漏洞 / XSS / 存储型XSS':
                temp='storage_xss';
                break;
            case 'Web漏洞 / 弱口令':
                temp='weak_password';
                break;
            case 'Web漏洞 / 上传漏洞':
                temp='file_upload';
                break;
            case 'Web漏洞 / 逻辑漏洞':
                temp='logical_vuln';
                break;
            case 'Web漏洞 / 认证缺陷 / 撞库/扫号/暴力破解':
                temp='brute_force';
                break;

        }
        return temp;
    }
    //得到漏洞简述
    function getIntroduce(type){
        var temp='暂无模板';
        switch(type){
            case 'sql':
                temp='由于应用程序缺少对输入进行安全性检查，攻击者利用现有应用程序，将恶意的SQL命令注入到后台数据库引擎执行，'+
                    '把一些包含攻击代码当做命令或者查询语句发送给解释器，这些恶意数据可以欺骗解释器，从而执行计划外的命令或者未授权访问数据。';
                break;
            case 'storage_xss':
            case 'reflex_xss':
                temp='跨站脚本(XSS)攻击是一种注入类型的攻击，即将恶意脚本注入到本来是良性和可信的网站。 当攻击者使用网络应用程序向不同的终端用户发送'+
                    '恶意代码（通常以浏览器端脚本的形式）时，就会发生XSS攻击。用户在浏览网站、使用即时通讯软件、甚至在阅读电子邮件时，通常会点击其'+
                    '中的链接。攻击者通过在链接中插入恶意代码，就能够盗取用户信息或在终端用户系统上执行恶意代码。';
                break;
            case 'weak_password':
                temp='管理员账号对应密码的长度太短或者复杂度不够，仅包含数字，或仅包含字母等，弱口令容易被破解，'+
                    '一旦被攻击者获取，可用来直接登录数据库系统，读取甚至修改服务器上的文件，或者导致服务器沦陷';
                break;
            case 'file_upload':
                temp='由于代码作者没有对访客提交的数据进行检验或者过滤不严，可以直接提交修改过的数据绕过扩展名的检验，'+
                    '导致攻击者通过上传木马文件，直接得到WEBSHELL，可以读取修改服务器上的文件，或者导致服务器沦陷。';
                break;
            case 'logical_vuln':
                temp='逻辑错误漏洞是指由于程序逻辑不严或逻辑太复杂，导致一些逻辑分支不能够正常处理或处理错误。';
                break;
            case 'brute_force':
                temp='暴力破解攻击是指攻击者通过系统地组合并尝试所有的可能性以破解用户的用户名、密码等敏感信息。'+
                    '攻击者往往借助自动化脚本工具来发动暴力破解攻击，理论上，只要拥有性能足够强的计算机和足够长的时间，大多密码均可以被破解出来。';
                break;
        }
        return temp;
    }
    //得到复现步骤
    function getReappearance(type){
        var temp='暂无模板';
        switch(type){
            case 'sql':
                temp='1. 黑客在漏洞页面测试SQL注入。<br/>'+
                    '2. 发现存在SQL注入，即可尝试注入恶意语句爆出敏感数据。<br/>'+
                    '3. 也可以直接借助全自动化注入工具（比如SQLmap）进行攻击。<br/>';
                break;
            case 'reflex_xss':
                temp='1. 黑客利用XSS漏洞构造危险链接。<br/>'+
                    '2. 诱使用户或管理员访问此链接。<br/>'+
                    '3. XSS攻击生效，javascript代码在受害者本地执行，被盗取重要数据。<br/>';
                break;
            case 'storage_xss':
                temp='1. 黑客利用存储型XSS漏洞，将危险代码驻留到服务器上。<br/>'+
                    '2. 用户或管理员访问页面。<br/>'+
                    '3. XSS攻击生效，javascript代码在受害者本地执行。<br/>';
                break;
            case 'weak_password':
                temp='1. 黑客使用常见口令、默认口令尝试登录，或者使用常见字典进行爆破。<br/>'+
                    '2. 登录成功，获得权限。<br/>';
                break;
            case 'file_upload':
                temp='1. 黑客将木马文件上传到目标服务器。<br/>'+
                    '2. 得到访问地址，进行访问。<br/>'+
                    '3. 即可利用木马执行任意语句，拿到webshell<br/>';
                break;
            case 'logical_vuln':
                temp='暂无模板';
                break;
            case 'brute_force':
                temp='1. 黑客使用Burp等暴力破解工具进行暴力破解、撞库。<br/>'+
                    '2. 根据返回值分析爆破结果，即可能拿到正确的账户密码。<br/>';
                break;
        }
        return temp;
    }
    //得到修复建议
    function getRepair(type){
        var temp='暂无模板';
        switch(type){
            case 'sql':
                temp='1. 通过使用静态和动态测试，定期检查并发现应用程序中的SQL注入漏洞。<br/>'+
                    '2. 通过正则规范用户输入，校验输入数据中是否包含SQL语句的保留字，如：SELECT，WHERE，EXEC，DROP等。或使用转义字符，来修复SQL注入漏洞，以便忽略掉一些特殊字符。<br/>'+
                    '3. 通过使用参数化查询和对象关系映射(Object Relational Mappers，ORM)，来避免和修复注入漏洞。此类查询通过指定参数的占位符，以便数据库始终将它们视为数据，而非SQL命令的一部分。<br/>'+
                    '4. 通过对数据库强制执行最小权限原则，来减缓SQL注入漏洞的影响。籍此，应用程序的每一个软件组件都只能访问、并仅影响它所需要的资源。<br/>'+
                    '5. 对访问数据库的Web应用程序采用Web应用防火墙(Web Application Firewall，WAF)。这有助于识别出针对SQL注入的各种尝试，进而防止此类尝试作用到应用程序上。<br/>'+
                    '6. 避免网站显示SQL错误信息，比如类型错误、字段不匹配等，防止攻击者利用这些错误信息进行一些判断。<br/>';
                break;
            case 'reflex_xss':
            case 'storage_xss':
                temp='1. 在表单提交或者url参数传递前，对需要的参数进行过滤。<br/>'+
                    '2. 将重要的cookie标记为http only, 这样的话Javascript 中的document.cookie语句就不能获取到cookie了。<br/>'+
                    '3. 表单数据规定值的类型，例如：年龄应为只能为int、name只能为字母数字组合。<br/>'+
                    '4. 对数据进行Html Encode 处理。<br/>'+
                    '5. 过滤或移除特殊的Html标签。<br/>'+
                    '6. 过滤JavaScript 事件的标签。<br/>';
                break;
            case 'weak_password':
                temp='1. 修改口令，增加口令复杂度，如包含大小写字母、数字和特殊字符等。<br/>'+
                    '2. 修改默认口令，避免默认口令被猜解。<br/>'+
                    '3. 指定健壮的口令策略，比如指定每隔30天修改一次密码，密码不得与历史密码相同。<br/>';
                break;
            case 'file_upload':
                temp='1. 对上传的文件，返回数据包时隐藏上传文件的路径。<br/>'+
                    '2. 对文件格式限制，只允许某些格式上传。<br/>'+
                    '3. 对文件格式进行校验，前端跟服务器都要进行校验（前端校验扩展名，服务器校验扩展名、Content_Type等），进行MIME文件类型安全检测，上传的文件大小限制。<br/>'+
                    '4. 将上传目录放置到项目工程目录之外，当做静态资源文件路径，并且对文件的权限进行设定，禁止文件下的执行权限。';
                break;
            case 'logical_vuln':
                temp='1. 在输入接口设置验证。<br/>'+
                    '2. 注册界面的接口不要返回太多敏感信息，以防遭到黑客制作枚举字典。<br/>'+
                    '3. 验证码请不要以短数字来甚至，最好是以字母加数字进行组合，并且验证码需要设定时间期限。<br/>';
                break;
            case 'brute_force':
                temp='1. 制定密码复杂度策略，并进行服务加固。密码的长度要大于 8 位，且最好大于 20 位；密码应由数字、大小写字母和特殊符号混合组成；密码的最长有效期为 90 天。<br/>'+
                    '2. 增加验证码机制，每次验证加入Token参数，保证验证码复杂度，防止被自动化识别。<br/>'+
                    '3. 配置好网络访问控制。严格限制将高危服务管理端口直接发布到互联网；建议您使用 VPN 和堡垒机的方式集中管理和审计。<br/>'+
                    '4. 提高内部全员安全意识，禁止借用或共享使用账号。';
                break;
        }
        return temp;
    }

    setTimeout(function() {
        //类型显示文本
        var type=document.getElementById("register_bug_type").nextSibling;

        //所有小按钮，一动小按钮则触发脚本效果
        var radios=document.getElementsByClassName("ant-radio-input");

        //信息展示
        var info=document.getElementById("photo-preview");

        //插入分界
        info.innerHTML+="<hr/><hr/><hr/>";

        //插入标题
        info.innerHTML+="<div style='text-align:center'><h3><b>漏洞盒子助手</b></h3></div>";

        //插入漏洞简介提示
        info.innerHTML+="<p id='intro'></p><br/><br/>";

        //插入漏洞复现提示
        info.innerHTML+="<p id='reappear'></p><br/><br/>";

        //插入修复建议提示
        info.innerHTML+="<p id='repair'></p><br/><br/>";

        //插入一张小图片添加乐趣
        info.innerHTML+="<img src='http://5b0988e595225.cdn.sohucs.com/images/20181221/5b598c56f8fe448b810123c9d824a6e3.jpeg' height=240px><br/><br/>";

        var reappear=document.getElementById("reappear");
        var intro=document.getElementById("intro");
        var repair=document.getElementById("repair");
        intro.innerHTML="<b>漏洞简述：</b><br/>暂无模板";
        reappear.innerHTML="<b>复现步骤：</b><br/>暂无模板";
        repair.innerHTML="<b>修补建议：</b><br/>暂无模板";

        console.log("vulbox helper脚本初始化成功");
        for(var i=0;i<radios.length;i++){
            //给小按钮绑定触发自动填写函数
            radios[i].onclick=function(){
                var temp=getType(type.innerHTML);
                intro.innerHTML="<b>漏洞简述：</b><br/>"+getIntroduce(temp);
                reappear.innerHTML="<b>复现步骤：</b><br/>"+getReappearance(temp);
                repair.innerHTML="<b>修补建议：</b><br/>"+getRepair(temp);
            };
        }
    }, 2000);

})();
