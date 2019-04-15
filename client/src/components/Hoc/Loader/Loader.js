import React from 'react';
import { connect } from 'react-redux';
import './Loader.css';
import spinner2 from '../../../assets/loader.gif';


const Loader = (props) => {
  return (
    <React.Fragment>
        {  props.system.loader
            ? (
                <div className='Loader'>
                    <div className="Loader_wrapper">
                        <div className="Loader_content">
                            <img src={spinner2} alt="Spinner2"/>
                            <h3>
                                <span>Collecting</span>  
                                <span> Burger</span>  
                                <span> Data</span>  
                            </h3>
                        </div>
                    </div>
                </div>
            ) 
            : null
        }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
    return {
      system : state.system
    }
  }


export default connect(mapStateToProps)(Loader);