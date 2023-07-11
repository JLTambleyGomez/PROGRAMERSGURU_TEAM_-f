import { 
//COURSES:
    GET_COURSES_ALL, 
    GET_COURSES_BY_NAME, 
    DELETE_COURSE,
    POST_COURSE, 
    FILTER_COURSES_BY_LANGUAGE, 
    FILTER_COURSES_BY_PRICING, 
    ORDER_COURSES, 
    GET_COURSES_BY_ID,
//CATEGORIES:
    GET_CATEGORIES_ALL, 
    POST_CATEGORIES, 
    DELETE_CATEGORIES,
// ERRORS: 
    ERROR,
    CLEAR_COURSES,
    CLEAN_MESSAGE,
// DARK MODE:
    DARK_MODE,
//FAVORITES:
    GET_FAVORITES,
//USERS:
    LOGIN,
//PRODUCTS
    GET_PRODUCTS,
    DELETE_PRODUCT,

} from "./actions";

// PRUEBA CURSOS
import jsonData from './cursos.json';

//___________________________________________________

//GLOBAL STORAGE:
const goblalStorage = {
    allCourses:[],              //NO TOCAR SIN AVISAR ANTES
    courses:[],
    categories:[],
    error:"",
    message:"",
    darkMode:false,
    favorites:[],
    access:false,
    products:[],
}


//REDUCER:
export default function rootReducer ( state = goblalStorage, { type, payload } ) {

    switch (type) {

        case GET_COURSES_ALL:
            return { ...state, allCourses: payload, courses: payload };

        case GET_COURSES_BY_NAME:
            return { ...state, allCourses: payload,courses: payload  };

        case GET_COURSES_BY_ID:
            return { ...state, allCourses: payload};

        case FILTER_COURSES_BY_LANGUAGE:
            return { ...state, courses: state.courses.filter((course) => course.language== payload)};

        case FILTER_COURSES_BY_PRICING:
            return { ...state, courses: state.courses.filter((course) => course.isFree === payload)}

        case ORDER_COURSES:
            const todos_cursosOrdenados = [...state.allCourses];
            const cursosOrdenados = [...state.courses]

            if (payload === "Ascendente") {
                todos_cursosOrdenados.sort((a, b) =>  a.title.toLowerCase().charCodeAt(0)- b.title.toLowerCase().charCodeAt(0));
                cursosOrdenados.sort((a, b) =>  a.title.toLowerCase().charCodeAt(0)- b.title.toLowerCase().charCodeAt(0));
            } else if (payload === "Desendente") {
                todos_cursosOrdenados.sort((a, b) =>  b.title.toLowerCase().charCodeAt(0)- a.title.toLowerCase().charCodeAt(0));
                cursosOrdenados.sort((a, b) =>  b.title.toLowerCase().charCodeAt(0)- a.title.toLowerCase().charCodeAt(0));
            }
            return { 
                ...state, 
                allCourses: todos_cursosOrdenados, 
                courses: cursosOrdenados
            }

        case GET_CATEGORIES_ALL:
            return {
                ...state,
                categories: payload,
            };

        case POST_CATEGORIES:
            return {
                ...state,
                message: payload.message,
            };

        case POST_COURSE:
            return {
                ...state,
                message: payload.message,
            };
            
        case ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case CLEAN_MESSAGE:
            return {
                ...state,
                error: "",
                message:"",
            };
        case CLEAR_COURSES:
            return {
                ...state,
                allCourses: [],
                courses: [],
            };
        case DARK_MODE:
            return {
                ...state,
                darkMode: payload
            }; 
        case GET_FAVORITES:
            return { ...state, favorites: payload};

        case LOGIN:
            return { ...state, access: payload};

        case  DELETE_COURSE:
            return { ...state, message: payload};


        case DELETE_CATEGORIES:
            return { ...state, message: payload};

        case GET_PRODUCTS:
            return { ...state, products: payload};

         case DELETE_PRODUCT:
            return { ...state, message: payload};
            

        default: return {...state}; 
    }
}