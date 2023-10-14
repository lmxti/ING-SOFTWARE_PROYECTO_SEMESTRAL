import { Router } from 'express';
import { createApplication, getApplications, getApplicationById, updateApplicationById, deleteApplicationById} from '../controller/application.controller.js';

const router = Router();

router.post('/', createApplication);
router.get('/', getApplications);
router.get('/:applicationId', getApplicationById);
router.put('/:applicationId', updateApplicationById);
router.delete('/:applicationId', deleteApplicationById);


export default router;