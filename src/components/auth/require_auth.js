// ************* COPIED FROM HOC LESSOIN *****************
import React, { Component } from 'react';
import { connect } from 'react-redux';

// argument is compoent we want to wrap
export default function (AuthRequiredComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }
    // context is just like props but skips levels in app
    // forces you to not abuse context by defining context types
    // if we want access to context router, need to define type object
    //static contextTypes = { allows anywhere else in app access to
    // authentication.contextTypes; console log this.context logs router:
    // static defines property on class authentication, not instance
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        // do not use this.nextProps
        this.context.router.push('/');
      }
    }

    render() {
      // console.log(this.context);
      // console.log(this.props.resources) // => resourcesList
      // console.log(this.props.authenticated);
      return <AuthRequiredComponent {...this.props} />;
      // {...this.props} passes all props passesd
    }
  }
  function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
  // find out if currently logged in
  //*************state.auth.authenticated change from HOC lesson
  }
  return connect(mapStateToProps)(Authentication);
}

// in some other location.. not in this file
// we want to use this authentication
//import Authentication
//import Resources //component we want to wrap

// const ComposedComponent = Authentication(Resources);

// <ComposedComponent resources={resourcesList}/> // wrapped version of resources
