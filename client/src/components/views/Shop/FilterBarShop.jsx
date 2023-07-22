import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from 'rc-slider';
import { get_products_all, get_products_by_name, get_categories, sort_products, filter_product_by_category, filter_product_by_price } from "../../../Redux/actions";

import s from "./FilterBarShop.module.css";

//_________________________module_________________________
function FilterBarShop () {
   

    //global states:
    const products = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories);
  
    console.log(products)

    //states:
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [initalPriceRange, setInitialPriceRange] = useState(false);
    const [currentPriceRange, setCurrentPriceRange] = useState([0, 1000])
    const [isVisiblePrice, setIsVisiblePrice] = useState(false);
    const [minSliderValue, setMinSliderValue] = useState(0);
    const [maxSliderValue, setMaxSliderValue] = useState(1000);

    const [isVisibleCategory, setIsVisibleCategory] = useState(false);
    const [isVisibleSortByName, setIsVisibleSortByName] = useState(false);

    const [order, setOrder] = useState("");
    const [category, setCategory ] = useState("");
    const [price, setPrice] = useState([]);

    //const:
    const dispatch = useDispatch();

    const mayor = products.length && products.reduce((productoMayor, productoActual) => {
        return +productoActual.price > +productoMayor.price ? productoActual : productoMayor;
    });
    const menor = products.length && products.reduce((productoMayor, productoActual) => {
        return +productoActual.price < +productoMayor.price ? productoActual : productoMayor;
    });

    const mayorPrice = typeof(mayor) === "object" ? +mayor.price : 1000;
    const menorPrice = typeof(menor) === "object" ? +menor.price : 0;


    //functions:
    const toggleVisibilityPrice = () => {
        setIsVisiblePrice(!isVisiblePrice);
    }

    const toggleVisibilityCategory = () => {
        setIsVisibleCategory(!isVisibleCategory);
    }

    const toggleVisibilitySortByName = () => {
        setIsVisibleSortByName(!isVisibleSortByName);
    }

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => func(...args), delay);
        };
    };
    // const handlePriceChange = (values) => { 
    //     setPriceRange(values);
    // };

    //______________________________________
    // const handleSortChange = async (event) => {
    //     const value = event.target.value;
    //     await setOrder(value);
    // };
    // //_______________________________________

    // const handle = async () => {
    //     await dispatch(get_products_all());
    //     order !== "" ? await dispatch(sort_products(order)):"";
    //     category !== "" ? await dispatch(filter_product_by_category(category)): "";
    //     await dispatch(filter_product_by_price(priceRange))
    // }
    // //_______________________________________

    //_______________________________________

    // const handleFilter = () => {
    //     // dispatch(get_products_all());
    //     dispatch(filter_product_by_price(priceRange));
    // }

    //_________________________
    const sortProducts = async (event) => {
        const { value } = event.target;
        await setOrder(value);
      
        await dispatch(get_products_all());
        if (category !== "") {
            await dispatch(filter_product_by_category(category));
        }
        if (price.length !== 0) {
            await dispatch(filter_product_by_price(price));
        }
        await dispatch(sort_products(value));
    };

    const filterCategory = async (event) => {
        const { value } = event.target;
      
        if (value === "") {
            await setCategory("");
            await dispatch(get_products_all());
            if (price.length !== 0) {
                await dispatch(filter_product_by_price(price));
            }
            if (order !== "") {
                await dispatch(sort_products(order));
            }
        } else {
            await setCategory(value);
            await dispatch(get_products_all());
            await dispatch(filter_product_by_category(value));
            if (price.length !== 0) {
                await dispatch(filter_product_by_price(price));
            }
            if (order !== "") {
                await dispatch(sort_products(order));
            }
        }
    };

    const handlePriceChange = debounce (async (values) => {
        await setCurrentPriceRange(values);

        const [minPrice, maxPrice] = values;
        const newPrice = minPrice !== menorPrice || maxPrice !== mayorPrice ? values : [];
      
        await dispatch(get_products_all());
        if (category !== "") {
          await dispatch(filter_product_by_category(category));
        }
        if (newPrice.length !== 0) {
            await dispatch(filter_product_by_price(newPrice));
        }
        if (order !== "") {
            await dispatch(sort_products(order));
        }
        await setPrice(newPrice);
    }, 300);
    //_________________________

    const resetFilters = (event) => {
        event.preventDefault();
        dispatch(get_products_all());
        setOrder("");
        setCategory("");
        setPrice([minSliderValue, maxSliderValue]);
        setCurrentPriceRange([minSliderValue, maxSliderValue])
    }
      

    //life-cycles:
    useEffect(() => {
        console.log(priceRange)
        console.log(initalPriceRange)
    }, [priceRange, initalPriceRange])

    useEffect(() => {
        console.log({price: price, order: order, category: category})
    }, [price, order, category])

    useEffect(() => {
        dispatch(get_categories())
    }, [])

    useEffect(() => {
        dispatch(get_products_all());
    }, []);

    useEffect(() => {
        if (!initalPriceRange && products.length > 0) {
            setPriceRange([menorPrice, mayorPrice]);
            setCurrentPriceRange([menorPrice, mayorPrice]);
            setMaxSliderValue(mayorPrice);
            setMinSliderValue(menorPrice);
            setInitialPriceRange(true);
        }
    }, [initalPriceRange, menorPrice, mayorPrice, products]);


    //component:
    return (
        <aside className={`${s.sidebar}`}>  
            <div className={s.option}>
                <label onClick={toggleVisibilitySortByName}>ORDERNAR POR:</label>
                { true && (
                    // value = {order}
                    <select value={order} onChange={sortProducts}>
                        <option value="">Destacados</option>
                        <option value="ascendente">Ascendente</option>
                        <option value="descendente">Descendente</option>
                    </select>
                )}
            </div> 
            <div className={s.option}>
                <label onClick={toggleVisibilityPrice}> POR PRECIO:</label>
                {
                    true && (
                        <div className={`${s.filterPrice}`}>
                            <Slider
                                className={`${s["filterPriceSlider"]}`}
                                range
                                min={minSliderValue}
                                max={maxSliderValue}
                                defaultValue={priceRange}
                                onChange={handlePriceChange}
                                value={currentPriceRange}
                            />
                            <div>Rango de Precio: ${currentPriceRange[0]} - ${currentPriceRange[1]}</div>
                        </div>
                    )
                }
            </div>
            <div className={s.option}>
                <label onClick={toggleVisibilityCategory}>POR CATEGORÍA:</label>
                    <select value={category} onChange={filterCategory}>
                        { categories.length && (
                            <>
                                <option value="">Categorías</option>
                                    {
                                        categories.map((category, index) => (
                                            <option key={index} style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}} value={category.name}>{category.name}</option>
                                        ))
                                    }
                            </>
                        )}
                    </select>
            </div>
            <button onClick={resetFilters}>Mostrar todos</button>
        </aside>
    )
}

export default FilterBarShop;