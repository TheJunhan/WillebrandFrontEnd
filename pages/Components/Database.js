/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-12 19:27:01
 * @LastEditor: TheJunhan
 * @LastEditTime: 2022-03-08 14:21:56
 */
import React from 'react'
import { getColumn } from '../../Services/ConstantService'
import {Table} from 'antd'

export default class Database extends React.Component {
    render() {
        return (
            <div>
                <Table dataSource={this.props.data} columns={getColumn()}
                 pagination={{ pageSize: 50 }} scroll={{ x: 1000, y: 5000 }} />
            </div>
        )
    }
}