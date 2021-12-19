/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-12 18:39:08
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-12-19 16:00:33
 */
import React from 'react'
import Filter from './Components/Filter'
import HeadBar from './Components/HeadBar'
import Database from './Components/Database'
import {Layout} from 'antd'
import { getURL } from '../Services/URLService'
import axios from 'axios'

const Url = getURL()
const {Header} = Layout
class DatabasePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:'',
        }
    }
    componentDidMount() {
        this.getAllData()
    }
    render() {
        return (
            <div>
                <Header><HeadBar current="Database" updateDatabase={()=>{this.getAllData()}}/></Header>
                <Filter handleSearch={(form)=>{this.getCriteriaData(form)}}/>
                <Database data={this.state.data} />
            </div>
        )
    }

    getAllData = async () => {
        fetch(Url + '/getAllData', {
            method:'GET'
        }).then(res=>res.text())
        .then(
            res => {
                this.setState({data: JSON.parse(res)})
            }
        )
    }

    getCriteriaData = async (criteria) => {
        // console.log(criteria.get("fixId"))
        axios.post(Url + '/MultiCriteriaQuery', criteria).then((res)=>{
            console.log(res.data)
            let arr = [].concat(res.data)
            for(let i = 0; i < arr.length; ++i) {
                let tmp = new Object(arr[i])
                tmp.key = tmp.id
                arr[i] = tmp
            }
            this.setState({data: arr})
        })
    }
}
export default DatabasePage;