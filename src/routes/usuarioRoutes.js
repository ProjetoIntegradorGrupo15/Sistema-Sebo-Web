import express from 'express';
import{
    listarUsuario,
    inserirUsuario,
    excluirUsuario,
    loginUsuario
} from '../controllers/usuarioController.js';

const router = express.Router();

router.get( '/', listarUsuario);
router.post( '/', inserirUsuario);
router.delete( '/:id', excluirUsuario);
router.post( '/login', loginUsuario); 
export default router;