/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-12-03 14:42:27
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-12-19 16:01:28
 */
import React from "react"
import { Table, Button, Layout } from 'antd'
import { getColumn } from "../Services/ConstantService"
import { getURL } from "../Services/URLService";
import HeadBar from "./Components/HeadBar";
import 'antd/dist/antd.css'

const Url = getURL()
const {Header} = Layout

class UserCenter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:'',
        }
    }
    componentDidMount() {
        this.getDataByUser()
    }
    render() {
        return (
            <div>
            <Header><HeadBar/></Header>
            <Table dataSource={this.state.data} columns={this.getColumnDel()} 
                pagination={{ pageSize: 50 }} scroll={{ y: 1000 }}/>
            </div>
        )
    }
    getDataByUser = async () => {
        fetch(Url + '/getAllByUserId?userId=' + localStorage.getItem("userId"), {
            method: 'GET'
        }).then(res=>res.text())
        .then((res)=>{
            this.setState({data: JSON.parse(res)})
        })
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

    sendDelRequest = async (tupleId) => {
        fetch(Url + '/deleteById?tupleId=' + tupleId, {
            method:'DELETE'
        })
    }

    removeData = (tupleId) => {
        let tmp = [].concat(this.state.data)
        for(let i = 0; i < tmp.length; ++i) {
            if(tmp[i].id == tupleId) {
                tmp.splice(i, 1)
                break
            }
        }
        this.setState({data: tmp})
    }
}

export default UserCenter;