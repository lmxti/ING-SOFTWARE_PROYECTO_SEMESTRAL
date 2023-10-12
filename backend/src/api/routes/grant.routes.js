import { Router } from 'express';
import { createGrant, getGrants, getGrantById, updateGrantById, deleteGrantById} from '../controller/grant.controller.js';

const router = Router();

router.post('/', createGrant);
router.get('/', getGrants);
router.get('/:grantId', getGrantById);
router.put('/:grantId',updateGrantById);
router.delete('/:grantId',deleteGrantById);

export default router;