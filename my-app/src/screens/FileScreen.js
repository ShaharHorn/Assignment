import React from 'react'; 
import '../App.css';
import InputFileComponent from '../components/InputFileComponent.js';
import TableComponent from '../components/TableComponent.js';

class FileScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            records: null,
            sumOfAmounts: 0
        } 
        this.setRecords = this.setRecords.bind(this);
    } 
    setRecords(rec){
        let lastRec = this.state.records;
        if(!lastRec){
            let sum = 0; 
            for(let i = 0;i < rec['data'].length;i++)
                sum += rec['data'][i]['sign'] === '+' ? + parseInt(rec['data'][i]['amount']) : -  parseInt(rec['data'][i]['amount']);
            
            this.setState({records: rec, sumOfAmounts: sum})  
        }else{ 
            let res = {data: []};
            let sum = 0; 
            for(let i = 0;i < rec['data'].length;i++){
                res.data.push(rec['data'][i]) 
                sum += rec['data'][i]['sign'] === '+' ? + parseInt(rec['data'][i]['amount']) : -  parseInt(rec['data'][i]['amount']);
            }
            for(let i = 0;i < lastRec['data'].length;i++){
                res.data.push(lastRec['data'][i]) 
                sum += lastRec['data'][i]['sign'] === '+' ? + parseInt(lastRec['data'][i]['amount']) : -  parseInt(lastRec['data'][i]['amount']);
            } 
            this.setState({records: res, sumOfAmounts: sum}) 
        }  
        console.log('setRecords',rec)
    }

    delRecord = (key) =>{
        let companyID = key.split('&')[0]; 
        let docID = key.split('&')[1]; 
        let amount = parseInt(key.split('&')[2]); 
        let sign = key.split('&')[3];
        let rec = this.state.records['data'];
        let recResult = [] 
        rec.filter((item) => {
            console.log(`${item['companyID']}`,`${item['docID']}`,companyID,docID)
            if(docID !== `${item['companyID']}` || companyID !== `${item['docID']}`)
                recResult.push(item)
        }); 
    
        console.log('recResult',sign,this.state.sumOfAmounts)
        this.setState({records: {data: recResult}, sumOfAmounts: sign=='-' ? this.state.sumOfAmounts + amount : this.state.sumOfAmounts - amount })
    }

    render(){
        console.log('render')
        return (
            <div className="App"> 
                <h1> File Uploader </h1> 
                <InputFileComponent setRecords={this.setRecords}/>
                <TableComponent sumOfAmounts={this.state.sumOfAmounts} records={this.state.records} delRecord = {this.delRecord}/> 
                {/* <div>No file selected</div> */}
            </div>
        )
    }
}

export default FileScreen