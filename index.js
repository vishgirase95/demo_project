const express=require("express");
const mysql=require("mysql");

const app=express();
const datbase=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"Employee"
})
datbase.connect((err)=>{
    if(err){
        throw Error("database connection failed");

    }else{
        console.log("Database connceted sucesfully");
    }
})
app.use(express.json());
app.get("/createDatabase",(req,res)=>{
let sql="create database Employee";
datbase.query(sql,(err,result)=>{
    if(err){
        throw Error("sql query failed")

    }
    console.log("datbase created",result);
    res.send("Database created");
})
})

app.get("/createTable",(req,res)=>{
    const sql="create table EMP2(id int not null auto_increment,name varchar(200) not null,age varchar(200) not null,primary key (id))";
    datbase.query(sql,(err,result)=>{
        if(err){
            throw Error("SQL table query failed");
        }else{
            console.log("table created sucesfully");
            res.json({
                messege:"tabel created sucesfully",
                status:200
            });
        }
    })
})
app.get("/fetchAll",async(req,res)=>{
    
    const sql=`select * from EMP`;
    datbase.query(sql,(err,result)=>{
        if(err){
            throw Error("SQL table  insert failed");
        }else{
            console.log("table fetched sucesfully");
            res.json({
                messege:"tabel fetch sucesfully",
                status:200,
                data:result
            });
        }
    })
})


app.get("/fetchByID/:id",async(req,res)=>{
    console.log("id",req.params);
    const sql=`select * from EMP where id='${req.params.id}'`;
    datbase.query(sql,(err,result)=>{
        if(err){
            throw Error("SQL table  insert failed");
        }else{
            console.log("table fetched sucesfully");
            res.json({
                messege:"tabel fetch sucesfully",
                status:200,
                data:result
            });
        }
    })
})

app.delete("/deleteByID/:id",async(req,res)=>{
    console.log("id",req.params);
    const sql=`delete from EMP where id='${req.params.id}'`;
    datbase.query(sql,(err,result)=>{
        if(err){
            throw Error("SQL delete failed");
        }else{
            console.log("delete sucesfully");
            res.json({
                messege:"delete sucesfully",
                status:200,
                data:result
            });
        }
    })
})
app.post("/insert",async(req,res)=>{
    console.log("body..",await req,"reso",await res);
    const sql=`insert into EMP set name='${req.body.name}',age='${req.body.age}'`;
    datbase.query(sql,(err,result)=>{
        if(err){
            throw Error("SQL table  insert failed");
        }else{
            console.log("table inserted sucesfully");
            res.json({
                messege:"tabel inserted sucesfully",
                status:200,
                
            });
        }
    })
})



app.listen(3000,()=>{
    console.log("sucesfully connected");

})