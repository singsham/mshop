import React, { Component } from "react";
import axios from "axios";

import Upload from "./components/Upload";
import DisplayMedia from "./components/DisplayMedia";
import InfoModal from "./components/InfoModal";

class App extends Component {
  state = {
    mediaFiles:[],
    selectedFile: null,
    processBar: false,
    showModal:false,
    modalContents:null,
    inputKey:Date.now()
  };

  componentWillMount() {
    axios.get("/api/media/media-list").then((response)=>{
      if(200 === response.status){
        this.setState({mediaFiles:response.data.mediaUrl})
        console.log(response.data.mediaUrl);
      }
    })
  }

  singleFileChangedHandler = (e) => {
    this.setState({
      selectedFile:e.target.files[0]
    });
  };

  singleFileUploadHandler = () => {
    const data = new FormData();
    this.setState({ processBar: true });
    // If file selected
    if (this.state.selectedFile) {
      data.append("profileImage", this.state.selectedFile, this.state.selectedFile.name.replace(/\s/g, "-"));

      axios
        .post("/api/media/media-upload", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
          }
        })
        .then((response) => {
          this.setState({ processBar: false });
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              this.setState({showModel:true,modalContents:response.data.error})
            }else {
            // Success
            const mediaData=response.data;
            this.setState({mediaFiles:[mediaData,...this.state.mediaFiles],selectedFile:null,showModal:true,modalContents:"File Uploaded",inputKey:Date.now()});
            console.log("fileName", this.state.mediaFiles);
          }}
        })
        .catch((error) => {
          // If another error
          this.setState({ processBar: false,showModal:true,modalContents:error,inputKey:Date.now()});
        });
    } else {
      // if file not selected throw error
      this.setState({ processBar: false,showModal:true,modalContents:"Please upload file" });
    }
  };

  hideModalHandler=()=>{
    this.setState({showModal:false});
  }
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <h1 className="display-4 text-center">mShop Music App</h1>
          <h3 className="display-5 text-right mr-5">just listen...anywhere</h3>
        </div>
        <InfoModal content={this.state.modalContents} showModal={this.state.showModal} hideModal={this.hideModalHandler}/>

        <div className="container">
          <div className="row">
            <Upload ClassName="col-lg-4" singleFileUploadHandler={this.singleFileUploadHandler} singleFileChangedHandler={this.singleFileChangedHandler} processBar={this.state.processBar} inputKey={this.state.inputKey}/>
            <DisplayMedia mediaFiles={this.state.mediaFiles}/>
          </div>
          
        </div>

        <div className="jumbotron">
          <h1 className="display-4 text-center">footer</h1>
        </div>
      </div>
    );
  }
}

export default App;
