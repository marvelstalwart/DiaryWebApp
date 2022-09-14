import express from 'express';
const router = express.Router();
import {getEntries, getEntry, createEntry, editEntry, deleteEntry} from '../controllers/entry.js'
import {protect} from "../middleware/authMiddleware.js"

router.route('/').get(protect, getEntries).post(protect, createEntry);
router.route('/:id').get(getEntry).put(protect, editEntry).delete(protect, deleteEntry)



export default router;