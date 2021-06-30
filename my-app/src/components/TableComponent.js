import React from 'react'; 
import Draggable from 'react-draggable'; 
import {MdDelete} from 'react-icons/md'
class TableComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            records: this.props.records,  
            tableHeaders: ["DocType","CompanyID","Date","DocID","Sign","Amount"," "], 
        }  
    }  
    onAddHeader = (str) =>{
        let headers = this.state.tableHeaders;
        headers.push(str)
        this.setState({tableHeaders: headers});
    }
    getTdTable = (tds) =>{
        let res = [];
        console.log('tds',tds)
        for(let i=0; i<Object.values(tds).length;i++){
            res.push(<td>{Object.values(tds)[i]}</td>);  
        }
        let key = `${Object.values(tds)[3] + '&' + Object.values(tds)[1] + '&' + Object.values(tds)[5]+ '&' + Object.values(tds)[4]}` ;
        res.push(<td onClick={()=>{alert(Object.values(tds)[3] + ' ' +Object.values(tds)[1]);this.props.delRecord(key);}} style={{cursor:'pointer'}}><MdDelete/></td>);  
        return res;
    }

    getRowsTable = () =>{
        let records = this.props.records['data'];
        let tableHeader = this.state.tableHeaders;
        let th = [];
        let tr = [];

        if(!records)
            return;
        
        for(let i=0; i<tableHeader.length;i++)
            th.push(<th>{tableHeader[i]}</th>);

        for(let i = 0 ; i < records.length;i++){  
            tr.push(<Draggable   
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                positionOffset={this.state.defPosY || this.state.defPosX ? {x: this.state.defPosX, y: this.state.defPosY} : null}
                onMouseDown = {(e)=>{
                  this.setState({startPosX: e['clientX']})
                  this.setState({startPosY: e['clientY']})
                }}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={(e)=>{
                }}><tr style={{cursor:'default'}} className="handle" >
            {this.getTdTable(records[i])}</tr></Draggable>);
        }
        return([
            <tr style={{minHeight:100,minWidth:1000}}> 
                {th}
            </tr>,tr
            ])
    }
    render(){ 
        return (  
            <>
                <p>Sum Of Amounts: {this.props.sumOfAmounts}</p>
                <table>
                    {this.props.sumOfAmounts !== 0 && this.props.records ? this.getRowsTable() : <p><b>No Records On Table</b></p>}
                </table>
            </>
            
        )
    }
}
export default TableComponent;