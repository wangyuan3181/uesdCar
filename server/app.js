const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const url = require("url");
const formidable = require("formidable");
const app = express();
//链接数据库
mongoose.connect("mongodb://127.0.0.1/ershouche",{ useNewUrlParser: true });

//静态化
app.use(express.static("./"));

//Schema，类
const Car = mongoose.model("Car" , {
	"id" 		: 	Number ,
	"price" 	: 	Number,
	"brand" 	: 	String,
	"series" 	: 	String,
	"color" 	: 	String,
	"avatar" 	: 	String,
	"type" 		: 	String,
	"seat" 		: 	Number,
	"km" 		: 	Number,
	"engine" 	: 	String,
	"gearbox" 	: 	String
});

//一辆车的信息
app.get("/carinfo/:id" , (req,res)=>{
	const id = req.params.id;
	Car.find({"id" : id}).exec((err,docs)=>{
		res.json({"carinfo" : docs[0]});
	});
});

//一辆车的图片
app.get("/carimages/:id" , (req,res)=>{
	const id = req.params.id;
	var view = fs.readdirSync(path.resolve(__dirname , "./images/carimages/" + id + "/view"));
	var more = fs.readdirSync(path.resolve(__dirname , "./images/carimages/" + id + "/more"));
	var inner = fs.readdirSync(path.resolve(__dirname , "./images/carimages/" + id + "/inner"));
	var engine = fs.readdirSync(path.resolve(__dirname , "./images/carimages/" + id + "/engine"));
	
	res.json({
		"carimages" : {
			view,more,inner,engine
		}
	})
});


//所有车
app.post("/car" , (req,res)=>{
	//接收POST请求是分页信息
	var form = new formidable.IncomingForm();
	form.parse(req , (req , info) => {
		//info就是HTTP上行报文体的信息
		//页码和页面尺寸
		const {page = 1 , pagesize = 10} = info;
		//排序和排序方法
		const {sortby = "id" , sortdirection = 1} = info;
		//筛选条件
		const {filters} = info;

		//查询对象
		var obj = {};
		for(let i = 0 ; i < filters.length ; i++){
			if(filters[i].k == "price" || filters[i].k == "km"){
				obj[filters[i].k] = {"$gte" : filters[i].v[0] , "$lte" : filters[i].v[1]};
			}else{
				obj[filters[i].k] = filters[i].v;
			}	
		}

		Car.count(obj , (req,count)=>{
			Car.find(obj).sort({[sortby] : sortdirection}).skip((page - 1) * pagesize).limit(pagesize).exec((err,docs)=>{
				res.json({count , "results" : docs});
			});
		});
	});
});

app.listen(3000);