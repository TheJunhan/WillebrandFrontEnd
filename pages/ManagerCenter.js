/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-12-05 16:15:38
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-12-19 16:06:01
 */
import React from "react";
import { Tabs, Layout, Table, Button, Radio } from "antd";
import { getColumn, getUserColumn } from "../Services/ConstantService";
import 'antd/dist/antd.css'
import HeadBar from "./Components/HeadBar";
import { getURL } from "../Services/URLService";
import { Router } from "next/router";

const {TabPane} = Tabs
const {Header} = Layout
const Url = getURL()
export default class ManagerCenter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tupleData: '',
            userData: '',
        }
    }

    componentDidMount() {
        this.getTuples()
        this.getUsers()
    }
    
    render() {
        return (
            <div>
                <Header><HeadBar /></Header>
                <Tabs defaultActiveKey="1" style={{paddingLeft:'10%', paddingRight:'10%'}}>
                    <TabPane tab="Manage Users" key="1">
                        <this.ManageUserPage/>
                    </TabPane>
                    <TabPane tab="Manage Tuples" key="2">
                        <this.ManageTuplesPage/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }

    getFullUserColumn = () => {
        let tmp = [].concat(getUserColumn())
        tmp.unshift({
            title: 'role',
            dataIndex: 'role',
            key: '2',
            width: 300,
            render: (text, recorder) => {
                return (                
                    <div>
                        <Radio.Group defaultValue={recorder.role} buttonStyle="solid" onChange={(e)=>{
                            this.changeRole(recorder.email, e.target.value)
                        }}>
                            <Radio.Button value="ADMIN" style={{width:80, height: 30, fontSize:1,}}>ADMIN</Radio.Button>
                            <Radio.Button value="USER" style={{width:80, height: 30, fontSize:1,}}>USER</Radio.Button>
                            <Radio.Button value="BANNED" style={{width:80, height: 30, fontSize:1,}} danger>BANNED</Radio.Button>
                        </Radio.Group>
                    </div>
                )
            }
        })
        return tmp
    }

    getColumnDel = () => {
        let tmp = [].concat(getColumn())
        tmp.unshift({
            title: 'Delete',
            dataIndex: 'Delete',
            key: '21',
            width: 100,
            render: (text, recorder) => {
                return (                
                <Button type="primary" danger
                    onClick={()=>{this.removeData(recorder.id); this.sendDelRequest(recorder.id);}}>
                    delete
                </Button>
                )
            }
        })
        return tmp
    }

    ManageUserPage = () => {
        return (
            <Table dataSource={this.state.userData} columns={this.getFullUserColumn()} 
            pagination={{ pageSize: 50 }} scroll={{ y: 1000 }}/>
        )
    }

    ManageTuplesPage = () => {
        return (
            <Table dataSource={this.state.tupleData} columns={this.getColumnDel()} 
            pagination={{ pageSize: 50 }} scroll={{ y: 1000 }}/>
        )
    }

    getTuples = async () => {
        fetch(Url + '/getAllData', 
        {
            method:'GET'
        }).then(res=>res.text())
        .then(
            res => {
                this.setState({tupleData: JSON.parse(res)})
            }
        )
    }

    getUsers = () => {
        let tmp = localStorage.getItem("userId");
        if(!tmp || tmp == -1) {
            alert("Please login agin!")
            Router.push("/")
        }
        else {
            fetch(Url + '/getAllUsers?userId=' + tmp, {
                method:'GET'
            }).then(res=>res.text()).then(
                (res) => {
                    this.setState({userData: JSON.parse(res)})
                }
            )
        }
    }

    changeRole = (email, role) => {
        if(!localStorage.getItem("userRole")) {
            alert("Please login agin!")
            Router.push("/")
        }
        let tmp = new Object();
        tmp.setterId = localStorage.getItem("userId")
        tmp.getterEmail = email
        tmp.role = role
        fetch(Url + "/setRole", {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(tmp),
        }).then((res)=>{
            this.getUsers()
        })
    }
    removeData = (tupleId) => {
        let tmp = [].concat(this.state.tupleData)
        for(let i = 0; i < tmp.length; ++i) {
            if(tmp[i].id == tupleId) {
                tmp.splice(i, 1)
                break
            }
        }
        this.setState({tupleData: tmp})
    }
    sendDelRequest = async (tupleId) => {
        fetch(Url + '/deleteById?tupleId=' + tupleId, {
            method:'DELETE'
        })
    }
}