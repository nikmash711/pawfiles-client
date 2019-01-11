import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../actions/user-crud';
import {login} from '../../actions/auth';
import Input from '../input';
import {formatName} from '../helper-functions'
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import LoadingAnimation from '../loading-animation'
import './onboarding-form.css'
import './registration-form.css'

const passwordLength = length({min: 6, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          loading: false,
        };
      }

    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        user.firstName = formatName(user.firstName);
        //start showing an animation 
        this.setState({loading:true});
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    componentWillUnmount(){
        this.setState({loading:false});
    }

    render() {
        let error;
        console.log('props.error', this.props.error)
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        return (
            <form
                className="onboarding-form register form blurb"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h2>Register</h2>

                {error}

                <Field 
                    component={Input} 
                    type="text" 
                    name="firstName" 
                    label="First Name:"
                    className="required"
                    maxLength="12"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <Field 
                    component={Input} 
                    type="text" 
                    name="lastName" 
                    label="Last Name:"
                    className="required"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    label = "Username:"
                    className="required"
                    validate={[required, nonEmpty, isTrimmed]}
                />

                <Field
                    component={Input}
                    type="password"
                    name="password"
                    label="Password:"
                    className="required"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <Field
                    component={Input}
                    type="password"
                    label="Confirm Password:"
                    name="passwordConfirm"
                    className="required"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
                {this.state.loading && <LoadingAnimation/>}
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (error, dispatch) => {
        console.log('obj.keys', Object.keys(error)[0])
        dispatch(focus('registration', Object.keys(error)[0]));
    }
})(RegistrationForm);