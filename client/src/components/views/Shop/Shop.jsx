import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_products_all, set_cart } from "../../../Redux/actions"

import Slider from 'rc-slider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import 'rc-slider/assets/index.css';
import s from "./Shop.module.css"

//_________________________module_________________________
function Shop () {

    //global state:
    const dark = useSelector((state) => state.darkMode);
    const products = useSelector((state) => state.products);

    //states:
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [input, setInput] = useState("");
    const [isVisiblePrice, setIsVisiblePrice] = useState(false);
    const [isVisibleCategory, setIsVisibleCategory] = useState(false);
    const [isVisibleSortByName, setIsVisibleSortByName] = useState(false);
    const [isVisibleSortByPrice, setIsVisibleSortByPrice] = useState(false);

    const [selectQuantity, setSelectQuantity] = useState([])
    const [cartTooltips, setCartTooltips] = useState([]);
    const cart = useSelector((state)=> state.cart)

    //const:
    const dispatch = useDispatch();

    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    const syncInput = (event) => {
        const { value } = event.target;
        setInput(value);
    }
//___________________
    const toggleVisibilityPrice = () => {
        setIsVisiblePrice(!isVisiblePrice);
    }

    const toggleVisibilityCategory = () => {
        setIsVisibleCategory(!isVisibleCategory);
    }

    const toggleVisibilitySortByName = () => {
        setIsVisibleSortByName(!isVisibleSortByName);
    }

    const toggleVisibilitySortByPrice = () => {
        setIsVisibleSortByPrice(!isVisibleSortByPrice);
    }

    const handlePriceChange = (values) => {
        setPriceRange(values);
    };
//_________________
    const handleMouseEnter = (index) => {
        const newCartTooltips = [...cartTooltips];
        newCartTooltips[index] = true;
        setCartTooltips(newCartTooltips);
    };

    const handleMouseLeave = (index) => {
        const newCartTooltips = [...cartTooltips];
        newCartTooltips[index] = false;
        setCartTooltips(newCartTooltips);
    };

    const addToCart = async (item) => {
        // setCartItems([...cartItems, item]);
        // setSelectQuantity()
        // si el producto existe en el array de cart, ya no entra al condicional a hacer el push, solo le modifica la propiedad cantidad +1
        if (!cart?.filter((product)=> product.id === item.id).length) {
            item.quantity = 1; // crea una nueva propiedad al producto.
            const oldCart = JSON.parse(localStorage.getItem("cart")) //convierte el JSON del carrito en un objeto js, en este caso, un array.
            oldCart.push(item)
            localStorage.setItem("cart", JSON.stringify(oldCart))
            dispatch(set_cart())
        } else if (item.quantity < item.stock) {
            item.quantity = item.quantity + 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(set_cart())
        }
        console.log(cart);
    };

    const removeFromCart = async (id) => {
        const cart = await localStorage.getItem("cart")
        if (!cart) {
            await localStorage.setItem("cart", "[]")
        }
        const oldCart = JSON.parse(localStorage.getItem("cart")).filter((item)=>item.id !== id) //convierte el JSON del carrito en un objeto js, en este caso, un array.
        localStorage.setItem("cart", JSON.stringify(oldCart))
        dispatch(set_cart())
      /*  const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);*/
    };

    const calculateTotal = () => {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            // Assuming each item has a price property
            total += +cart[i].price;
        }
        return total;
    };

    //life-cycles:
    useEffect(() => {
        // Initialize the cartTooltips array with the same length as the number of items
        // (async () => {
        dispatch(get_products_all());
        // })()
        const initialCartTooltips = new Array(4).fill(false);
        setCartTooltips(initialCartTooltips);
    }, []);

    useEffect(() => {
        (async () => {
            const cart = await localStorage.getItem("cart")
            if (!cart) {
                await localStorage.setItem("cart", "[]")
            }
        })()
        dispatch(set_cart())
    }, [])

    //component:
    return (
        <main className={`${s.component}`}>
         
            <section className={`${s.sectionBanner}`}>
                
                <img
                    className={`${s.bannerImg}`}
                    src="https://storage.googleapis.com/pai-images/7dd87a726d554d02a57f5e2267ae7393.jpeg"
                    alt="mainBanner"
                />
                <h1 className={`${s.mainTitle} ${s[theme("mainTitle")]}`}>
                    PROGRAMMER'S GURU STORE
                </h1>
            </section>
            <div className={s.flex}>
                <input value={input} onChange={syncInput} placeholder="Buscar Producto" className={`${s.input}`}></input>
                
                <p className={`${s.searchButton}`}>
                    <svg xmlns="http://www.w3.org/2000/svg"width="16"height="16"fill="currentColor"className="bi bi-search"viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg>
                </p>

            </div>   
            <section className={`${s.section3}`}>
                <aside className={`${s.sidebar}`}>  
                    <h2>FILTROS</h2>
                <div>
                    <label onClick={toggleVisibilitySortByName}>ORDERNAR POR:</label>
                       { isVisibleSortByName && (
                            <ul>
                                <li>Ascendente</li>
                                <li>Descendente</li>
                            </ul>)}
                </div> 
                <div> 
                    <label onClick={toggleVisibilityPrice}> POR PRECIO:</label>
                        {
                            isVisiblePrice && (
                                <div className={`${s.filterPrice}`}>
                                        <Slider
                                            className={`${s["filterPriceSlider"]}`}
                                            range
                                            min={0}
                                            max={1000}  
                                            defaultValue={priceRange}
                                            onChange={handlePriceChange}
                                        />
                                        <div>Rango de Precio: ${priceRange[0]} - ${priceRange[1]}</div>
                                </div>  
                            ) 
                        }
                    </div>
                    <div className={`${s.filterOption}`}>
                        <label onClick={toggleVisibilityCategory}>POR CATEGORÍA:</label>
                           { isVisibleCategory && (
                                <div className={`${s.filterCategory}`}>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input type = "checkbox"/>Libros</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input type = "checkbox"/>Computadoras</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input type = "checkbox"/>Almacenamiento</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input type = "checkbox"/>Audio</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input type = "checkbox"/>Accesorios</span>
                                </div>) }
                    </div>
                </aside>
                    <div className={`${s['productBox']}`}>
                         {products?.map((product, index) => {
                                return (
                                    <div className={`${s['item']}`} key={index}>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                                                <img className={s["itemImage"]} src={product.image}></img>
                                            </div>
                                            <div style={{display: "flex", justifyContent: "flex-start", alignContent: "center"}}>
                                                <h1 className={s["name"]} >{product.name}</h1>
                                            </div>
                                        </div>
                                        <div className={s.priceAndCart}>
                                            <h1 className={s["price"]}>${product.price}</h1>
                                            <button 
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={() => handleMouseLeave(index)}
                                                onClick={() => addToCart(product)}>
                                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                               <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
                                            </button>
                                        </div>
                                        {cartTooltips[index] && (
                                            <span className={s["cartTooltip"]}>Añadir al carrito</span>
                                        )}
                                    </div>
                                )
                            })
                        }
                    </div>
            </section>
            <section className={s.Resumen}>
                <h2>Resumen de compras</h2>
                {cart?.length > 0 ? (
                    <>
                        <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price}
                                <button onClick={() => removeFromCart(item.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                                </button>
                            </li>
                        ))}
                        </ul>
                        <p>Total: ${calculateTotal()}</p>
                    </>
                    ) : (
                    <p>Tu carrito de compras está vacío</p>
                )}
            </section>
 
        </main>
    )
}
export default Shop;  