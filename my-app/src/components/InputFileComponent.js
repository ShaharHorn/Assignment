import axios, {post} from 'axios';
import React from 'react'; 

class InputFileComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,  
        }
        this.onChange = this.onChange.bind(this); 
    }

    onChange(e){
        this.setState({file: e.target.files[0]}) 
    } 

    async onUploadFile(){
        let file = this.state.file;
        const headers = {
            "Content-Type": "multipart/form-data",
        } 
        const formData = new FormData();
        formData.append("file",file,file.name);
        try{
            let response = await axios.post("http://localhost:8080/uploadFile", formData)
            if(response) 
                this.props.setRecords(response); 
        }catch(e){
            console.error('response',e)
        } 
    }

    render(){
        return (
            <div> 
                <input type="file" name="file" onChange={this.onChange} ></input> 
                <button onClick={()=>this.onUploadFile()}>Submit</button>
            </div>
        )
    }
}

export default InputFileComponent