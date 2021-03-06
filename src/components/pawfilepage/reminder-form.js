import React from 'react';
import {connect} from 'react-redux';
import {submitReminder} from '../../actions/reminder-crud';
import {showReminderForm} from '../../actions/index';
import {todaysDate} from '../common/helper-functions';
import './reminder-blurb.css';
import './reminder-form.css';

export class ReminderForm extends React.Component{
  componentDidMount(){
    this.noteInput.focus();
  }

  componentWillUnmount(){
    this.props.dispatch(showReminderForm(false, undefined));
  }

  onSubmit(e){
    e.preventDefault();
    const values={note: this.noteInput.value, date: this.dateInput.value, time:this.timeInput.value};
    this.props.dispatch(submitReminder(values, this.props.currentPetId, this.props.currentReminderId));
    this.noteInput.value = "";
    this.dateInput.value="";
    this.props.dispatch(showReminderForm(false, undefined));
  }
  
  render(){
    return(
      <div className="reminder-form-modal">
        <form className="new-reminder-form" onSubmit={ (e)=> this.onSubmit(e)}>
          
          <fieldset className="reminder-fieldset">
            <label htmlFor="note" className="required note-label">Reminder:</label>
            <input required className="new-reminder-note" ref={input => this.noteInput = input} type="text" id="note" name="note" maxLength="22" placeholder="New reminder..." defaultValue={this.props.individualReminder ? this.props.individualReminder.note : ""}/>
          </fieldset>

          <fieldset className="date-time-options">
            <legend align="center" className="date-time-legend">Date/Time</legend>
            <div>
              <label htmlFor="date">Date:</label>
              <input className="reminder-date" ref={input => this.dateInput = input} type="date" id="date" defaultValue={this.props.individualReminder ? this.props.individualReminder.date : todaysDate()} min={ todaysDate()} />
            </div>
           
          <div>
          <label htmlFor="time">Time:</label>
            <input className="reminder-time" ref={input => this.timeInput = input} type="time" id="time" defaultValue={this.props.individualReminder ? this.props.individualReminder.time : ""} />
          </div>
           
          </fieldset>
         
          <div className="buttons">
            <button type="submit" className="save-reminder">Save</button>
            <button onClick={()=>this.props.dispatch(showReminderForm(false, undefined))} type="button" className="cancel-reminder">Cancel</button>
          </div>
        </form>
      </div>

    );
  }
}

function mapStateToProps(state) {
  let currentReminderId = state.pawfile.currentReminderId;
  let currentPetId = state.pawfile.currentPetId;
  let individualPawfile = state.pawfile.pawfiles.find(pawfile=>pawfile.id===currentPetId);

  return {
    currentReminderId: state.pawfile.currentReminderId,
    currentPetId: state.pawfile.currentPetId,
    individualReminder: individualPawfile.reminders.find(reminder=>reminder.id===currentReminderId)
  }
}

export default connect(mapStateToProps)(ReminderForm);