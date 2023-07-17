import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { filter_courses_by_language, filter_courses_by_price, order_courses, get_courses_all } from "../../../Redux/actions";

import s from "./FilterBar.module.css";

//_________________________module_________________________
function FilterBar() {

    //global states:
    const allCourses = useSelector((state) => state.allCourses);
    const darkMode = useSelector((state) => state.darkMode);
    const resetFilters = () => {
        setOrden("");
        setIdioma("");
        setPrice("");
    };

    //states:
    const [orden, setOrden] = useState("");
    const [idioma, setIdioma] = useState("");
    const [price, setPrice] = useState("");

    //const:
    const dispatch = useDispatch();

    //functions:
    const theme = (base) => {
        const suffix = darkMode ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    //______________________
    const handleSortChange = async (event) => {
        const value = event.target.value;
        await setOrden(value);

        if (idioma === "" && price === "") {
            await dispatch(order_courses(value));
        }
        if (idioma !== "" && price !== "") {
            await dispatch(get_courses_all());
            await dispatch(filter_courses_by_language(idioma));
            await dispatch(filter_courses_by_price(price));
            await dispatch(order_courses(value));
        }
        if (idioma === "" && price !== "") {
            await dispatch(get_courses_all());
            await dispatch(filter_courses_by_price(price));
            await dispatch(order_courses(value));
        }
        if (idioma !== "" && price === "") {
            await dispatch(get_courses_all());
            await dispatch(filter_courses_by_language(idioma));
            await dispatch(order_courses(value));
        }
    };

    const handleLanguageChange = async (event) => {
        const value = event.target.value;
      
        try {
          if (value === "") {
                await dispatch(get_courses_all());
                if (price) await dispatch(filter_courses_by_price(price))
                if (orden) await dispatch(order_courses(orden));
                await setIdioma(value);
          } else {
            if (value !== idioma) {
                await dispatch(get_courses_all());
                await setIdioma(value);
            }
            if (orden !== "" && value === "") {
                await dispatch(order_courses(orden));
            }
            if (value === "" && orden === "" && price === "") {
                await dispatch(get_courses_all());
            } else if (orden === "" && price === "") {
                await dispatch(filter_courses_by_language(value));
            } else if (orden !== "" && price !== "") {
                await dispatch(get_courses_all());
                await dispatch(filter_courses_by_language(value));
                await dispatch(filter_courses_by_price(price));
                await dispatch(order_courses(orden));
            } else if (orden === "" && price !== "") {
                await dispatch(get_courses_all());
                await dispatch(filter_courses_by_language(value));
                await dispatch(filter_courses_by_price(price));
            } else if (orden !== "" && price === "") {
                await dispatch(get_courses_all());
                await dispatch(filter_courses_by_language(value));
                await dispatch(order_courses(orden));
            }
          }
        } catch (error) {
          // Manejar el error de forma adecuada (por ejemplo, mostrar un mensaje de error)
        }
    };
      
      
    //_______________________________________
    const handlePriceChange = async (event) => {
        const value = event.target.value;
        /*dispatch(get_courses_all());
        
        idioma !== ""? await dispatch(filter_courses_by_language(idioma)): "";
        price !== ""? await dispatch(filter_courses_by_price(value));
        orden !== ""? await await dispatch(order_courses(orden)): "";
        
        setPrecio(value) */
      
        try {
          if (value === "") {
                await dispatch(get_courses_all());
                if (idioma) await dispatch(filter_courses_by_language(idioma))
                if (orden) await dispatch(order_courses(orden));
                await setPrice(value);
          } else {
            if (value !== price) {
                await dispatch(get_courses_all());
                await setPrice(value);
            }
            if (orden !== "" && value === "") {
                await dispatch(order_courses(orden));
            }
            if (value === "" && orden === "" && price === "") {
                await dispatch(get_courses_all());
            } else if (orden === "" && idioma === "") {
                await dispatch(filter_courses_by_price(value));
            } else if (orden !== "" && idioma !== "") {
                await dispatch(get_courses_all());
                await dispatch(filter_courses_by_price(value));
                await dispatch(filter_courses_by_language(idioma));
                await dispatch(order_courses(orden));
            } else if (orden === "" && idioma !== "") {
                await dispatch(get_courses_all());
                await dispatch(filter_courses_by_price(value));
                await dispatch(filter_courses_by_language(idioma));
            } else if (orden !== "" && idioma === "") {
                await dispatch(get_courses_all());
                await dispatch(filter_courses_by_price(value));
                await dispatch(order_courses(orden));
            }
          }
        } catch (error) {
          // Manejar el error de forma adecuada (por ejemplo, mostrar un mensaje de error)
        }
    };

    const handleFilterReset = (event) => {
        event.preventDefault();
        dispatch(get_courses_all());
        resetFilters();
    };
    
    //life-cycles:
    useEffect(() => {
        console.log({ orden: orden, idioma: idioma, precio: price });
    }, [orden, idioma, price]);

    useEffect(() => {
        console.log(allCourses)
    }, [allCourses]);

    //component:
    return (
        <div className={`${s.component}`}>
          <p>Orden</p>
          <select value={orden} onChange={handleSortChange}>
            <option value="">Ordenar</option>
            <option value="Ascendente">Nombre Descendente</option>
            <option value="Desendente">Nombre Ascendente</option>
          </select>
          <p>Filtros</p>
          <select value={idioma} onChange={handleLanguageChange}>
            <option value="">Idioma</option>
            <option value="Inglés">Cursos en Inglés</option>
            <option value="Español">Cursos en Español</option>
          </select>
          <p>Acceso</p>
          <select value={price} onChange={handlePriceChange}>
            <option value="">Precio</option>
            <option value="true">Gratis</option>
            <option value="false">De Pago</option>
          </select>

          <button onClick={handleFilterReset}>Mostrar Todos</button>
        </div>
      );
    }

export default FilterBar;