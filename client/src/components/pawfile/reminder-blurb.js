import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Reminder from './reminder';
import './reminder-blurb.css';

export function ReminderBlurb(props){
  console.log('in remindersp rops are ', props);
  const reminders = props.reminders.map((reminder, index)=>(
    <Reminder key={index} {...reminder}/>
  ));

  return(
    <article className="blurb reminders">
      <h2>Reminders</h2>
      <ul className = "reminders-list">
        {reminders}
      </ul>
    </article>
  );
}

export default connect()(ReminderBlurb);