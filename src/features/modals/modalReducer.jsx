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