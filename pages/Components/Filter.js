/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-12 18:37:49
 * @LastEditor: TheJunhan
 * @LastEditTime: 2022-02-02 10:32:06
 */
import React from 'react'
import { Collapse, Button, Form, Input, Select } from 'antd';

const { Option } = Select
const { Panel } = Collapse;

class Filter extends React.Component {
    constructor(props) {
        super(props) 
        // this.state = {
        //     MutationLocation: null,
        //     illType: null,
        //     MutationType: null,
        //     Genotype: null,
        // }
    }
    handleSelectChange = (param, value) => {
        this.setState({[param]: value})
    }
    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    getForms = () => {
        return (
            <Form style={{ left:300}}>
                <Form.Item>
                    {/* TODO */}
                    <Input id="fixId"  placeholder="patientID" style={{width:200}} onChange={(e)=>this.handleInputChange(e)}/>
                    {/*&nbsp;&nbsp;&nbsp;&nbsp;Mutation Location:&nbsp;*/}
                    {/*<Select id="MutationLocation" name="MutationLocation" style={{width:200}}*/}
                    {/*onChange={(value)=>{this.handleSelectChange("MutationLocation", value)}}*/}
                    {/*>*/}
                    {/*    <Option value="Exonic mutation">Exonic mutation</Option>*/}
                    {/*    <Option value="Intronic mutation">Intronic mutation</Option>*/}
                    {/*    <Option value="Exonic and Intronic mutation">Exonic and Intronic mutation</Option>*/}
                    {/*    <Option value="WT(Wild type)">WT(Wild type)</Option>*/}
                    {/*</Select>*/}
                    &nbsp;&nbsp;&nbsp;
                    <Input id="MutationLocation" placeholder="Mutation Location" style={{width:200}} onChange={(e)=>this.handleInputChange(e)}/>
                    &nbsp;&nbsp;&nbsp;
                    {/* 下拉框 */}
                    {/*&nbsp;VWD type:&nbsp;*/}
                    {/*<Select id="illType" name="illType" style={{width:200}}*/}
                    {/*onChange={(value)=>{this.handleSelectChange("illType", value)}}*/}
                    {/*>*/}
                    {/*    <Option value="type1">type1</Option>*/}
                    {/*    <Option value="type2N">type2N</Option>*/}
                    {/*    <Option value="type2A">type2A</Option>*/}
                    {/*    <Option value="type2B">type2B</Option>*/}
                    {/*    <Option value="type2M">type2M</Option>*/}
                    {/*    <Option value="type3">type3</Option>*/}
                    {/*</Select>*/}
                    <Input id="illType" placeholder="VWD type" style={{width:200}} onChange={(e)=>{this.handleInputChange(e)}}/>
                    {/* 下拉框 */}
                    {/*&nbsp;&nbsp;&nbsp;&nbsp;Mutation type:&nbsp;*/}
                    {/*<Select id="MutationType" name="MutationType" style={{width:200}}*/}
                    {/*onChange={(value)=>{this.handleSelectChange("MutationType", value)}}*/}
                    {/*>*/}
                    {/*    <Option value="Deletion">Deletion</Option>*/}
                    {/*    <Option value="Duplication">Duplication</Option>*/}
                    {/*    <Option value="Insertion">Insertion</Option>*/}
                    {/*    <Option value="Deletion and Insertion">Deletion and Insertion</Option>*/}
                    {/*</Select>*/}
                    &nbsp;&nbsp;&nbsp;
                    <Input id="MutationType" placeholder="Mutation type" style={{width:200}} onChange={(e)=>{this.handleInputChange(e)}}/>
                </Form.Item>
                <Form.Item>
                    {/* 下拉框 */}
                    {/*&nbsp;GenoType:&nbsp;*/}
                    {/*<Select id="Genotype" name="Genotype" style={{width:200}}*/}
                    {/*onChange={(value)=>{this.handleSelectChange("Genotype", value)}}*/}
                    {/*>*/}
                    {/*    <Option value="Homologous">Homologous</Option>*/}
                    {/*    <Option value="Heterozygous">Heterozygous</Option>*/}
                    {/*    <Option value="Compound  Heterozygous">Compound  Heterozygous</Option>*/}
                    {/*    <Option value="linked inheritance">linked inheritance</Option>*/}
                    {/*    <Option value="Not known">Not known</Option>*/}
                    {/*</Select>*/}
                    <Input id="Genotype" placeholder="GenoType" style={{width:200}} onChange={(e)=>{this.handleInputChange(e)}}/>
                    &nbsp;&nbsp;&nbsp;
                    <Input id="Region" placeholder="Exon No." style={{width:200}} onChange={(e)=>this.handleInputChange(e)}/>
                    &nbsp;&nbsp;&nbsp;
                    <Input id="Nucleotide" placeholder="Nucleotide change" style={{width:200}} onChange={(e)=>this.handleInputChange(e)}/>
                    &nbsp;&nbsp;&nbsp;
                    <Input id="aminoAcid" placeholder="Protein primary structure changes" style={{width:200}} onChange={(e)=>this.handleInputChange(e)}/>
                </Form.Item>
            </Form>
        )
    }
    render() {
        return (
            <Collapse collapsible="header">
                <Panel header="click here to search" key="1">
                    <this.getForms />
                    <Button type="primary" onClick={()=>{this.handleSearch()}}>search</Button>
                </Panel>
          </Collapse>
        )
    }
    handleSearch = () => {
        let form = new FormData()
        let tmp = document.getElementById("fixId")
        form.append("fixId", tmp.value == '' ? null : tmp.value)
        tmp = document.getElementById("MutationLocation")
        form.append("MutationLocation", tmp.value == '' ? null : tmp.value)

        tmp = document.getElementById("illType")
        form.append("illType", tmp.value == '' ? null : tmp.value)
        tmp = document.getElementById("MutationType")
        form.append("MutationType", tmp.value == '' ? null : tmp.value)
        tmp = document.getElementById("Genotype")
        form.append("Genotype", tmp.value == '' ? null : tmp.value)

        tmp = document.getElementById("Region")
        form.append("Region", tmp.value == '' ? null : tmp.value)
        tmp = document.getElementById("Nucleotide")
        form.append("Nucleotide", tmp.value == '' ? null : tmp.value)
        tmp = document.getElementById("aminoAcid")
        form.append("aminoAcid", tmp.value == '' ? null : tmp.value)
        form.forEach((value, key)=>{
            console.log(key)
            console.log(value)
        })
        this.props.handleSearch(form)
    }
}
export default Filter