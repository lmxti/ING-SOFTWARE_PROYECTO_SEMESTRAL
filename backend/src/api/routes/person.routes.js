import { Router } from 'express';
import { getPersons, createPerson, getPersonById, updatePersonById, deletePersonById } from '../controller/person.controller.js';

const router = Router();

router.get('/', getPersons);
router.get('/:personId', getPersonById);

router.post('/', createPerson);
router.put('/:personId',updatePersonById);
router.delete('/:personId', deletePersonById);

export default router;