const MovieReducer = (state, action) => {
    switch (action.type) {
      case "GET_USER_START":
        return {
          movies: [],
          isFetching: true,
          error: false,
        };
      case "GET_USER_SUCCESS":
        return {
          movies: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_USER_FAILURE":
        return {
          movies: [],
          isFetching: false,
          error: true,
        };
      case "CREATE_USER_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "CREATE_USER_SUCCESS":
        return {
          movies: [...state.movies, action.payload],
          isFetching: false,
          error: false,
        };
      case "CREATE_USER_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "UPLOAD_USER_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "UPLOAD_USER_SUCCESS":
        return {
          movies: state.movies.map(
            (movie) => movie._id === action.payload._id && action.payload
          ),
          isFetching: false,
          error: false,
        };
      case "UPLOAD_USER_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "DELETE_USER_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "DELETE_USER_SUCCESS":
        return {
          movies: state.movies.filter((movie) => movie._id !== action.payload),
          isFetching: false,
          error: false,
        };
      case "DELETE_USER_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      default:
        return { ...state };
    }
  };
  
  export default MovieReducer;