/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-12 18:37:49
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-12-19 15:57:49
 */
import React from 'react'
import { Collapse, Button, Form, Input, Select } from 'antd';

const { Option } = Select
const { Panel } = Collapse;

class Filter extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            MutationLocation: null,
            illType: null,
            MutationType: null,
            Genotype: null,
        }
    }
    handleSelectChange = (param, value) => {
        this.setState({[param]: value})
    }
    getForms = () => {
        return (
            <Form style={{width:800, left:300}}>
                <Form.Item>
                    <Input id="fixId"  placeholder="patientID" style={{width:200}}/>
                    &nbsp;&nbsp;&nbsp;&nbsp;MutationLocation:&nbsp;
                    <Select id="MutationLocation" name="MutationLocation" style={{width:200}}
                    onChange={(value)=>{this.handleSelectChange("MutationLocation", value)}}
                    >
                        <Option value="Exonic mutation">Exonic mutation</Option>
                        <Option value="Intronic mutation">Intronic mutation</Option>
                        <Option value="Exonic and Intronic mutation">Exonic and Intronic mutation</Option>
                        <Option value="WT(Wild type)">WT(Wild type)</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    {/* 下拉框 */}
                    &nbsp;illType:&nbsp;
                    <Select id="illType" name="illType" style={{width:200}}
                    onChange={(value)=>{this.handleSelectChange("illType", value)}}
                    >
                        <Option value="type1">type1</Option>
                        <Option value="type2N">type2N</Option>
                        <Option value="type2A">type2A</Option>
                        <Option value="type2B">type2B</Option>
                        <Option value="type2M">type2M</Option>
                        <Option value="type3">type3</Option>
                    </Select>
                    {/* 下拉框 */}
                    &nbsp;&nbsp;&nbsp;&nbsp;Mutation type:&nbsp;
                    <Select id="MutationType" name="MutationType" style={{width:200}}
                    onChange={(value)=>{this.handleSelectChange("MutationType", value)}}
                    >
                        <Option value="Deletion">Deletion</Option>
                        <Option value="Duplication">Duplication</Option>
                        <Option value="Insertion">Insertion</Option>
                        <Option value="Deletion and Insertion">Deletion and Insertion</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    {/* 下拉框 */}
                    &nbsp;GenoType:&nbsp;
                    <Select id="Genotype" name="Genotype" style={{width:200}}
                    onChange={(value)=>{this.handleSelectChange("Genotype", value)}}
                    >
                        <Option value="Homologous">Homologous</Option>
                        <Option value="Heterozygous">Heterozygous</Option>
                        <Option value="Compound  Heterozygous">Compound  Heterozygous</Option>
                        <Option value="linked inheritance">linked inheritance</Option>
                        <Option value="Not known">Not known</Option>
                    </Select>
                    &nbsp;&nbsp;&nbsp;
                    <Input id="Region" placeholder="Region" style={{width:200}}/>
                </Form.Item>
                <Form.Item>
                    <Input id="Nucleotide" placeholder="Nucleotide" style={{width:200}}/>
                    &nbsp;&nbsp;&nbsp;
                    <Input id="aminoAcid" placeholder="aminoAcid" style={{width:200}}/>
                </Form.Item>
            </Form>
        )
    }
    render() {
        return (
            <Collapse collapsible="header">
                <Panel header="click here to search" key="1">
                    <this.getForms />
                    <Button type="primary" onClick={()=>{this.handleSearch()}}>点击查询</Button>
                </Panel>
          </Collapse>
        )
    }
    handleSearch = () => {
        let form = new FormData()
        let tmp = document.getElementById("fixId")
        form.append("fixId", tmp.value == '' ? null : tmp.value)
        form.append("MutationLocation", this.state.MutationLocation)
        form.append("illType", this.state.illType)
        form.append("MutationType", this.state.MutationType)
        form.append("Genotype", this.state.Genotype)
        tmp = document.getElementById("Region")
        form.append("Region", tmp.value == '' ? null : tmp.value)
        tmp = document.getElementById("Nucleotide")
        form.append("Nucleotide", tmp.value == '' ? null : tmp.value)
        tmp = document.getElementById("aminoAcid")
        form.append("aminoAcid", tmp.value == '' ? null : tmp.value)
        this.props.handleSearch(form)
    }
}
export default Filter