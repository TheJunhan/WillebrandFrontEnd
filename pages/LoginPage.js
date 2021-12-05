/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-12 19:48:38
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-12-02 21:37:13
 */
import Link from 'next/link'
import Router from 'next/router'
import {Button, Form, Input} from 'antd'
import { Component } from 'react';
import {getURL} from '../Services/URLService'
import 'antd/dist/antd.css'
var URL = getURL()
class LoginPage extends Component
{
  constructor(props)
  {
    super(props)
    this.state={
      email:"",
      password:"",
    }
  }
  //-------处理填写的信息---------
  handleChangeEmail = (e)=>
  {
    this.setState({email:e.target.value})
  }
  handleChangePassword = (e)=>
  {
    this.setState({password:e.target.value})
  }
  //--------发送请求---------------
  Login=()=>
  {
    this.LoginDataRequest()
  }
  LoginDataRequest = async () => {
        
    fetch(URL+'/login?email=' + this.state.email + "&password=" + this.state.password,
    {
        method:'GET',
    }).then(res => res.text())
    .then(
        res => {
            if(res!='-1') {
              alert("Login successfully~")
              localStorage.setItem('userId', res)
              this.forceUpdate()
              Router.push('/')
            }
            else {
              alert("Login failed，please check the email and the password")
            }
        })
  }
  //---------render---------------
  render()
  {
    return <div>
    <Form labelCol={{span:8}} wrapperCol={{span:16}} style={{position:'absolute', top:200, left:400, width:400}}>
      <Form.Item label="email" name="username" rules={[{required:true, message:"请输入邮箱"}] }>
        <Input name="email" onChange={(e)=>{this.handleChangeEmail(e)}}/>
        </Form.Item>
      <Form.Item label="password" name="password" rules={[{required:true, message:"请输入密码"}] }>
        <Input.Password name = "password" onChange={(e)=>{this.handleChangePassword(e)}}/>
        </Form.Item>
      <Form.Item >
        <Button type="primary" style={{position:'absolute',left:200, width:120, height:40}} onClick={()=>{this.Login()}}>Login</Button>
      </Form.Item>
      <Form.Item>
        <Link href="/SignUp"><u style={{position:'absolute',left:200, width:200, color:'#CCCCCC'}}>Don't have account? Register</u></Link>
      </Form.Item>
    </Form>
  </div>
  }
}
export default LoginPage;
