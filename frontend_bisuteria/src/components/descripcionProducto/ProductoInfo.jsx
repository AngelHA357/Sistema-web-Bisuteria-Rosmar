import React from 'react';
import { useParams } from 'react-router-dom';
import './productoInfoStyles.css';
import { TarjetaProducto } from '../catalogoProductos/TarjetaProducto';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalMensaje } from "../modalMensaje/modalMensaje";

export function ProductoInfo() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [producto, setProducto] = useState(null);
    const [productosAleatorios, setProductosAleatorios] = useState([]);
    const [colorName, setColorName] = useState("Rojo Oscuro");
    const { id } = useParams();
    const usuario = 6; // CAMBIAR ESTO POR EL ID DEL USUARIO LOGUEADO
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const apiUrl = import.meta.env.VITE_BACK_URL;

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`${apiUrl}/producto/${id}`);
                if (!response.ok) {
                    throw new Error('Producto no encontrado');
                }
                const data = await response.json();
                setProducto(data);
            } catch (error) {
                console.error(error);
            }
        };
        
        const fetchProductosRelacionados = async () => {
            try {
                const response = await fetch(`${apiUrl}/producto`);
                if (!response.ok) {
                    throw new Error('Error al obtener productos relacionados');
                }
                const data = await response.json();
                setProductosAleatorios(shuffleArray([...data]).slice(0, 5));
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducto();
        fetchProductosRelacionados();
        setColorName("Rojo Oscuro");
        if (inputRef.current) {
            inputRef.current.value = 1;
        }
    }, [id, apiUrl]);

    if (!producto) return <h1>Producto no encontrado</h1>;

    const changeColor = (name) => {
        setColorName(name);
    };

    const handleClick = () => {
        inputRef.current.focus();
    };

    const regresar = () => {
        navigate(`/catalogo`);
    };

    const agregarCarrito = async () => {
        try {
            const cantidad = document.querySelector('.cantidad-input').value;
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/carrito`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idCliente: usuario, idProducto: id, cantidad: Number(cantidad) })
            });
    
            if (!response.ok) {
                throw new Error('Error al agregar producto al carrito');
            }
    
            window.dispatchEvent(new Event("storage"));
            setModalAbierto(true);
        } catch (error) {
            console.error(error);
        }
    };    

    return  (
        <div className="producto-container">
            <p className="breadcrumb"> <a onClick={ regresar }>🡠 Tipo / </a>{producto.categoria.nombre || "Desconocido"}</p>

            <div className="producto-detalle">
                <img src={producto.imagenes[1]} alt={producto.nombre} className="producto-imagen" />
                
                <div className="producto-info">
                    <h1 className="producto-nombre">{producto.nombre}</h1>
                    <p className="producto-precio">${producto.precio} MXN</p>

                    {/* <div className="producto-colores">
                        <div className="colores">
                            <span className="color-opcion" style={{ backgroundColor: "#3B0E0E" }} onClick={() => changeColor("Rojo Oscuro")}></span>
                            <span className="color-opcion" style={{ backgroundColor: "#0E3B0E" }} onClick={() => changeColor("Verde Oscuro")}></span>
                            <span className="color-opcion" style={{ backgroundColor: "#3B3B8F" }} onClick={() => changeColor("Azul Métalico")}></span>
                        </div>
                        <p>Color: {colorName}</p>
                    </div> */}

                    <div className="producto-compra">
                        <p onClick={handleClick}>Cantidad</p>
                        <input type="number" className="cantidad-input" defaultValue={1} min={1} ref={inputRef} />
                        <button className="btn-agregar" onClick={agregarCarrito}>Agregar al carrito</button>
                    </div>
                </div>
            </div>

            <div className="producto-descripcion">
                <h2>Detalles del producto</h2>
                <p>{producto.descripcion}</p>
                {/* <ul>
                    <li>Pulsera temática de One Piece</li>
                    <li>Acero inoxidable</li>
                    <li>Transpirable</li>
                    <li>Con ubicación GPS</li>
                </ul> */}
            </div>

            <div className='productos-relacionados'>
                <hr></hr>
                <h2>Productos relacionados</h2>
                <div className='productos-relacionados-container'>
                    {productosAleatorios.map((producto) => (  
                        <TarjetaProducto 
                        productId={producto.id}
                        image={producto.imagenes[0]}
                        name={producto.nombre}
                        price={producto.precio}
                        category={producto.categoria.nombre}
                        />        
                    ))}
                </div>
            </div>

            <ModalMensaje 
                isOpen={modalAbierto} 
                onClose={() => setModalAbierto(false)} 
                mensaje="Producto agregado al carrito" 
            />
        </div>
    );
}