import { Router } from 'express';
import { generateProduct } from '../utils.js';

const router = Router();

router.get('/', (req, res)=>{
    const quantity = parseInt(req.query.quantity) || 100;
    let products = [];
    for (let i = 0; i < quantity; i++) {
        const product = generateProduct();
        products.push(product)        
    }
    res.json({products})
})

export { router as mockingRouter }