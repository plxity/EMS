import { ENTRY_DETAILS, EXIT_DETAILS, GET_DETAILS } from "../actions/Types";

const initialState = {
  entryDetails: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ENTRY_DETAILS:
      return {
        ...state,
        entryDetails: [payload, ...state.entryDetails]
      };
    case GET_DETAILS:
      return {
        ...state,
        entryDetails: payload,
        loading:false
      };
      case EXIT_DETAILS:
        return{
          ...state,
          entryDetails: payload
        }
    default:
      return state;
  }
}
