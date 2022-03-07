/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-12 18:39:08
 * @LastEditor: TheJunhan
 * @LastEditTime: 2022-01-27 14:32:36
 */
import React from 'react'
import Filter from './Components/Filter'
import HeadBar from './Components/HeadBar'
import Database from './Components/Database'
import { Layout } from 'antd'
import { getURL } from '../Services/URLService'
import { getColumn } from '../Services/ConstantService'
import axios from 'axios'
import XLSX from 'xlsx'

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
                <Header><HeadBar current="Database" updateDatabase={()=>{this.getAllData()}} download={()=>{this.download()}}/></Header>
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

    download = () => {
        let downloadData = [[]]
        getColumn().forEach((item, index)=>{
            downloadData[0].push(item.title)
        })
        console.log(this.state.data)
        this.state.data.forEach((item, index) => {
            let tmp = []
            tmp.push(item.fixedId)
            tmp.push(item.mutationLocation)
            tmp.push(item.illType)
            tmp.push(item.mutationType)
            tmp.push(item.nucleotide)
            tmp.push(item.aminoAcid)
            tmp.push(item.genotype)
            tmp.push(item.region)
            tmp.push(item.appt)
            tmp.push(item.VWFAg)
            tmp.push(item.VWFAct)
            tmp.push(item.RIPA)
            tmp.push(item.FVIII)
            tmp.push(item.VWFCB)
            tmp.push(item.VWFPP)
            tmp.push(item.bloodType)
            tmp.push(item.age)
            tmp.push(item.gender)
            tmp.push(item.BS)
            tmp.push(item.reference)
            tmp.push(item.comments)
            downloadData.push(tmp)
        })
        const ws = XLSX.utils.aoa_to_sheet(downloadData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
        XLSX.writeFile(wb, "data.xlsx")
    }
}
export default DatabasePage;