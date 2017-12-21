import React, { Component } from 'react';

class Symbol extends Component {
  render() {
    return  <div>
              {this.props.symbol==0 &&
                <p>@@@</p>
              }
              {this.props.symbol==1 &&
                <p>###</p>
              }
              {this.props.symbol==2 &&
                <p>!!!</p>
              }
              {this.props.symbol==3 &&
                <p>$$$</p>
              }
              {this.props.symbol==4 &&
                <p>+++</p>
              }
            </div>
  }
}

export default Symbol;
