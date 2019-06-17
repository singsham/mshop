import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Upload from "./components/Upload";
import DisplayMedia from "./components/DisplayMedia";

class App extends Component {
  state = {
    mediaFiles:null,
    selectedFile: null,
    processBar: false
  };

  componentWillMount() {
    axios.get("/api/media/media-list").then((response)=>{
      if(200===response.status){
        console.log('response data',response.data.mediaUrl);
        this.setState({mediaFiles:response.data.mediaUrl})
      }
    })
  }

  componentWillUpdate() {
    axios.get("/api/media/media-list").then((response)=>{
      if(200===response.status){
        console.log('response data',response.data.mediaUrl);
        this.setState({mediaFiles:response.data.mediaUrl})
      }
    })
  }

  singleFileChangedHandler = (event) => {
    this.setState({
      selectedFile:event.target.files[0]
    });
  };

  singleFileUploadHandler = () => {
    console.log("file details",this.state.selectedFile)
    const data = new FormData();
    this.setState({ processBar: true });
    // If file selected
    if (this.state.selectedFile) {
      const fileName = this.state.selectedFile.name.replace(/\s/g, "-");
      data.append("profileImage", this.state.selectedFile, fileName);

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
              this.ocShowAlert(response.data.error, "red");
            }else {
            // Success
            this.setState({selectedFile:null});
            console.log("fileName", response.data);
            this.ocShowAlert("File Uploaded", "#3089cf");
          }}
        })
        .catch((error) => {
          // If another error
          this.setState({ processBar: false });
          this.ocShowAlert(error, "red");
        });
    } else {
      // if file not selected throw error
      this.setState({ processBar: false });
      this.ocShowAlert("Please upload file", "red");
    }
  };

  // ShowAlert Function
  ocShowAlert = (message, background = "#3089cf") => {
    let alertContainer = document.querySelector("#oc-alert-container"),
      alertEl = document.createElement("div"),
      textNode = document.createTextNode(message);
    alertEl.setAttribute("class", "oc-alert-pop-up");
    $(alertEl).css("background", background);
    alertEl.appendChild(textNode);
    alertContainer.appendChild(alertEl);
    setTimeout(function() {
      $(alertEl).fadeOut("slow");
      $(alertEl).remove();
    }, 6000);
  };

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <h1 className="display-4 text-center">mShop Music App</h1>
          <h3 className="display-5 text-right mr-5">just listen...anywhere</h3>
        </div>

        <div className="container">
          {/* For Alert box*/}
          <div id="oc-alert-container" />
          <Upload singleFileUploadHandler={this.singleFileUploadHandler} singleFileChangedHandler={this.singleFileChangedHandler} processBar={this.state.processBar} />
          <DisplayMedia mediaFiles={this.state.mediaFiles}/>
        </div>

        <div className="jumbotron">
          <h1 className="display-4 text-center">footer</h1>
        </div>
      </div>
    );
  }
}

export default App;
