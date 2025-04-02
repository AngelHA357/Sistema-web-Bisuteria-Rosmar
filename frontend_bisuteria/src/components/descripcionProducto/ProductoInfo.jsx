import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import './productoInfoStyles.css';
import { TarjetaProducto } from '../catalogoProductos/TarjetaProducto';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalMensaje } from "../modalMensaje/modalMensaje";
import { UserContext } from '../../context/UserContext';

export function ProductoInfo() {
    const { usuario, token } = useContext(UserContext); 
    const [modalAbierto, setModalAbierto] = useState(false);
    const [producto, setProducto] = useState(null);
    const [productosAleatorios, setProductosAleatorios] = useState([]);
    const [colorName, setColorName] = useState("Rojo Oscuro");
    const { id } = useParams();
    const navigate = useNavigate();
    const inputRef = useRef(null);

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
                // Add token to the request headers
                const response = await fetch(`http://localhost:3000/api/producto/${encodeURIComponent(id)}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
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
                // Add token to the request headers
                const response = await fetch(`http://localhost:3000/api/producto`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener productos relacionados');
                }
                const data = await response.json();
                setProductosAleatorios(shuffleArray([...data]).slice(0, 5));
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetchProducto();
            fetchProductosRelacionados();
        } else {
            navigate('/'); 
        }
        
        setColorName("Rojo Oscuro");
        if (inputRef.current) {
            inputRef.current.value = 1;
        }
    }, [id, 'http://localhost:3000/api', token, navigate]);

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
            console.log('Token:', token);
            const response = await fetch(`http://localhost:3000/api/carrito`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token here too
                },
                body: JSON.stringify({
                    idCliente: usuario.cliente_id,
                    idProducto: id,       
                    cantidad: Number(cantidad)
                  })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.log('Response status:', response.status);
                console.log('Error response:', errorData);
                throw new Error(`Error al agregar producto al carrito: ${errorData.message}`);
            }
    
            window.dispatchEvent(new Event("storage"));
            setModalAbierto(true);
        } catch (error) {
            console.error(error);
        }
    };    

    return (
        <div className="producto-container">
            <p className="breadcrumb"> <a onClick={ regresar }>🡠 Tipo / </a>{producto.categoria.nombre || "Desconocido"}</p>

            <div className="producto-detalle">
                <img src={producto.imagenes[1] || producto.imagenes[0]} alt={producto.nombre} className="producto-imagen" />
                
                <div className="producto-info">
                    <h1 className="producto-nombre">{producto.nombre}</h1>
                    <p className="producto-precio">${producto.precio} MXN</p>

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
            </div>

            <div className='productos-relacionados'>
                <hr></hr>
                <h2>Productos relacionados</h2>
                <div className='productos-relacionados-container'>
                    {productosAleatorios.map((producto) => (  
                        <TarjetaProducto 
                            key={producto.id}
                            productId={producto.id}
                            image={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0] : 'default-image.jpg'}
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