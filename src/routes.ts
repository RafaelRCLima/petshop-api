import { Router, type Request, type Response } from 'express';
import createAppointmentController from './app/controllers/create-appointment-controller.js';

const routes = Router();

routes.post('/create-appointment', createAppointmentController);

export default routes;
