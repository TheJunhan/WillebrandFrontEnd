/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-11-14 16:31:18
 * @LastEditor: TheJunhan
 * @LastEditTime: 2022-02-02 10:17:26
 */
import React from "react";
import {Button, Form, Input, Select, Modal} from 'antd';
import 'antd/dist/antd.css'
import {getURL} from '../Services/URLService'
import Router from 'next/router';
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
            isWT: false,
            // placeHolder
            ncPlaceHolder:'',
            ppscPlaceHolder:'',
        }
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
                    {!this.state.isWT ? <this.specialCondition/> : null}
                    <this.basicCondition/>
                    <Form.Item>
                        <Button type='primary' style={{position:"absolute", left:200}}
                        onClick={()=>{this.upload()}}>
                        Upload</Button>
                        <Button style={{position:"absolute", left:400}}
                        onClick={()=>{ Router.push("/DatabasePage") }}>Cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
    componentDidMount() {
        this.setState({MutationLocation: localStorage.getItem("MutationLocation")})
        if(localStorage.getItem("MutationLocation") == 'WT(Wild type)')
            this.setState({isWT: true})
    }

    modalModule = () => {
        return (
            <div>
                <Modal title="PatientID" visible={this.state.showModal} 
                onOk={()=>{this.getDup(); this.setState({showModal: !this.state.showModal})}} 
                onCancel={()=>{this.setState({showModal: !this.state.showModal}); this.setState({fixedId: null})}}>
                    <Input id="fixedId" name="fixedId" placeholder="Please input the patientID" type="number" 
                    onChange={(e)=>{this.setState({fixedId: e.target.value})}} value={this.state.fixedId}/>
                </Modal>
            </div>
        )
    }
    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSelectChange = (param, value) => {
        this.setState({[param]: value}, ()=>{
            if(this.state.MutationLocation != 'WT(Wild type)' ) {
                if(this.state.MutationLocation == 'Exonic mutation') {
                    if(this.state.MutationType == 'Missense') {
                        this.setState({ncPlaceHolder: '6860G>A, 1450_1451delinsAG（UNDERLINE）',
                            ppscPlaceHolder: 'Arg2287Gln, His484Ser'})

                    }
                    else if(this.state.MutationType == 'Insertion, Duplication and Deletion') {
                        this.setState({ncPlaceHolder: '901_902 ins CTA, 1268_1270 del TCT,  6487_6531 dup, Exon 6 del, Exon 6 dup   ',
                            ppscPlaceHolder: 'Glu300_Arg302 ins SerAsn, Phe423 del, Cys2163_Ile2177 dup,'})
                    }
                    else if(this.state.MutationType == 'Frameshift mutations') {
                        this.setState({ncPlaceHolder: '4414 delG, 4850_4859 delTTGGGGAGGG, 6949 dupG, 6379 del14, ',
                            ppscPlaceHolder: 'Asp1472 fs, Lys1617 fs, Asp2317 fs, Val2133Pro fs*12'})
                    }
                    else if(this.state.MutationType == 'Nonsense') {
                        this.setState({ncPlaceHolder: '7969C>T',
                            ppscPlaceHolder: 'Gln2657*'})
                    }
                    else {
                        this.setState({ncPlaceHolder: '', ppscPlaceHolder: ''})
                    }
                }
                else {
                    if(this.state.MutationType == 'Missense') {
                        this.setState({ncPlaceHolder: '-2522C>T, 533-2A>G, 3539-2 delA, 7729-5G>A(DASH), 8190_8253+1 dup64, 5312-104_5455+642 del'})
                    }
                    else {
                        this.setState({ncPlaceHolder: ''})
                    }
                }
            }
        })
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
                    <Option value = "Missense">Missense</Option>
                    <Option value="Insertion, Duplication and Deletion">Insertion, Duplication and Deletion</Option>
                    <Option value = "Frameshift mutations">Frameshift mutations</Option>
                    <Option value = "Nonsense">Nonsense</Option>
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
                <Input name="Region" onChange={e=>this.handleInputChange(e)} value={this.state.Region} />
            </Form.Item>

            <Form.Item label="Nucleotide change" name="Nucleotide substitution">
                <Input placeholder={this.state.ncPlaceHolder} value={this.state.Nucleotide}
                name="Nucleotide" onChange={e=>this.handleInputChange(e)} />
            </Form.Item>

            <Form.Item label="Protein primary structure changes" name="Amino acid change">
                <Input placeholder={this.state.ppscPlaceHolder}
                name = "aminoAcid" value={this.state.aminoAcid}
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
                        onChange={e=>this.handleInputChange(e)} value={this.state.aptt}
                     />
                </Form.Item>
                <Form.Item label="VWF antigen level">
                    <Input id = 'VWFAg' name = 'VWFAg' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)} value={this.state.VWFAg}
                    />
                </Form.Item>
                <Form.Item label="VWF activity level">
                    <Input id = 'VWFAct' name = 'VWFAct' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)} value={this.state.VWFAct}
                    />
                </Form.Item>
                <Form.Item label="ristocetin-induced platelet agglutination">
                    <Input id = 'RIPA' name = 'RIPA' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)} value={this.state.RIPA}
                    />
                </Form.Item>
                <Form.Item label="The activity level of FVIII">
                    <Input id = 'FVIII' name = 'FVIII' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)} value={this.state.FVIII}
                    />
                </Form.Item>
                <Form.Item label="VWF collagen binding capacity">
                    <Input id = 'VWFCB' name = 'VWFCB' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)} value={this.state.VWFCB}
                    />
                </Form.Item>
                <Form.Item label="VWF propeptide level">
                    <Input id = 'VWFPP' name = 'VWFPP' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)} value={this.state.VWFPP}
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
                        onChange={e=>this.handleInputChange(e)} value={this.state.age}
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
                        onChange={e=>this.handleInputChange(e)} value={this.state.BS}
                    />
                </Form.Item>
                <Form.Item label="References">
                    <Input id = 'Reference' name = 'Reference' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)} value={this.state.reference}
                    />
                </Form.Item>
                <Form.Item label="Comments">
                    <Input id = 'Comments' name = 'Comments' style={{width:300}}
                        onChange={e=>this.handleInputChange(e)} value={this.state.comments}
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
                Router.push('/DatabasePage')
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
                })
            }
        })
    }
}