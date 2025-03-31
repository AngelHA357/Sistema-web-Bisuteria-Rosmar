import React from 'react';
import { useParams } from 'react-router-dom';
import productos from '../../mocks/productos.json';
import './productoInfoStyles.css';
import { TarjetaProducto } from '../catalogoProductos/TarjetaProducto';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalMensaje } from "../modalMensaje/modalMensaje";

export function ProductoInfo() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const producto = productos.find(p => p.id == id);
    const categorias = {
        1: "Collares",
        2: "Aretes",
        3: "Pulseras",
        4: "Otros",
      };

    useEffect(() => {
        setColorName("Rojo Oscuro");
        if (inputRef.current) {
            inputRef.current.value = 1;
        }
    }, [id]);

    if (!producto) return <h1>Producto no encontrado</h1>;

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    
    const [productosAleatorios, setProductosAleatorios] = useState([]);

    useEffect(() => {
        setProductosAleatorios(shuffleArray([...productos]).slice(0, 5));
    }, [id]);

    const [colorName, setColorName] = useState("Rojo Oscuro");

    const changeColor = (name) => {
        setColorName(name);
    };

    const inputRef = useRef(null);
    const handleClick = () => {
        inputRef.current.focus();
    };

    const regresar = () => {
        navigate(`/catalogo`);
    };

    const agregarCarrito = () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const cantidad = document.querySelector('.cantidad-input').value;

        const productoExistente = carrito.find(producto => producto.id == id);
    
        if (productoExistente) {
            productoExistente.cantidad = Number(productoExistente.cantidad) + Number(cantidad);
        } else {
            carrito.push({ id, cantidad });
        }
    
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        window.dispatchEvent(new Event("storage"));
    
        setModalAbierto(true);
    };

    return  (
        <div className="producto-container">
            <p className="breadcrumb"> <a onClick={ regresar }>🡠 Tipo / </a>{categorias[producto.categoria_id] || "Desconocido"}</p>

            <div className="producto-detalle">
                <img src={producto.imagenes[1]} alt={producto.nombre} className="producto-imagen" />
                
                <div className="producto-info">
                    <h1 className="producto-nombre">{producto.nombre}</h1>
                    <p className="producto-precio">${producto.precio} MXN</p>

                    <div className="producto-colores">
                        <div className="colores">
                            <span className="color-opcion" style={{ backgroundColor: "#3B0E0E" }} onClick={() => changeColor("Rojo Oscuro")}></span>
                            <span className="color-opcion" style={{ backgroundColor: "#0E3B0E" }} onClick={() => changeColor("Verde Oscuro")}></span>
                            <span className="color-opcion" style={{ backgroundColor: "#3B3B8F" }} onClick={() => changeColor("Azul Métalico")}></span>
                        </div>
                        <p>Color: {colorName}</p>
                    </div>

                    <div className="producto-compra">
                        <p onClick={handleClick}>Cantidad</p>
                        <input type="number" className="cantidad-input" defaultValue={1} min={1} ref={inputRef} />
                        <button className="btn-agregar" onClick={agregarCarrito}>Agregar al carrito</button>
                    </div>
                </div>
            </div>

            <div className="producto-descripcion">
                <h2>Detalles del producto</h2>
                <ul>
                    <li>Pulsera temática de One Piece</li>
                    <li>Acero inoxidable</li>
                    <li>Transpirable</li>
                    <li>Con ubicación GPS</li>
                </ul>
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
                        category={producto.categoria_id}
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