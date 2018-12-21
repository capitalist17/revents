/** Every modal at the outset has two states. Its either open or close.
 * If the action is to open the model, then you have to know which model to open identified 
 * by modalType and after opening you have to set the state to the current model. 
 * Closing a model is simple. Just close the current Modal
 */

import { MODAL_CLOSE, MODAL_OPEN } from "./modalConstants";

const initialState = null;

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case MODAL_OPEN:
        const {modalType, modalProps} = action.payload;
        return {modalType, modalProps} ;
      case MODAL_CLOSE:
        return null;
      default:
        return state;
    }
  };
  
  export default modalReducer;