/** This Component is use in App.jsx. Why?
 * Since Models are top level components and can exist on its own, in our engineering design,
 * we intend to dynamically open the required model and control it the manner that we want.
 * So we have hooked all the models to the redux store and have used ModelManager to manage all 
 * all the models. This is a labourious task initially but eventually bear fruits as we wire up
 * more models in our application. 
 */
import React from 'react'
import { connect } from 'react-redux'
import TestModal from './TestModal'

const modalLookup = {
    TestModal
  }

const mapStateToProps = (state) => ({
    currentModal: state.modals
  })

const ModalManager = ({currentModal}) => {
    let renderedModal;

    if (currentModal) {
      const {modalType, modalProps} = currentModal;
      const ModalComponent = modalLookup[modalType];
  
      renderedModal = <ModalComponent {...modalProps}/>
    }
    return <span>{renderedModal}</span>
}

export default connect(mapStateToProps)(ModalManager)
