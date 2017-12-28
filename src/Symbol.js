import React, { Component } from 'react';

class Symbol extends Component {
  render() {
    return  <div className="Symbol">
              {this.props.symbol==0 &&
                <span className="Symbol">&#9790;</span>
              }
              {this.props.symbol==1 &&
                <span className="Symbol">&#9775;</span>
              }
              {this.props.symbol==2 &&
                <span className="Symbol">&#9658;</span>
              }
              {this.props.symbol==3 &&
                <span className="Symbol">&#9835;</span>
              }
              {this.props.symbol==4 &&
                <span className="Symbol">&#9729;</span>
              }
              {this.props.symbol==5 &&
                <span className="Symbol">&#9787;</span>
              }
              {this.props.symbol==6 &&
                <span className="Symbol">&#9827;</span>
              }
              {this.props.symbol==7 &&
                <span className="Symbol">&#9728;</span>
              }
              {this.props.symbol==8 &&
                <span className="Symbol">&#9730;</span>
              }
              {this.props.symbol==9 &&
                <span className="Symbol">&#9992;</span>
              }
              {this.props.symbol==10 &&
                <span className="Symbol">&#9824;</span>
              }
              {this.props.symbol==11 &&
                <span className="Symbol">&#9733;</span>
              }
            </div>
  }
}

export default Symbol;
