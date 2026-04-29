import { Router, type Request, type Response } from 'express';
import {
  CreateAppointmentController,
  SearchAppointmentsController
} from './app/controllers/index.js';

const routes = Router();

routes
  .post('/appointments', CreateAppointmentController)
  .get('/appointments/:limit/:page', SearchAppointmentsController);

export default routes;
