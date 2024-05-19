import { Request, Response } from 'express';
import axios from 'axios';

export default class ArticleController {
    
    fetchProducts = async (_req: Request, res: Response): Promise<void> => {
        try {
            // URL de la API
            const apiUrl = 'https://api.npoint.io/237a0d1ac8530064cc04';

            // Hacer la solicitud a la API
            const response = await axios.get(apiUrl);
            
            // Verificar que la respuesta es correcta
            if (response.data && response.data.articulos) {
                const products = response.data.articulos;

                // Desplegar la información de los productos
                res.status(200).json(products);
            } else {
                res.status(404).json({ message: 'No se encontraron productos' });
            }
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };
}
