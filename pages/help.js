/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-12 18:57:47
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-11-12 20:30:15
 */
import {Component} from 'react'
import HeadBar from './Components/HeadBar'
import { Layout } from 'antd'
const {Header} = Layout
export default class help extends Component {
    render() {
        return (
        <div>
        <Header><HeadBar current="help"/></Header>
        this is a help guide</div>
        )
    }
}