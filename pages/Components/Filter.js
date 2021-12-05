/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-12 18:37:49
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-11-12 21:01:53
 */
import React from 'react'
import { Collapse, Button, Form, Input } from 'antd';

const { Panel } = Collapse;
class Filter extends React.Component {
    getForms() {
        return (
            <Form style={{width:600, left:300}}>
                <Form.Item>
                    <Input  placeholder="patientID" />
                </Form.Item>
                <Form.Item>
                    <Input placeholder="patientID" />
                </Form.Item>
                <Form.Item>
                    <Input placeholder="patientID" />
                </Form.Item>
                <Form.Item>
                    <Input placeholder="patientID" />
                </Form.Item>
                <Form.Item>
                    <Input placeholder="patientID" />
                </Form.Item>
                <Form.Item>
                    <Input placeholder="patientID" />
                </Form.Item>
            </Form>
        )
    }
    render() {
        return (
            <Collapse collapsible="header">
                <Panel header="click here to search" key="1">
                    <this.getForms />
                    <Button type="primary">点击查询</Button>
                </Panel>
          </Collapse>
        )
    }
}
export default Filter