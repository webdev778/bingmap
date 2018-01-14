import React, { Component } from 'react'

class Detail extends Component {
  render () {
    return (
      <div>
        location: <input id='location' type="text" onChange={this.props.onChange}/>
        detail: <input id='detail' type="text" onChange={this.props.onChange}/>
        lat: <input id='lat' type="text" onChange={this.props.onChange}/>
        lot: <input id='lot' type="text" onChange={this.props.onChange}/>
        <input type="button" value="SAVE" onClick={this.props.onSave}/> 
      </div>
    )
  }
}

export default Detail