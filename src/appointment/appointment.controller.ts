import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { AppointmentService } from './services/appointment.service';
import { CreateAppointmentDTO } from './dtos/create-appointment.dto';
import { UpdateAppointmentDTO } from './dtos/update-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(@Body() createAppointmentDTO: CreateAppointmentDTO) {
    return this.appointmentService.createAppointment(createAppointmentDTO);
  }

  @Get()
  async getAllAppointments(@Query('type') type?: 'visit' | 'rent') {
    return this.appointmentService.getAllAppointments(type);
  }

  @Get(':id')
  async getAppointmentById(@Param('id') id: string) {
    return this.appointmentService.getAppointmentById(id);
  }

  @Patch(':id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() updateAppointmentDTO: UpdateAppointmentDTO,
  ) {
    return this.appointmentService.updateAppointment(id, updateAppointmentDTO);
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return this.appointmentService.deleteAppointment(id);
  }
}
