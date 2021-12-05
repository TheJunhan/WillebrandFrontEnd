/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-06-07 19:26:43
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-12-03 11:07:35
 */
import Link from 'next/link'
import {Form, Input, Button} from 'antd'
import { Component } from 'react';
import Router from 'next/router'
import {getURL} from '../Services/URLService'
import 'antd/dist/antd.css'
var URL = getURL()
// 表单属性
const layout = {
    labelCol:{
        span:8,
    },
    wrapperCol:{
        span:16,
    },
};

export default class signUp extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            email:'',
            password:'',
            ensurePassword:''
        }
    }
    //------处理表单
    handleChange = (e)=>
    {
        this.setState({[e.target.name]:e.target.value})
    }
    //------1.确认两次密码是否一致 2.确认是否是邮箱
    Register = ()=>
    {
        console.log("开始注册")
        if(this.state.password != this.state.ensurePassword)
        {
            alert("Different passwords~")
            return;
        }
        this.registerDataRequest()
    }
    registerDataRequest = async () => {
        let res = await fetch(URL+'/register?email=' + this.state.email + "&password=" + this.state.password,
        {
            method:'GET',
        }).then(res => res.text())
        .then(
            res => {
                if(res=='true') {
                    alert("Register successfully~")
                    Router.push('/')
                }
                else
                    alert("Failed to register，this email has been used~")
            })
    }
    render() {
        return <div>
                <Form {...layout} style={{position:'absolute', top:150, width:600, left:300}}>
                    <Form.Item label="邮箱" name="mail" rules={[{required:true, message:"请输入学校或医学院专用邮箱"}]}>
                        <Input name="email" onChange={(e)=>{this.handleChange(e)}}/>
                    </Form.Item>
                    <Form.Item label="密码" name="pas" rules={[{required:true, message:"请输入学校或医学院专用邮箱"}]}>
                        <Input.Password name="password" onChange={(e)=>{this.handleChange(e)}}/>
                    </Form.Item>
                    <Form.Item label="确认密码" name="ensurepas" rules={[{required:true, message:"请输入学校或医学院专用邮箱"}]}>
                        <Input.Password name="ensurePassword" onChange={(e)=>{this.handleChange(e)}}/>
                    </Form.Item>
                    <Form.Item style={{position:'absolute', left:300}}>
                        <Button type="primary" onClick={()=>{this.Register()}}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    }
}