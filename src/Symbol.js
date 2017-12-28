import React, { Component } from 'react';

class Symbol extends Component {
  render() {
    return  <div className="Symbol">
              {this.props.symbol==0 &&
                <span className="Symbol">@</span>
              }
              {this.props.symbol==1 &&
                <span className="Symbol">#</span>
              }
              {this.props.symbol==2 &&
                <span className="Symbol">!</span>
              }
              {this.props.symbol==3 &&
                <span className="Symbol">$</span>
              }
              {this.props.symbol==4 &&
                <span className="Symbol">+</span>
              }
              {this.props.symbol==5 &&
                <span className="Symbol">~</span>
              }
              {this.props.symbol==6 &&
                <span className="Symbol">-</span>
              }
              {this.props.symbol==7 &&
                <span className="Symbol">:</span>
              }
              {this.props.symbol==8 &&
                <span className="Symbol">%</span>
              }
              {this.props.symbol==9 &&
                <span className="Symbol">=</span>
              }
              {this.props.symbol==10 &&
                <span className="Symbol">X</span>
              }
              {this.props.symbol==11 &&
                <span className="Symbol">O</span>
              }
            </div>
  }
}

export default Symbol;
