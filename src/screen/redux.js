import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as action from '../actions';
class LibraryList extends Component {
   
    render() { 
        return ;
    }
}
 
const mapStateToProps=state=>{
    return {libraries: state.libraries};
}
export default connect(mapStateToProps)(LibraryList) ;