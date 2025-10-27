// app/etiquetas/page.tsx (corregido y mejorado)
"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import jsPDF from "jspdf"
import {
    Printer,
    Download,
    Barcode,
    Calendar,
    Building,
    Plus,
    Trash2,
    Search,
    Filter,
    RefreshCw,
    Image as ImageIcon,
    X
} from "lucide-react"
import { useAppDispatch } from "@/hooks/selector"
import { useGetWithFiltersGeneralMutation } from "@/hooks/reducers/api"
import { LoadingSection } from "@/template/loading-screen"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { MainForm } from "@/components/form/main-form"
import BarcodeComponent from "@/components/barcode"
import { format, addDays, addMonths, isValid, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Field } from "@/utils/types/interfaces"
import { openModalReducer, closeModalReducer } from "@/hooks/reducers/drop-down"

// Interfaces
interface Producto {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    precio_venta: number;
    categoria: string;
    marca: string;
    unidad: string;
    cantidad: number;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

interface Etiqueta {
    id: string;
    producto: Producto;
    cantidad: number;
    fecha_impresion: string;
    fecha_vencimiento: string;
    codigo_barras: string;
    lote?: string;
    precio_especial?: number;
}

// Componente para la etiqueta individual
const EtiquetaItem = ({ etiqueta, onRemove }: { etiqueta: Etiqueta; onRemove: (id: string) => void }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {etiqueta.producto.nombre}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">Código: {etiqueta.producto.codigo}</p>
                </div>
                <button
                    onClick={() => onRemove(etiqueta.id)}
                    className="text-red-500 hover:text-red-700 p-1 transition-colors"
                    title="Eliminar etiqueta"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                    <span className="text-gray-500">Cantidad:</span>
                    <span className="font-medium ml-1">{etiqueta.cantidad}</span>
                </div>
                <div>
                    <span className="text-gray-500">Precio:</span>
                    <span className="font-medium ml-1">
                        ${etiqueta.precio_especial?.toFixed(2) || etiqueta.producto.precio_venta.toFixed(2)}
                    </span>
                </div>
                <div>
                    <span className="text-gray-500">Vence:</span>
                    <span className="font-medium ml-1">
                        {format(parseISO(etiqueta.fecha_vencimiento), "dd/MM/yyyy")}
                    </span>
                </div>
                <div>
                    <span className="text-gray-500">Lote:</span>
                    <span className="font-medium ml-1">{etiqueta.lote || "N/A"}</span>
                </div>
            </div>

            <div className="flex justify-center">
                <BarcodeComponent
                    value={etiqueta.codigo_barras}
                    width={1.5}
                    height={40}
                />
            </div>
        </div>
    )
}

// Hook para generar PDF con jsPDF
const usePDFGenerator = () => {
    const generarPDF = useCallback(async (etiquetas: Etiqueta[]) => {
        // Crear nuevo PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Configuración de la página
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Configuración de etiquetas (tamaño estándar 57x32mm)
        const labelWidth = 57;
        const labelHeight = 32;
        const margin = 5;
        const labelsPerRow = Math.floor((pageWidth - margin * 2) / labelWidth);
        const labelsPerColumn = Math.floor((pageHeight - margin * 2) / labelHeight);
        const labelsPerPage = labelsPerRow * labelsPerColumn;

        let currentPage = 0;
        let labelIndex = 0;

        // Función para agregar una nueva página
        const agregarNuevaPagina = () => {
            pdf.addPage();
            currentPage++;
            labelIndex = 0;
        };

        // Logo de la empresa (puedes reemplazar con tu logo)
        const cargarLogo = async (): Promise<string> => {
            return new Promise((resolve) => {
                // Logo por defecto (puedes reemplazar con tu URL)
                const img = new Image();
                img.src = '/logo-empresa.png';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = () => resolve(''); // Si falla, continuar sin logo
            });
        };

        const logoDataURL = await cargarLogo();

        // Generar etiquetas
        for (let i = 0; i < etiquetas.length; i++) {
            const etiqueta = etiquetas[i];

            // Calcular posición en la página
            const row = Math.floor(labelIndex / labelsPerRow);
            const col = labelIndex % labelsPerRow;

            const x = margin + col * labelWidth;
            const y = margin + row * labelHeight;

            // Verificar si necesitamos nueva página
            if (y + labelHeight > pageHeight - margin) {
                agregarNuevaPagina();
            }

            // Dibujar borde de la etiqueta
            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.5);
            pdf.rect(x, y, labelWidth, labelHeight);

            // Configuración de fuentes
            pdf.setFont('helvetica', 'normal');

            // Logo (si está disponible)
            if (logoDataURL) {
                pdf.addImage(logoDataURL, 'PNG', x + 2, y + 2, 10, 5);
            }

            // Fecha de impresión
            pdf.setFontSize(6);
            pdf.setTextColor(100, 100, 100);
            pdf.text(
                format(new Date(), 'dd/MM/yy'),
                x + labelWidth - 10,
                y + 4,
                { align: 'right' }
            );

            // Nombre del producto
            pdf.setFontSize(8);
            pdf.setTextColor(0, 0, 0);
            pdf.setFont('helvetica', 'bold');

            const nombre = etiqueta.producto.nombre.length > 20
                ? etiqueta.producto.nombre.substring(0, 20) + '...'
                : etiqueta.producto.nombre;

            pdf.text(nombre, x + labelWidth / 2, y + 12, { align: 'center' });

            // Generar código de barras como imagen
            const generarCodigoBarras = (valor: string): Promise<string> => {
                return new Promise((resolve) => {
                    const canvas = document.createElement('canvas');
                    canvas.width = 120;
                    canvas.height = 30;
                    const ctx = canvas.getContext('2d');

                    if (ctx) {
                        // Limpiar canvas
                        ctx.fillStyle = 'white';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);

                        // Dibujar código de barras simple (simulación)
                        ctx.fillStyle = 'black';
                        for (let i = 0; i < valor.length; i++) {
                            const barHeight = 20;
                            const barWidth = 2;
                            const xPos = i * barWidth + 10;
                            if (i % 2 === 0) {
                                ctx.fillRect(xPos, 5, barWidth, barHeight);
                            }
                        }

                        // Texto del código
                        ctx.fillStyle = 'black';
                        ctx.font = '10px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText(valor, canvas.width / 2, 28);
                    }

                    resolve(canvas.toDataURL('image/png'));
                });
            };

            const barcodeDataURL = await generarCodigoBarras(etiqueta.codigo_barras);
            pdf.addImage(barcodeDataURL, 'PNG', x + 5, y + 15, labelWidth - 10, 8);

            // Información inferior
            pdf.setFontSize(6);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(0, 0, 0);

            // Precio
            const precio = etiqueta.precio_especial || etiqueta.producto.precio_venta;
            pdf.text(`Precio: $${precio.toFixed(2)}`, x + 2, y + labelHeight - 8);

            // Fecha de vencimiento
            pdf.text(
                `Vence: ${format(parseISO(etiqueta.fecha_vencimiento), 'dd/MM/yy')}`,
                x + 2,
                y + labelHeight - 4
            );

            // Lote y código
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Lote: ${etiqueta.lote || 'N/A'}`, x + labelWidth - 25, y + labelHeight - 8);
            pdf.text(`Cod: ${etiqueta.producto.codigo}`, x + labelWidth - 25, y + labelHeight - 4);

            labelIndex++;
        }

        return pdf;
    }, []);

    return { generarPDF };
};

// Componente para el modal de configuración de etiqueta
const ModalConfiguracionEtiqueta = ({
    producto,
    onConfirm,
    onClose
}: {
    producto: Producto;
    onConfirm: (producto: Producto, cantidad: number, datos: any) => void;
    onClose: () => void;
}) => {
    const formConfigAgregarProducto = (producto: Producto): Field[] => [
        {
            type: "H1",
            label: "Configurar Etiqueta",
            require: false
        },
        {
            type: "Flex",
            require: false,
            elements: [
                {
                    type: "INPUT",
                    name: "producto",
                    label: "Producto",
                    valueDefined: producto.nombre,
                    require: false,
                },
                {
                    type: "INPUT",
                    name: "codigo",
                    label: "Código",
                    valueDefined: producto.codigo,
                    require: false,
                }
            ]
        },
        {
            type: "Flex",
            require: false,
            elements: [
                {
                    type: "NUMBER",
                    name: "cantidad",
                    label: "Cantidad de etiquetas",
                    valueDefined: 1,
                    require: true,
                    placeholder: "1",
                },
                {
                    type: "NUMBER",
                    name: "precio_especial",
                    label: "Precio especial (opcional)",
                    valueDefined: producto.precio_venta,
                    require: false,
                    placeholder: "0.00",
                }
            ]
        },
        {
            type: "Flex",
            require: false,
            elements: [
                {
                    type: "DATE",
                    name: "fecha_vencimiento",
                    label: "Fecha de vencimiento",
                    valueDefined: addMonths(new Date(), 12).toISOString().split('T')[0],
                    require: true
                },
                {
                    type: "INPUT",
                    name: "lote",
                    label: "Número de lote (opcional)",
                    placeholder: "LOTE20241201",
                    require: false
                }
            ]
        }
    ];

    return (
        <div className="p-4">
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                    <strong>Precio actual:</strong> ${producto.precio_venta.toFixed(2)}
                </p>
            </div>
            <MainForm
                message_button="Generar Etiquetas"
                dataForm={formConfigAgregarProducto(producto)}
                actionType=""
                onSuccess={(result: any, formData: any) => {
                    onConfirm(producto, formData.cantidad, {
                        fecha_vencimiento: formData.fecha_vencimiento + 'T00:00:00',
                        lote: formData.lote,
                        precio_especial: formData.precio_especial > 0 ? formData.precio_especial : undefined
                    });
                }}
            />
        </div>
    );
};

// Componente de búsqueda de productos
const BusquedaProductos = ({
    onSeleccionarProducto,
    onClose
}: {
    onSeleccionarProducto: (producto: Producto) => void;
    onClose: () => void;
}) => {
    const [terminoBusqueda, setTerminoBusqueda] = useState("")
    const [productos, setProductos] = useState<Producto[]>([])
    const [cargando, setCargando] = useState(false)
    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([])

    // Mock de datos de productos (reemplazar con tu API real)
    const productosMock: Producto[] = [
        {
            id: 1,
            codigo: 'PROD001',
            nombre: 'Laptop HP Pavilion 15"',
            descripcion: 'Laptop HP Pavilion con procesador Intel i5, 8GB RAM, 512GB SSD',
            precio: 899.99,
            precio_venta: 1099.99,
            categoria: 'Tecnología',
            marca: 'HP',
            unidad: 'Unidad',
            cantidad: 25,
            fecha_creacion: new Date().toISOString(),
            fecha_actualizacion: new Date().toISOString()
        },
        {
            id: 2,
            codigo: 'PROD002',
            nombre: 'Mouse Inalámbrico Logitech',
            descripcion: 'Mouse ergonómico inalámbrico con sensor óptico de alta precisión',
            precio: 29.99,
            precio_venta: 39.99,
            categoria: 'Tecnología',
            marca: 'Logitech',
            unidad: 'Unidad',
            cantidad: 100,
            fecha_creacion: new Date().toISOString(),
            fecha_actualizacion: new Date().toISOString()
        },
        {
            id: 3,
            codigo: 'PROD003',
            nombre: 'Teclado Mecánico RGB',
            descripcion: 'Teclado mecánico gaming con retroiluminación RGB y switches azules',
            precio: 79.99,
            precio_venta: 99.99,
            categoria: 'Tecnología',
            marca: 'Redragon',
            unidad: 'Unidad',
            cantidad: 50,
            fecha_creacion: new Date().toISOString(),
            fecha_actualizacion: new Date().toISOString()
        },
        {
            id: 4,
            codigo: 'PROD004',
            nombre: 'Monitor 24" Full HD',
            descripcion: 'Monitor LED 24 pulgadas resolución Full HD 1920x1080',
            precio: 199.99,
            precio_venta: 249.99,
            categoria: 'Tecnología',
            marca: 'Samsung',
            unidad: 'Unidad',
            cantidad: 30,
            fecha_creacion: new Date().toISOString(),
            fecha_actualizacion: new Date().toISOString()
        }
    ]

    // Cargar productos al montar el componente
    useEffect(() => {
        setCargando(true)
        // Simular carga de API
        setTimeout(() => {
            setProductos(productosMock)
            setProductosFiltrados(productosMock)
            setCargando(false)
        }, 500)
    }, [])

    // Filtrar productos según término de búsqueda
    useEffect(() => {
        if (!terminoBusqueda.trim()) {
            setProductosFiltrados(productos)
            return
        }

        const filtrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.codigo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.marca.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.categoria.toLowerCase().includes(terminoBusqueda.toLowerCase())
        )
        setProductosFiltrados(filtrados)
    }, [terminoBusqueda, productos])

    const handleSeleccionar = (producto: Producto) => {
        onSeleccionarProducto(producto)
    }

    return (
        <div className="p-4">
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, código, marca o categoría..."
                        value={terminoBusqueda}
                        onChange={(e) => setTerminoBusqueda(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {terminoBusqueda && (
                        <button
                            onClick={() => setTerminoBusqueda("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {cargando ? (
                <div className="text-center py-8">
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-600">Cargando productos...</p>
                </div>
            ) : (
                <div className="max-h-96 overflow-y-auto">
                    {productosFiltrados.length === 0 ? (
                        <div className="text-center py-8">
                            <Search className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-600">No se encontraron productos</p>
                            <p className="text-sm text-gray-500">Intenta con otros términos de búsqueda</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {productosFiltrados.map(producto => (
                                <div
                                    key={producto.id}
                                    className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                                    onClick={() => handleSeleccionar(producto)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{producto.nombre}</h4>
                                            <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-600">
                                                <span><strong>Código:</strong> {producto.codigo}</span>
                                                <span><strong>Marca:</strong> {producto.marca}</span>
                                                <span><strong>Categoría:</strong> {producto.categoria}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-green-600">
                                                ${producto.precio_venta.toFixed(2)}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Stock: {producto.cantidad}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default function GeneracionEtiquetas() {
    const dispatch = useAppDispatch()
    const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([])
    const [isGenerandoPDF, setIsGenerandoPDF] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)

    const { generarPDF } = usePDFGenerator()

    // Generar ID único para etiquetas
    const generarId = () => `etiqueta_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Agregar producto a etiquetas
    const agregarEtiqueta = (producto: Producto, cantidad: number = 1, datosAdicionales?: any) => {
        const nuevasEtiquetas: Etiqueta[] = [];

        for (let i = 0; i < cantidad; i++) {
            nuevasEtiquetas.push({
                id: `${generarId()}_${i}`,
                producto,
                cantidad: 1,
                fecha_impresion: new Date().toISOString(),
                fecha_vencimiento: datosAdicionales?.fecha_vencimiento ||
                    addMonths(new Date(), 12).toISOString(),
                codigo_barras: producto.codigo || producto.id.toString(),
                lote: datosAdicionales?.lote || `LOTE${format(new Date(), 'yyyyMMdd')}`,
                precio_especial: datosAdicionales?.precio_especial
            });
        }

        setEtiquetas(prev => [...prev, ...nuevasEtiquetas])
        // Cerrar modal correctamente
        dispatch(closeModalReducer({ modalName: 'configurar-etiqueta' }))
        setProductoSeleccionado(null)
    }

    // Eliminar etiqueta
    const eliminarEtiqueta = (id: string) => {
        setEtiquetas(prev => prev.filter(etiqueta => etiqueta.id !== id))
    }

    // Limpiar todas las etiquetas
    const limpiarEtiquetas = () => {
        setEtiquetas([])
    }

    // Función para abrir modal de selección de productos
    const abrirModalProductos = () => {
        dispatch(openModalReducer({ modalName: 'seleccionar-producto' }))
    }

    // Función para manejar selección de producto desde búsqueda
    const manejarSeleccionProducto = (producto: Producto) => {
        setProductoSeleccionado(producto)
        // Primero cerrar modal de selección
        dispatch(closeModalReducer({ modalName: 'seleccionar-producto' }))
        // Luego abrir modal de configuración
        dispatch(openModalReducer({ modalName: 'configurar-etiqueta' }))
    }

    // Función para cerrar todos los modals
    const cerrarModals = () => {
        dispatch(closeModalReducer({ modalName: 'seleccionar-producto' }))
        dispatch(closeModalReducer({ modalName: 'configurar-etiqueta' }))
        setProductoSeleccionado(null)
    }

    // Descargar PDF
    const handleDescargarPDF = async () => {
        if (etiquetas.length === 0) return;

        setIsGenerandoPDF(true);
        try {
            const pdf = await generarPDF(etiquetas);
            pdf.save(`etiquetas_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.pdf`);
        } catch (error) {
            console.error('Error generando PDF:', error);
            alert('Error al generar el PDF. Intente nuevamente.');
        } finally {
            setIsGenerandoPDF(false);
        }
    };

    // Imprimir directamente
    const handleImprimir = async () => {
        if (etiquetas.length === 0) return;

        setIsGenerandoPDF(true);
        try {
            const pdf = await generarPDF(etiquetas);
            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Abrir en nueva ventana para imprimir
            const printWindow = window.open(pdfUrl);
            if (printWindow) {
                printWindow.onload = () => {
                    printWindow.print();
                };
            }
        } catch (error) {
            console.error('Error imprimiendo:', error);
            alert('Error al imprimir. Intente nuevamente.');
        } finally {
            setIsGenerandoPDF(false);
        }
    };

    return (
        <main className="min-h-screen mx-auto max-w-7xl p-4 md:p-6 text-gray-900">
            <header className="mb-8">
                <h1 className="flex items-center text-2xl font-bold md:text-3xl">
                    <Barcode className="mr-2 h-8 w-8" />
                    Generación de Etiquetas
                </h1>
                <p className="mt-2 text-gray-600">
                    Crea y personaliza etiquetas con código de barras para tus productos
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Panel de control */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">Configuración</h2>

                        {/* Contador de etiquetas */}
                        <div className="bg-purple-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-600 font-medium">Etiquetas listas</p>
                                    <p className="text-2xl font-bold text-purple-700">{etiquetas.length}</p>
                                </div>
                                <Barcode className="h-8 w-8 text-purple-500" />
                            </div>
                        </div>

                        {/* Acciones principales */}
                        <div className="space-y-3">
                            <Button
                                onClick={abrirModalProductos}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Agregar Producto
                            </Button>

                            <Button
                                onClick={handleDescargarPDF}
                                disabled={etiquetas.length === 0 || isGenerandoPDF}
                            >
                                {isGenerandoPDF ? (
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <Download className="h-4 w-4 mr-2" />
                                )}
                                {isGenerandoPDF ? 'Generando...' : 'Descargar PDF'}
                            </Button>

                            <Button
                                onClick={handleImprimir}
                                disabled={etiquetas.length === 0 || isGenerandoPDF}
                            >
                                {isGenerandoPDF ? (
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <Printer className="h-4 w-4 mr-2" />
                                )}
                                {isGenerandoPDF ? 'Preparando...' : 'Imprimir Directo'}
                            </Button>

                            <Button
                                onClick={limpiarEtiquetas}
                                disabled={etiquetas.length === 0}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Limpiar Todo
                            </Button>
                        </div>

                        {/* Información de impresión */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium text-sm mb-2">Información de impresión</h3>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li>• Formato: PDF optimizado</li>
                                <li>• Tamaño etiqueta: 57x32mm</li>
                                <li>• Código de barras EAN-13/CODE128</li>
                                <li>• Incluye logo y fechas</li>
                                <li>• Listo para impresoras térmicas</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Lista de etiquetas */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Etiquetas Generadas</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">
                                        {etiquetas.length} etiquetas
                                    </span>
                                    {isGenerandoPDF && (
                                        <div className="flex items-center gap-1 text-purple-600">
                                            <RefreshCw className="h-3 w-3 animate-spin" />
                                            <span className="text-xs">Generando PDF...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {etiquetas.length === 0 ? (
                                <div className="text-center py-12">
                                    <Barcode className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        No hay etiquetas generadas
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Comienza agregando productos para generar etiquetas
                                    </p>
                                    <Button
                                        onClick={abrirModalProductos}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Agregar Primer Producto
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {etiquetas.map(etiqueta => (
                                        <EtiquetaItem
                                            key={etiqueta.id}
                                            etiqueta={etiqueta}
                                            onRemove={eliminarEtiqueta}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de selección de productos */}
            <Modal
                modalName="seleccionar-producto"
                title="Buscar Productos"

            >
                <BusquedaProductos
                    onSeleccionarProducto={manejarSeleccionProducto}
                    onClose={cerrarModals}
                />
            </Modal>

            {/* Modal de configuración de etiqueta */}
            <Modal
                modalName="configurar-etiqueta"
                title="Configurar Etiqueta"
            >
                {productoSeleccionado && (
                    <ModalConfiguracionEtiqueta
                        producto={productoSeleccionado}
                        onConfirm={agregarEtiqueta}
                        onClose={cerrarModals}
                    />
                )}
            </Modal>
        </main>
    )
}