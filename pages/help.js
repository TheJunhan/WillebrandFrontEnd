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
        <Header>
            <HeadBar current="help"/>
        </Header>
            <h1 style={{marginLeft: '45%'}}>Help</h1>
            <h2 style={{marginLeft: '1%'}}>·How to upload data?</h2>
            <p style={{textIndent: '1em', marginInline: '3%'}}>
                If you have a dozen of data, there’s an easy way that you
                can ask manager with <b>Email</b> for a template.
            </p>
            <p style={{textIndent: '1em', marginInline: '3%'}}>
                If you just have several data, you may need to upload one by one. When you decide to upload a data,
                first you have to select <b>“Mutant region”</b>, it can primarily distinct sample into “Exon”,
                “Regulatory or Intron (and Exon)” and “Unfound” according to its location on genome. Among them,
                “Regulatory or Intron (and Exon)” is including “Regulatory”, “Intron” and “Intron and Exon”, this
                way can collect mutations referring to intron and they are not intuitively and directly resulted in
                variation of amino acids. At <b>“Inheritance”</b>, we support five candidate choices, “Homozygous”,
                “Heterozygous”, “Compound Heterozygous”, “Linked Inheritance”, and “Not Known”. Maybe you can write
                more details with “Compound Heterozygous” and “Linked Inheritance”, for example
                “Linked inheritance(Gly2705Arg)”, “Compound Heterozygous(Ser2179Pro)” and “Compound Heterozygous
                (Arg1308Cys, Val1318Met, Gly2705Arg)” to enhance its credibility. for other items, we also draw a table
                <b>(Table 1)</b> to supply some examples.
            </p>
            <div style={{display:'flex', justifyContent:'center'}}><img src={'/help.png'} alt="network error"/></div>
            <p />
            <h2 style={{marginLeft: '1%'}}>·How to annotate one patient with multiple mutations:</h2>
            <p style={{textIndent: '1em', marginInline: '3%'}}>
                In our database, one “IPs ID” is only corresponding to one patient whatever mutations he/she has.
            </p>
            <p style={{textIndent: '1em', marginInline: '3%'}}>
                In upload page, you can upload one mutation from a patient that he/she has more than one mutation, and return to database page. It can be seen and remember the <b>&quot;IPs ID&quot;</b> of your data. Before you upload another mutation, you need to click “Add for existed” and fill in the <b>&quot;IPs ID&quot;</b> to record information under a same patient.
            </p>
            <b style={{marginInline: '3%'}}>If you have any other questions and suggestions, please connect us with <b>Email</b>.</b>
        </div>
        )
    }
}