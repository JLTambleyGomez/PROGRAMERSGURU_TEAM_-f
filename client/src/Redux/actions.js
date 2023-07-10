import {
//COURSES:
    getCoursesAllRequest, 
    getCoursesByNameRequest, 
    postCourseRequest,
    deleteCourseRequest,
    getCoursesByIdRequest,
//CATEGORIES:
    getCategoriesAllRequest, 
    postCategoriesRequest, 
    deleteCategoriesRequest, 
//FAVORITES
    getFavoritesRequest,
// USER
    login    

} from "../axiosRequests/axiosRequests";
//_________________________________ _________________

//ACTIONS:
//COURSES:
    export const CLEAR_COURSES = "CLEAR_COURSES";
    export const CLEAN_MESSAGE = "CLEAN_MESSAGE";
    export const GET_COURSES_BY_ID = "GET_COURSES_BY_ID";
    export const POST_COURSE="POST_COURSE"
    export const GET_COURSES_ALL = "GET_COURSES_ALL";
    export const GET_COURSES_BY_NAME = "GET_COURSES_BY_NAME";
    export const DELETE_COURSE="DELETE_COURSE";
    export const FILTER_COURSES_BY_LANGUAGE = "FILTER_COURSES_BY_LANGUAGE";
    export const FILTER_COURSES_BY_PRICING = "FILTER_COURSES_BY_PRICING";
    export const ORDER_COURSES = "ORDER_COURSES";
//CATEGORIES:
    export const GET_CATEGORIES_ALL = "GET_CATEGORIES_ALL";
    export const POST_CATEGORIES = "POST_CATEGORIES";
    export const DELETE_CATEGORIES = "DELETE_CATEGORIES";
//ERRORS:
    export const ERROR = "ERROR";
//DARK MODE:
    export const DARK_MODE = "DARK_MODE";
//FAVORITES:
    export const GET_FAVORITES = "GET_FAVORITES";
//USER:
    export const LOGIN ="LOGIN"

//__________________________________________________
//ACTION CREATORS:

//COURSES:
export const get_courses_all = () => {
    return async (dispatch) => {
        try {
            const data = await getCoursesAllRequest() // request
            return dispatch({
                type: GET_COURSES_ALL,
                payload: data
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    }
}

export const get_courses_by_name = (name) => { //hace un req por cursos por nombre
    return async (dispatch) => {
        try {
            const data = await getCoursesByNameRequest(name); // request
            return dispatch({
                type: GET_COURSES_BY_NAME,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
}

export const get_courses_by_id = (id) => { //hace un req por cursos por nombre
    return async (dispatch) => {
        try {
            const data = await getCoursesByIdRequest(id); // request
            return dispatch({
                type: GET_COURSES_BY_ID,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
}

export const post_course = (datos) => {
    return async (dispatch) => {
        try {
            const data = await postCourseRequest(datos) // request
            return dispatch({
                type: POST_COURSE,
                payload: data
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    }
}

export function delete_course(id) { // request
    return async function (dispatch) {
        try {
            const data = await deleteCourseRequest(id);
            return dispatch({
                type: DELETE_COURSE,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
}

export const filter_courses_by_language = (language) => {
    return {
        type: FILTER_COURSES_BY_LANGUAGE,
        payload: language
    }
}


export const getloged =(userData)=>{
    return async function (dispatch) {
        try {
            const data = await login(userData); 
            console.log(data)
            return dispatch({
                type: LOGIN,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: "get error",
            });
        }
    };
}


export const filter_courses_by_price = (P) => {
    if (P === "free") {
        P = true
    } else {
        P = false
    }
    return {
        type: FILTER_COURSES_BY_PRICING,
        payload: P
    }
}

export const order_courses = (direccion) => {
    return {
        type: ORDER_COURSES,
        payload: direccion
    }
}

//CATEGORIES:
export function get_categories () { // request
    return async function (dispatch) {
        try {
            const data = await getCategoriesAllRequest(); 
            console.log(data)
            return dispatch({
                type: GET_CATEGORIES_ALL,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: "get error",
            });
        }
    };
}

export function post_categories (technology) { // request
    return async function (dispatch) {
        try {
            const data = await postCategoriesRequest(technology);
            return dispatch({
                type: POST_CATEGORIES,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: "post error", // error.response.data.message
            });
        }
    };
}

export function delete_categories(id) { // request
    return async function (dispatch) {
        try {
            const data = await deleteCategoriesRequest(id);
            return dispatch({
                type: DELETE_CATEGORIES,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: "delete error",
            });
        }
    };
}

export const Dark_Mode = (payload) => {
    if (payload === true) {
        return {
            type: DARK_MODE,
            payload: true
        };
    } else if (payload === false) {
        return {
            type: DARK_MODE,
            payload: false
        };
    }
};

///////////////////actions clear/////////////////////////////////////////////////////////////////////////////////////////

export function clearMessage() {
    return function (dispatch) {
        return dispatch({
            type: CLEAN_MESSAGE,
        });
    };
}

export function clearCourses() {
    return {
        type: CLEAR_COURSES,
    };
}


//FAVORITES
export const get_Favorites_Request = (id) => { //hace un req por cursos por nombre
    return async (dispatch) => {
        try {
            const data = await getFavoritesRequest(id); // request
            return dispatch({
                type: GET_FAVORITES,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
}