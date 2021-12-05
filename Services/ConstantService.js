/**
 * 20个属性名称标准：
 * MutationLocation 
 * illType // both, Exon, Intron
 * MutationType // both, Exon, Intron
 * Genotype // both, Exon, Intron
 * Region // both, Exon, Intron
 * Nucleotide // both, Exon, Intron
 * aminoAcid // both, Exon, Intron
 * Aptt // both, Exon, Intron, None
 * VWFAg // both, Exon, Intron, None
 * VWFAct // both, Exon, Intron, None
 * RIPA // both, Exon, Intron, None
 * FVIII // both, Exon, Intron, None
 * VWFCB // both, Exon, Intron, None
 * VWFPP // both, Exon, Intron, None
 * BloodType // both, Exon, Intron, None
 * age // both, Exon, Intron, None
 * gender // both, Exon, Intron, None
 * BS // both, Exon, Intron, None
 * Reference // both, Exon, Intron, None
 * Comments // both, Exon, Intron, None
 */
import {Button} from 'antd'
var columns = [
    {
      title: 'PatientID',
      dataIndex: 'fixedId',
      key: '1',
      width: 100,
    },
    {
        title: 'Mutation Location',
        dataIndex: 'mutationLocation',
        key: '100',
        width: 100,
    },
    {
      title: 'VWD type',
      dataIndex: 'illType',
      key: '2',
      width: 100,
    },
    {
      title: 'Mutation Type',
      dataIndex: 'mutationType',
      key: '3',
      width: 100,
    },
    {
        title: 'Nucleotide change',
        dataIndex: 'nucleotide',
        key: '4',
        width: 200,
    },
    {
        title: 'Protein primary structure changes',
        dataIndex: 'aminoAcid',
        key: '5',
        width: 150,
    },
    {
        title: 'GenoType',
        dataIndex: 'genotype',
        key: '80',
        width: 150,
    },
    {
        title: 'Exon No.',
        dataIndex: 'region',
        key: '81',
        width: 150,
    },
    {
        // title: '生理检测指标(APPTT(%))',
        title: 'activated partial thromboplastin time',
        dataIndex: 'aptt',
        key: '8',
        width: 200,
    },
    {
        // title: '生理检测指标(VWF.Ag(%))',
        title:'VWF antigen level',
        dataIndex: 'VWFAg',
        key: '9',
        width: 200,
    },
    {
        // title: '生理检测指标(VWF.Act(%))',
        title:'VWF activity level',
        dataIndex: 'VWFAct',
        key: '10',
        width: 200,
    },
    {
        // title: '生理检测指标(RIPA(1.5mg/ml))',
        title:'ristocetin-induced platelet agglutination',
        dataIndex: 'RIPA',
        key: '11',
        width: 230,
    },
    {
        // title: '生理检测指标(FVIII:C(%))',
        title: 'The activity level of FVIII',
        dataIndex: 'FVIII',
        key: '12',
        width: 200,
    },
    {
        // title: '生理检测指标(VWF:CB)',
        title:'VWF collagen binding capacity',
        dataIndex: 'VWFCB',
        key: '13',
        width: 200,
    },
    {
        // title: '生理检测指标(VWF-pp)',
        title: 'VWF propeptide level',
        dataIndex: 'VWFPP',
        key: '14',
        width: 200,
    },
    {
        title: 'Blood Type',
        dataIndex: 'bloodType',
        key: '15',
        width: 150,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: '16',
        width: 150,
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: '17',
        width: 150,
    },
    {
        // title: '生理检测指标(BS)',
        title:'Bleeding time',
        dataIndex: 'BS',
        key: '18',
        width: 150,
    },
    {
        title: 'References',
        dataIndex: 'reference',
        key: '19',
        width: 150,
    },
    {
        title: 'Comments',
        dataIndex: 'comments',
        key: '20',
        width: 150,
    },
  ];
var webSiteName = "von Willebrand factor Variant Database"
export function getColumn() {
    return columns;
}

export function getWebSiteName() {
    return webSiteName;
}
