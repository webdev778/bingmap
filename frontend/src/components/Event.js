import React, { Component } from 'react'
import ReactTable, { ReactTableDefaults } from 'react-table'
import 'react-table/react-table.css'

Object.assign(ReactTableDefaults, {
  defaultPageSize: 10,
  minRows: 10,
  // etc...
})

class Event extends Component {
  render () {
    const { data } = this.props;
    // const data = [{
    //   id: 1, 
    //   nume: "Hello", 
    //   data_inceput: "2018-01-14T12:04:12.000Z", 
    //   data_final: "2018-01-14T12:04:12.000Z"
    // }, {
    //   id: 2, 
    //   nume: "Hello", 
    //   data_inceput: "2018-01-14T12:04:12.000Z", 
    //   data_final: "2018-01-14T12:04:12.000Z"
    // }, {
    //   id: 3, 
    //   nume: "Hello", 
    //   data_inceput: "2018-01-14T12:04:12.000Z", 
    //   data_final: "2018-01-14T12:04:12.000Z"
    // }];

    const columns = [{
        Header: 'No',
        accessor: 'id', // String-based value accessors!
        Cell: props => <button style={{border: props.value === this.props.selected ? '1px solid blue' : ''}} onClick={()=>this.props.onSelect(props.value)} className='number'>{props.value}</button> // Custom cell components!
      }, {
        Header: 'Name',
        accessor: 'nume' // String-based value accessors!
      }, {
        Header: 'Created Time',
        accessor: 'data_inceput' // String-based value accessors!
      }, {
        Header: 'Updated Time',
        accessor: 'data_final' // String-based value accessors! 
    }];

    return (
      <div>
        <div>
          name: <input type="text" onChange={this.props.onChange}/>
          <input type="button" value="ADD" onClick={this.props.onAdd}/>
        </div>
        <ReactTable
          data={data}
          columns={columns}
        />
      </div>
    )
  }
}

export default Event;