/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-27 15:11:09
 * @LastEditor: TheJunhan
 * @LastEditTime: 2022-01-27 14:40:34
 */
import React from 'react'
import { getWebSiteName } from '../../Services/ConstantService'
import { UserOutlined, DownCircleOutlined, UploadOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { Avatar, Breadcrumb, Menu, Button, Dropdown, Upload} from 'antd'
import Router from 'next/router'
import { getURL } from '../../Services/URLService'
import axios from 'axios'

class HeadBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasLogin: false,
            isAdmin: false
        }
        if(typeof window === undefined) {
            console.log('现在还不能调用浏览器函数')
        }
    }

    componentDidMount() {
        console.log('调用了我')
        this.judgeLogin()
        this.judgeRole()
    }

    judgeLogin = ()=>{
        if(localStorage.getItem("userId") != null && localStorage.getItem("userId") != -1) {
            this.setState({hasLogin: true}, ()=>{this.forceUpdate()})
        }
    }

    judgeRole = () => {
        if(localStorage.getItem("userRole") != null && localStorage.getItem("userRole") == 'ADMIN') {
            this.setState({isAdmin: true})
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
                {this.props.current == "Database" ? <div><this.uploadButton/><this.downloadButton/></div> : null}
                {this.props.current == "Database" && this.state.isAdmin ? <this.uploadFile/> : null}
                {this.props.current === 'help' && <Button onClick={()=>{Router.push('/')}}>Main Page</Button>}
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
            if(this.state.isAdmin == true) {
                return (
                    <Menu>
                        <Menu.Item onClick = {()=>{Router.push('/UserCenter')}}>
                            User Center
                        </Menu.Item>
                        <Menu.Item onClick = {() => {Router.push('/ManagerCenter')}}>
                            Manager Center
                        </Menu.Item>
                        <Menu.Item onClick={()=>{this.onExit()}}>
                            Exit
                        </Menu.Item>
                    </Menu>
                )
            }
            else {
                return (
                    <Menu>
                        <Menu.Item onClick = {()=>{Router.push('/UserCenter')}}>
                            User Center
                        </Menu.Item>
                        <Menu.Item onClick={()=>{this.onExit()}}>
                            Exit
                        </Menu.Item>
                    </Menu>
                )
            }
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

    onExit = () => {
        this.setState({hasLogin: false}, ()=>{localStorage.removeItem("userId")})
        this.setState({isAdmin: false}, ()=>{localStorage.removeItem("userRole")})
        Router.push("/")
    }

    uploadButton = () => {
        return (
            <Dropdown overlay={this.DropdownMenu} disabled={!this.state.hasLogin}
            trigger={['click']}>
              <div>
                <Button style={{position:'absolute', right: 100, top:13}}>Upload<DownCircleOutlined/></Button>
              </div>
            </Dropdown>
        )
    }

    downloadButton = () => {
        return (
            <Button onClick={()=>{
                this.props.download()
            }} style={{position:'absolute', left: '15%', top: '2%'}}>DownLoad</Button>
        )
    }

    uploadFile = () => {
        return <div>
            <Upload customRequest={this.CustomUploadFileFunction}
            showUploadList={false} style={{position:'absolute', left: '10%', top: '3%'}} 
            accept='.csv, .xlsx, .xls'
            >
                <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
        </div>
    }

    CustomUploadFileFunction = (option) => {
        let form = new FormData()
        form.append('file', option.file)
        form.append('id', localStorage.getItem("userId"))
        axios.post(getURL() + '/uploadExcel', form).then(()=>{
            this.props.updateDatabase()
        })
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