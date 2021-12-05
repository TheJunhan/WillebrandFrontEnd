/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-27 15:11:09
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-12-03 14:48:30
 */
import React from 'react'
import { getWebSiteName } from '../../Services/ConstantService'
import { UserOutlined, DownCircleOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { Avatar, Breadcrumb, Menu, Button, Dropdown} from 'antd'
import Router from 'next/router'

class HeadBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasLogin: false
        }
        if(typeof window == undefined) {
            console.log('现在还不能调用浏览器函数')
        }
    }

    componentDidMount() {
        console.log('调用了我')
        this.judgeLogin()
    }

    judgeLogin = ()=>{
        if(localStorage.getItem("userId") != null && localStorage.getItem("userId") != -1) {
            this.setState({hasLogin: true}, ()=>{this.forceUpdate()})
        }
    }

    render() {
        return (
            <div>
                <this.getBar/>
            </div>
        )
    }

    getBar = () => {
        return (
            <div>
                <p style={{position:'absolute', left:400, fontSize:30, color:'white'}}>{getWebSiteName()}</p>
                {this.props.current == "Database" ? <this.uploadButton/> : null}
                <Breadcrumb style={{position:'absolute', right: 50, top:15}}>
                    <this.handleUser />
                </Breadcrumb>
            </div>
        )
    }

    handleUser = () => {
        return (
        <Breadcrumb.Item 
        overlay={
            this.userMenu()
        }
        >
            <Avatar size={32} icon={<UserOutlined />}/>
        </Breadcrumb.Item>
        )
    }

    userMenu = () => {
        if(this.state.hasLogin == true) {
            return (
                <Menu>
                    <Menu.Item onClick = {()=>{Router.push('/UserCenter')}}>
                        User Center
                    </Menu.Item>
                    <Menu.Item onClick={()=>{this.setState({hasLogin: false}, ()=>{localStorage.removeItem("userId")})}}>
                        Exit
                    </Menu.Item>
                </Menu>
            )
        }
        else {
            return (
                <Menu>
                    <Menu.Item onClick = {()=>{Router.push("/LoginPage")}}>
                        Sign in
                    </Menu.Item>
                </Menu>
            )
        }
    }

    uploadButton = () => {
        return (
            <Dropdown overlay={this.DropdownMenu} disabled={!this.state.hasLogin}
            trigger={['click']}>
              <div>
                <Button style={{position:'absolute', right: 100, top:10}}>upload<DownCircleOutlined/></Button>
              </div>
            </Dropdown>
        )
    }

    DropdownMenu = (
        <Menu style={{position:'absolute', right: 100, top:10}}>
          <Menu.Item key='1' onClick={()=>{this.clickMenu('Exonic mutation')}}>Exonic mutation</Menu.Item>
          <Menu.Item key='2' onClick={()=>{this.clickMenu('Intronic mutation')}}>Intronic mutation</Menu.Item>
          <Menu.Item key='3' onClick={()=>{this.clickMenu('Exonic and Intronic mutation')}}>Exonic and Intronic mutation</Menu.Item>
          <Menu.Item key='4' onClick={()=>{this.clickMenu('WT(Wild type)')}}>WT(Wild type)</Menu.Item>
        </Menu>
    )

    clickMenu = (arg) => {
        localStorage.setItem("MutationLocation", arg)
        Router.push("/UploadPage")
    }
}
export default HeadBar;