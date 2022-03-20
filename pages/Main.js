/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-27 15:10:10
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-11-12 18:59:34
 */
import React from 'react'
import HeaderBar from './Components/HeadBar'
import {Layout, Button} from 'antd'
import Link from 'next/link'
import Grid from 'antd/lib/card/Grid'
const { Header, Footer, Content} = Layout

class Main extends React.Component {
    render() {
        return (
            <div>
                <Header><HeaderBar current='MainPage'/></Header>
                <Content style={{padding:20}}>
                <img src="/mainPagePic.bmp" alt="" style={{align:'middle'}}/>
                <p style={{textIndent: '1em', fontSize:15}}>
                    Von Willebrand disease (VWD) is the most common inherited
                    bleeding disorder in humans, caused by deficient or defective plasma von Willebrand factor (VWF).
                    The prevalence of VWD is typically stated to be 1%, with a symptomatic prevalence of 1:1000. The
                    most frequent symptoms are mucosa-associated bleedings like bruising, epistaxis and menorrhagia.
                    Rupture of corpus luteum, joint bleeding and hematomas may also occur in severe type VWD. VWD is
                    classified into three primary categories according to the underlying molecular basis. Type 1
                    includes partial quantitative deficiency, type 2 includes qualitative defects, and type 3 includes
                    virtually complete deficiency of VWF. VWD type 2 is divided into four secondary categories: type 2A,
                    type 2B, type 2M and type 2N. The intensity of the bleeding symptoms, mode of inheritance and
                    treatment strategy vary among different types of VWD. The phenotype of VWD is directly related with
                    corresponding mutations of VWF gene.
                    <p />
                    <b style={{textIndent: '1em'}}>
                        The aim of present database is to establish phenotype-genotype correlations for VWD and help to
                        predict the pathogenicity and pathogenic mechanism of novel VWF mutations.
                    </b>
                </p>
                <p style={{paddingRight:20, paddingLeft:20, fontSize:10, color:Grid}}>
                    <p>1.Rodeghiero F, Castaman G, Dini E. Epidemiological investigation of the prevalence of von Willebrand&apos;s disease. Blood. 1987;69(2):454-459.</p>
                    <p>2.Bowman M, Hopman WM, Rapson D, Lillicrap D, James P. The prevalence of symptomatic von Willebrand disease in primary care practice. J Thromb Haemost. 2010;8(1):213-216.</p>
                    <p>3.Sadler JE, Budde U, Eikenboom JC, et al. Update on the pathophysiology and classification of von Willebrand disease: a report of the Subcommittee on von Willebrand Factor. J Thromb Haemost. 2006;4(10):2103-2114.</p>
                    <p>4.Goodeve AC. The genetic basis of von Willebrand disease. Blood reviews. 2010;24(3):123-134.</p>
                </p>
                <Button style={{fontSize:20, position:'relative', left: 800, height:40}} type="primary"><Link href="./DatabasePage">Access</Link></Button>
                <Button style={{fontSize:20, position:'relative', left: 200, height:40}} type="primary"><Link href="help">Help</Link></Button>
                </Content>
                <Footer style={{textAlign:'center'}}>©2021 Created by JunhanXu</Footer>
            </div>
        )
    }
}
export default Main;