import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Map from './Map';
import Detail from './components/Detail';
import Event from './components/Event';

import * as BackApi from './lib/api';

class App extends Component {
  state = {
    eventData: [],
    selected: {},
    newEvent: {
      name: ''
    },
    selectedEventId: -1,
    map: {
      selected:{
        location:'',
        lat: '',
        longti: ''
      },
      data:[]
    },
    form:{
      detail:{
        location:'',
        detail:'',
        lat:'',
        lot:''
      }
    }
  }

  componentWillMount(){
    // alert('haha');
    this.getEvents();
  }

  getEvents = async () => {
    try{
      const { data } = await BackApi.getEvents();
      console.log(data);

      this.setState({eventData: data});
    }catch (e) {
      console.log(e);
    }
  }

  handleEventAdd = async () => {
    console.log('-------------------EventAdd--------------');
    console.log(this.state.newEvent.name);
    const newEventName = this.state.newEvent.name;
    try{
      await BackApi.addEvents(newEventName);
      await this.getEvents();
      // alert('Successfully Added');
    }catch(e){
      console.log(e);
    }
  }

  handleEventChange = (e) => {
    console.log('-------------------EventChange--------------');
    this.setState({newEvent:{name:e.target.value}});
    console.log(e.target.value);
  }

  handleEventSelect = (id) => {
    this.setState({selectedEventId:id});
    this.getDetails(id);
    // alert(id+'selected');
  }

  handleMapMarkerClick = () => {
    alert('ok');
  }

  handleSaveDetail = async () => {
    const curEventId = this.state.selectedEventId;

    if(curEventId < 0) // -1, not selected
      return;

    const { detail } = this.state.form;

    if(detail.location === '' || detail.detail === '' || detail.lat === '' || detail.lot === ''){
      alert('Please input detail informaiton.');
      return;
    }

    try{
      await BackApi.addDetail(
        curEventId, this.state.form.detail
      );

      this.getDetails(curEventId);

    }catch (e){
      console.log(e);
    }
  }

  getDetails = async (eventId) => {
    console.log('Event Id:' + eventId);
    try{
      const {data} = await BackApi.getDetailByEventId(eventId);
      if(data)
        this.setState({map:{data}});
    }catch (e) {
      console.log(e);
    }
  }

  handleDetailChange = (e) => {
    console.log(e.target.value + ' ' + e.target.id);

    const { detail } = this.state.form;
    const newDetail = {
      ...detail,
      [e.target.id]: e.target.value
    };
    this.setState({ form: { detail: newDetail } });

  }

  render() {
    return (
      <div className="App">
        <Map isMarkerShown="true" markerData = {this.state.map.data} onMarkerClick={this.handleMapMarkerClick}/>
        <div>
          <Event onChange={this.handleEventChange} onAdd={this.handleEventAdd} 
                onSelect={this.handleEventSelect} selected={this.state.selectedEventId}
                data={this.state.eventData}/>
          <Detail onChange={this.handleDetailChange} onSave={this.handleSaveDetail}/>
        </div>
      </div>
    );
  }
}

export default App;
