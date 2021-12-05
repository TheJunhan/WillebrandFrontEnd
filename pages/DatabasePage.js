/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-12 18:39:08
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-12-03 13:37:24
 */
import React from 'react'
import Filter from './Components/Filter'
import HeadBar from './Components/HeadBar'
import Database from './Components/Database'
import {Layout} from 'antd'
import { getURL } from '../Services/URLService'

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
                <Header><HeadBar current="Database" /></Header>
                <Filter />
                <Database data={this.state.data} />
            </div>
        )
    }
    getAllData = async () => {
        fetch(Url + '/getAllData', 
        {
            method:'GET'
        }).then(res=>res.text())
        .then(
            res => {
                this.setState({data: JSON.parse(res)})
            }
        )
    }
}
export default DatabasePage;