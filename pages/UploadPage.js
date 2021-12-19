/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-14 16:31:18
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-12-05 13:54:52
 */
import React from "react";
import {Button, Form, Input, Select, Modal} from 'antd';
import {getURL} from '../Services/URLService'
import { Router } from "next/router";
const Url = getURL()
const {Option} = Select
const layout=
{
    labelCol:{
        span:8,
    },
    wrapperCol:{
        span:16,
    },
};

export default class UploadPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // fixedId
            showModal:false,
            fixedId:null,
            // 每个属性的值
            MutationLocation:"",
            illType:"",
            MutationType:"",
            Genotype:'',
            Region:'',
            Nucleotide:"",
            aminoAcid:"",
            Aptt:"",
            VWFAg:"",
            VWFAct:"",
            RIPA:"",
            FVIII:"",
            VWFCB:"",
            VWFPP:"",
            BloodType:"",
            age:"",
            gender:"",
            BS:"",
            Reference:"",
            Comments:"",
        }
        this.setState({MutationLocation: props.MutationLocation})
    }
    
    render() {
        return (
            <div>
                {/* 模态框 */}
                <this.modalModule/>
                {/* 需要上传的条目 */}
                <Form {...layout} style={{position:"absolute", top:50, width:800, left:300}}>
                    {/* 模态框控制按钮 */}
                    <Form.Item>                
                        <Button style={{position:"absolute", left:230}} 
                        onClick={() => {
                            if(!this.state.fixedId)
                            {
                                this.setState({showModal:!this.state.showModal})
                            }
                            else {
                                this.setState({fixedId:null})
                            }
                        }}>
                            {this.state.fixedId?"Adding for"+this.state.fixedId+"，click to Cancel":"Add for existed"}
                        </Button>
                    </Form.Item>
                    {localStorage.getItem("MutationLocation") != 'WT(Wild type)' ? <this.specialCondition/> : null}
                    <this.basicCondition/>
                    <Form.Item>
                        <Button type='primary' style={{position:"absolute", left:200}}
                        onClick={()=>{this.upload()}}>
                        Upload</Button>
                        <Button style={{position:"absolute", left:400}}
                        onClick={()=>{Router.push("/DatabasePage")}}>Cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
    modalModule = () => {
        return (
            <div>
                <Modal title="PatientID" visible={this.state.showModal} 
                onOk={()=>{this.getDup(); this.setState({showModal: !this.state.showModal})}} 
                onCancel={()=>{this.setState({showModal: !this.state.showModal}); this.setState({fixedId: null})}}>
                    <Input id="fixedId" name="fixedId" placeholder="Please input the patientID" type="number" onChange={(e)=>{this.setState({fixedId: e.target.value})}} />
                </Modal>
            </div>
        )
    }
    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSelectChange = (param, value) => {
        this.setState({[param]: value}, ()=>{console.log(this.state.Genotype)})
    }
    /**
     * 特殊条件
     * @returns 
     */
    specialCondition = () => {
        return (
        <div>
            <Form.Item label="VWD type" name="type" rules={[{required:true, message:"此为必填项"}]}>
                <Select style={{width:300}} name="illType"
                onChange={(value)=>{this.handleSelectChange('illType', value);}}
                >
                    <Option value="type1">type1</Option>
                    <Option value="type2N">type2N</Option>
                    <Option value="type2A">type2A</Option>
                    <Option value="type2B">type2B</Option>
                    <Option value="type2M">type2M</Option>
                    <Option value="type3">type3</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Mutation type" name="MutationType" 
            rules={[{required:true}]}>
                <Select style={{width:300}} name="MutationType"
                onChange={(value)=>{this.handleSelectChange('MutationType', value);}}
                >
                    <Option value="Deletion">Deletion</Option>
                    <Option value="Duplication">Duplication</Option>
                    <Option value="Insertion">Insertion</Option>
                    <Option value="Deletion and Insertion">Deletion and Insertion</Option>
                </Select>
            </Form.Item>

            {/* 新增 */}
            <Form.Item label="GenoType" name="genotype" rules={[{required:true, message:"请输入学校或医学院专用邮箱"}]}>
                <Select style={{width:300}} id="Genotype" name="Genotype"
                onChange={(value)=>{this.handleSelectChange('Genotype', value);}}
                >
                    <Option value="Homologous">Homologous</Option>
                    <Option value="Heterozygous">Heterozygous</Option>
                    <Option value="Compound  Heterozygous">Compound  Heterozygous</Option>
                    <Option value="linked inheritance">linked inheritance</Option>
                    <Option value="Not known">Not known</Option>
                </Select>
            </Form.Item>
            
            <Form.Item label="Exon No." name="Region" rules={[{required:true, message:"格式不正确，请参考提示"}]}>
                <Input placeholder='(23,24]'
                name="Region" onChange={e=>this.handleInputChange(e)} />
            </Form.Item>

            <Form.Item label="Nucleotide change" name="Nucleotide substitution" rules={[{required:true, message:"格式不正确，请参考提示"}]}>
                <Input placeholder={this.state.forthPlaceHold} 
                name="Nucleotide" onChange={e=>this.handleInputChange(e)} />
            </Form.Item>

            <Form.Item label="Protein primary structure changes" name="Amino acid change">
                <Input placeholder={this.state.fifthPlaceHold}
                name = "aminoAcid"
                onChange={e=>this.handleInputChange(e)}
                />
            </Form.Item>
        </div>)
    }
    /**
     * 病人的基本信息列表
     * @returns 
     */
    basicCondition = () => {
        return (
            <div>
                <Form.Item label="activated partial thromboplastin time">
                    <Input id = 'Aptt' name = 'Aptt' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                     />
                </Form.Item>
                <Form.Item label="VWF antigen level">
                    <Input id = 'VWFAg' name = 'VWFAg' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                        style={{width:300}}
                    />
                </Form.Item>
                <Form.Item label="VWF activity level">
                    <Input id = 'VWFAct' name = 'VWFAct' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                    />
                </Form.Item>
                <Form.Item label="ristocetin-induced platelet agglutination">
                    <Input id = 'RIPA' name = 'RIPA' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                    />
                </Form.Item>
                <Form.Item label="The activity level of FVIII">
                    <Input id = 'FVIII' name = 'FVIII' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                    />
                </Form.Item>
                <Form.Item label="VWF collagen binding capacity">
                    <Input id = 'VWFCB' name = 'VWFCB' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                    />
                </Form.Item>
                <Form.Item label="VWF propeptide level">
                    <Input id = 'VWFPP' name = 'VWFPP' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                    />
                </Form.Item>
                <Form.Item label="Blood type">
                    <Select id="BloodType" name="BloodType" style={{width:300}}
                    onChange={value=>this.handleSelectChange('BloodType', value)}
                    >
                        <Option value="O">O</Option>
                        <Option value="A">A</Option>
                        <Option value="B">B</Option>
                        <Option value="AB">AB</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Age">
                    <Input id = 'age' name = 'age' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                    />
                </Form.Item>
                <Form.Item label="Gender">
                    <Select id="gender" name="gender" style={{width:300}}
                    onChange={value=>this.handleSelectChange('gender', value)}>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Bleeding time">
                    <Input id = 'BS' name = 'BS' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                    />
                </Form.Item>
                <Form.Item label="References">
                    <Input id = 'Reference' name = 'Reference' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                    />
                </Form.Item>
                <Form.Item label="Comments">
                    <Input id = 'Comments' name = 'Comments' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)}
                    />
                </Form.Item>
            </div>
        )
    }

    /**
     * 上传
     */
    upload = async () => {
        let requestBody = new Object()
        requestBody.fixedId = this.state.fixedId ? this.state.fixedId : -1
        requestBody.userId = localStorage.getItem("userId")
        requestBody.MutationLocation = localStorage.getItem("MutationLocation")
        requestBody.illType = this.state.illType
        requestBody.MutationType = this.state.MutationType
        requestBody.Genotype = this.state.Genotype
        requestBody.Region = this.state.Region
        requestBody.Nucleotide = this.state.Nucleotide
        requestBody.aminoAcid = this.state.aminoAcid
        requestBody.Aptt = this.state.Aptt
        requestBody.VWFAg = this.state.VWFAg
        requestBody.VWFAct = this.state.VWFAct
        requestBody.RIPA = this.state.RIPA
        requestBody.FVIII = this.state.FVIII
        requestBody.VWFCB = this.state.VWFCB
        requestBody.VWFPP = this.state.VWFPP
        requestBody.BloodType = this.state.BloodType
        requestBody.age = this.state.age
        requestBody.gender = this.state.gender
        requestBody.BS = this.state.BS
        requestBody.Reference = this.state.Reference
        requestBody.Comments = this.state.Comments
        fetch(Url + '/upload', 
        {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(requestBody)
        }).then((response)=>{return response.text()}).then((response) => {
            if(response == 'success') {
                alert('Upload successfully~')
            }
            else {
                alert('Fail to upload, please check and try again')
            }
        })
    }

    /**
     * fixId
     */
    getDup = async () => {
        fetch(Url+"/DupBack?fixedId=" + this.state.fixedId).then((response)=>{return response.text()}).then((response)=>{
            if(response == 'false') {
                alert("Can not find this ID~")
            }
            else {
                let tmp = JSON.parse(response)
                alert("search successfully~")
                this.setState({
                    Aptt:tmp.aptt,
                    VWFAg:tmp.VWFAg,
                    VWFAct:tmp.VWFAct,
                    RIPA:tmp.RIPA,
                    FVIII:tmp.FVIII,
                    VWFCB:tmp.VWFCB,
                    VWFPP:tmp.VWFPP,
                    BloodType:tmp.bloodType,
                    age:tmp.age,
                    gender:tmp.gender,
                    BS:tmp.BS,
                    Reference:tmp.reference,
                    Comments:tmp.comments
                }, ()=>{this.refresh()})
            }
        })
    }
    /**
     * 更新生理状况
     */
    refresh = () => {
        document.getElementById("Aptt").value = this.state.Aptt;
        document.getElementById("VWFAg").value = this.state.VWFAg;
        document.getElementById("VWFAct").value = this.state.VWFAct;
        document.getElementById("RIPA").value = this.state.RIPA;
        document.getElementById("FVIII").value = this.state.FVIII;
        document.getElementById("VWFCB").value = this.state.VWFCB;
        document.getElementById("VWFPP").value = this.state.VWFPP;
        document.getElementById("BloodType").value = this.state.BloodType;
        document.getElementById("age").value = this.state.age;
        document.getElementById("gender").value = this.state.gender;
        document.getElementById("BS").value = this.state.BS;
        document.getElementById("Reference").value = this.state.Reference;
        document.getElementById("Comments").value = this.state.Comments;
    }
}