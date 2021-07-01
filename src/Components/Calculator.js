import { Component } from "react";
import "./calculator.css";
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ans:0,
      equation: "",
    };
  }
  solve() {
    // remove preceding zeros
    var x = 0;
    while (this.state.equation[x] === 0) ++x;
    this.setState({
      equation: this.state.equation.substr(x, this.state.equation.length - x),
    });
    var operations = [];
    var values = [];
    var v = 0;
    for (var i = 0; i < this.state.equation.length; ++i) {
      if (
        this.state.equation[i] !== "+" &&
        this.state.equation[i] !== "*" &&
        this.state.equation[i] !== "-" &&
        this.state.equation[i] !== "÷"
      )
        v = v + this.state.equation[i];
      else {
        values.push(parseFloat(v));
        v = 0;
        operations.push(this.state.equation[i]);
      }
    }
    if (
      this.state.equation[this.state.equation.length - 1] === "+" ||
      this.state.equation[this.state.equation.length - 1] === "-" ||
      this.state.equation[this.state.equation.length - 1] === "*" ||
      this.state.equation[this.state.equation.length - 1] === "÷"
    )
      operations.pop();
    else
      values.push(parseFloat(v));
    for(i=0;i<operations.length;++i){
      console.log(values[i]+operations[i]+values[i+1]);
      if(operations[i]==='+'){
        values[i+1]=values[i]+values[i+1];
      }
      else if(operations[i]==='-'){
        values[i+1]=values[i]-values[i+1];
      }
      else if(operations[i]==='*'){
        values[i+1]=values[i]*values[i+1];
      }
      else if(operations[i]==='÷'){
        values[i+1]=values[i]/values[i+1];
      }
      console.log(values[i+1]);
    }
    // console.log(values[values.length-1]);
    this.setState({
      ans:values[values.length-1]
    });
  }
  update(data) {
    if (data === -1) {
      this.setState({
        equation: "",
        ans: 0,
      });
    } else if (data === -2) {
      this.setState({
        equation: this.state.equation.substr(0, this.state.equation.length - 1),
      },()=>{this.solve()});
    } else {
      if (
        (this.state.equation[this.state.equation.length - 1] === "÷" ||
          this.state.equation[this.state.equation.length - 1] === "*" ||
          this.state.equation[this.state.equation.length - 1] === "+" ||
          this.state.equation[this.state.equation.length - 1] === "-") &&
        (data === "÷" || data === "*" || data === "+" || data === "-") &&
        this.state.equation[this.state.equation.length - 1] !== data
      ) {
        this.setState({
          equation:
            this.state.equation.substr(0, this.state.equation.length - 1) +
            data,
        });
      } else if (data === "=") {
        this.setState({}, () => {
          this.solve();alert(this.state.equation +' = '+this.state.ans)
        });
      } else if (data === "%") {
        //extract last value
        var Value_after_point = 0;
        var isPointVisisble = false;
        var len = -1;
        var val = "";
        var x = this.state.equation.length - 1;
        while (
          x >= 0 &&
          this.state.equation[x] !== "÷" &&
          this.state.equation[x] !== "*" &&
          this.state.equation[x] !== "+" &&
          this.state.equation[x] !== "-"
        ) {
          if (this.state.equation[x] === ".") {
            isPointVisisble = true;
            Value_after_point = val.length;
          }
          val = this.state.equation[x] + val;
          x = x - 1;
        }
        var new_val = "";
        if (val !== "") {
          if (isPointVisisble === false) {
            val = val + ".";
            len = val.length - 1;
          } else {
            len = val.length - 1 - Value_after_point;
          }
          if (len === 1) {
            new_val = "0.0" + val[0] + val.substr(2, val.length - 2);
          } else if (len === 2) {
            new_val = "0." + val[0] + val[1] + val.substr(3, val.length - 3);
          } else {
            new_val =
              val.substr(0, len - 2) +
              "." +
              val.substr(len - 2, 2) +
              val.substr(len + 1, val.length - len - 1);
          }
          // console.log(new_val);
        }
        this.setState({
          equation: this.state.equation.substr(0, x + 1) + new_val,
        },()=>{this.solve()});
      } else if (
        !(
          (this.state.equation[this.state.equation.length - 1] === "+" &&
            data === "+") ||
          (this.state.equation[this.state.equation.length - 1] === "-" &&
            data === "-") ||
          (this.state.equation[this.state.equation.length - 1] === "*" &&
            data === "*") ||
          (this.state.equation[this.state.equation.length - 1] === "÷" &&
            data === "÷") ||
          (this.state.equation[this.state.equation.length - 1] === "." &&
            data === ".")
        )
      ) {
        this.setState(
          {
            equation: this.state.equation + data,
          },
          () => {
            this.solve();
          }
        );
      }
    }
  }
  valuechangedetected = () => {
    alert("Please use numbers from button available");
  };
  render() {
    const { equation } = this.state;
    return (
      <div>
        <label className="ans">={this.state.ans}</label>
        <input
          type="text"
          className="input"
          value={equation}
          onChange={this.valuechangedetected}
        ></input>
        <div>
          <button className="button" onClick={() => this.update(-1)}>
            C
          </button>
          <button className="button" onClick={() => this.update(-2)}>
            X
          </button>
          <button className="button" onClick={() => this.update("%")}>
            %
          </button>
          <button className="button" onClick={() => this.update("÷")}>
            ÷
          </button>
        </div>
        <div>
          <button className="button" onClick={() => this.update("7")}>
            7
          </button>
          <button className="button" onClick={() => this.update("8")}>
            8
          </button>
          <button className="button" onClick={() => this.update("9")}>
            9
          </button>
          <button className="button" onClick={() => this.update("*")}>
            *
          </button>
        </div>
        <div>
          <button className="button" onClick={() => this.update("6")}>
            6
          </button>
          <button className="button" onClick={() => this.update("5")}>
            5
          </button>
          <button className="button" onClick={() => this.update("4")}>
            4
          </button>
          <button className="button" onClick={() => this.update("-")}>
            -
          </button>
        </div>
        <div>
          <button className="button" onClick={() => this.update("3")}>
            3
          </button>
          <button className="button" onClick={() => this.update("2")}>
            2
          </button>
          <button className="button" onClick={() => this.update("1")}>
            1
          </button>
          <button className="button" onClick={() => this.update("+")}>
            +
          </button>
        </div>
        <div>
          <button className="button" onClick={() => this.update("0")}>
            0
          </button>
          <button className="button" onClick={() => this.update("00")}>
            00
          </button>
          <button className="button" onClick={() => this.update(".")}>
            .
          </button>
          <button className="button" onClick={() => this.update("=")}>
            =
          </button>
        </div>
      </div>
    );
  }
}
export default Calculator;
