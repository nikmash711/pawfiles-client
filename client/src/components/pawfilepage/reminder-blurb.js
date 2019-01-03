import React from 'react';
import {connect} from 'react-redux';
import Reminder from './reminder';
import {showReminderForm} from '../../actions/index';
import ReminderForm from './reminder-form'
import './reminder-blurb.css';

export class ReminderBlurb extends React.Component{

  render(){
    const reminders = this.props.reminders.map((reminder, index)=>(
      <Reminder reminderId={reminder.id} key={index} {...reminder}/>
    ));

    return(
      <article className="blurb reminders">
        <h2>Reminders</h2>
        <ul className = "reminders-list">
          {reminders}
          <li className="reminder">
            <button onClick={()=>{this.props.dispatch(showReminderForm(true, undefined))}} className="add-reminder">+ Add New</button>
          </li>
        </ul>
        {this.props.showReminderForm && <ReminderForm/>}
      </article>
    );
  }
}

function mapStateToProps(state) {
  return {
    showReminderForm: state.pawfile.showReminderForm,
    currentReminderId: state.pawfile.currentReminderId
  }
}

export default connect(mapStateToProps)(ReminderBlurb);
{/* <button type="button" className="more-options-button" onClick={()=>this.toggleMoreOptions()}>More options</button> */}

{/* {this.state.showMoreOptions && 
<div className="more-options">
  <input ref={input => this.dateInput = input} type="date" max={todaysDate()}/>
</div>
} */}

{/* <button className="add-reminder-button" type="submit" onClick={(e)=>this.onSubmit(e)}>Add</button> */}
{/* Have the time/date option be hidden unless user clicks a button that says time/date, then display visible and keep the values and submit with form  */}
{/* <input type="date" />
<input type="time" /> */}