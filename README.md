# 前言

初学vue时,在官方文档上遨游甚久,而对真实项目有点难以入手,经过公司项目锻炼以后,有所进步,但也是浅尝辄止,还需要更多的机会去参与,去琢磨。

__注：此为简单的vue demo，并不区别太多参考价值，欢迎完善__


## 技术栈

vue2 + vuex  + webpack + ES6/7 + fetch + less + ivew + node.js + mongoDB


## 项目运行

#### 注意：由于涉及ES6/7诸多代码,因此 对node版本有点要求，本人node版本v8.9.4,
由于文件夹较多，涉及数据的问题，也没使用vue-cli等脚手架 项目运行需要的时间

```
mongo --version

cd d:/data

use uesdcar

git clone https://github.com/wangyuan3181/uesdCar  

cd data

mongoimport -d uesdcar -c cars --drop 生成的汽车模拟数据.txt

cd server

npm install
node app.js

cd vue

npm install
npm run dev

浏览器输入：http://localhost：8080/#/

```

# 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  开发环境 win10 vscode  Chrome 69  nodejs 8.9.4



# 总结

个人小试刀，初入行，乃新人，有不足，多指教


# 部分截图


### 分页条

<img src="https://github.com/wangyuan3181/uesdCar/blob/master/show/%E5%88%86%E9%A1%B5%E6%9D%A1.gif" width="600" height="500"/> <img


### 排序

<img src="https://github.com/wangyuan3181/uesdCar/blob/master/show/%E6%8E%92%E5%BA%8F.gif" width="600" height="500"/>



### 筛选

<img src="https://github.com/wangyuan3181/uesdCar/blob/master/show/%E7%AD%9B%E9%80%89.gif" width="600" height="400"/>

### 拟态框

<img src="https://github.com/wangyuan3181/uesdCar/blob/master/show/%E6%8B%9F%E6%80%81%E6%A1%86.gif" width="600" height="400"/>

# License

