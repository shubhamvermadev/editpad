import React from "react";
import "./TextEditor.css";
import { formatJson } from "../helper";

class TextExitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      fileName: "",
      selectedVal: "",
      space: 1,
    };
  }

  deleteItem = () => {
    localStorage.removeItem(this.state.selectedVal);
    this.setState({ selectedVal: "", inputVal: "" });
  };
  saveItem = () => {
    this.state.fileName &&
      localStorage.setItem(`sam-${this.state.fileName}`, this.state.inputVal);
    this.setState({ selectedVal: `sam-${this.state.fileName}`, fileName: "" });
  };

  render() {
    const { inputVal, space } = this.state;
    return (
      <div className="container">
        <div className={"header-container"}>
          <div>TEXT AND NOTES KEEPER</div>
          {console.log("local-state", this.state)}
          <div>right</div>
        </div>

        <div className={"sidebar-text-container"}>
          <div className={"sidebar-container"}>
            sidebar
            <div style={{ height: "100px" }}>
              <div className="inp-container">
                <div>Previous: </div>
                <select
                  className="select-box-inp"
                  key={Math.random()}
                  value={this.state.selectedVal}
                  onChange={(e) => {
                    this.setState({
                      selectedVal: e.target.value,
                      inputVal: localStorage.getItem(e.target.value),
                    });
                  }}
                >
                  <option
                    style={{ cursor: "pointer" }}
                    key={"x"}
                    value={""}
                  ></option>
                  {Object.keys(localStorage).map((x) => {
                    if (x.includes("sam-"))
                      return (
                        <option style={{ cursor: "pointer" }} key={x} value={x}>
                          {x.replace("sam-", "")}
                        </option>
                      );
                  })}
                </select>
                <button
                  className="delete-selected"
                  onClick={() => this.deleteItem()}
                >
                  del
                </button>
              </div>
              <div className="inp-container">
                <div>Name: </div>
                <input
                  className="file-name-inp"
                  placeholder="Name this file to save"
                  value={this.state.fileName}
                  onChange={(e) => this.setState({ fileName: e.target.value })}
                />
              </div>
              <button
                onClick={() => this.saveItem()}
                style={{ marginTop: "10px" }}
              >
                save
              </button>
            </div>
            <div className="settings-container">
              <div>space: </div>
              <input
                placeholder="space in json"
                className="space-inp"
                type="number"
                min="1"
                max="5"
                onChange={(e) => this.setState({ space: e.target.value })}
              />
              <button
                className="format-btn"
                onClick={() => {
                  const str = document.getElementById("textareaId");
                  console.log(str.value);
                  const formatedStr = formatJson(str.value, +space);
                  this.setState({ inputVal: formatedStr });
                  localStorage.setItem("jsonFormatter", formatedStr);
                }}
              >
                format
              </button>
            </div>
          </div>
          <div className="text-area-container">
            <textarea
              id="textareaId"
              className="text-area"
              value={inputVal || ""}
              onChange={(e) => {
                this.setState({ inputVal: e.target.value });
              }}
            ></textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default TextExitor;
