import express from 'express';
import {
  searchTransport,
  getTransportDetails,
  getPopularRoutes,
  filterByPrice
} from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchTransport);
router.get('/transport/:transportId', getTransportDetails);
router.get('/popular-routes', getPopularRoutes);
router.get('/filter/price', filterByPrice);

export default router;
