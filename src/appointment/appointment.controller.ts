import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppointmentService } from './services/appointment.service';
import { CreateAppointmentDTO } from './dtos/create-appointment.dto';
import { UpdateAppointmentDTO } from './dtos/update-appointment.dto';

@Controller('appointment')
@ApiTags('Appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  async createAppointment(
    @Body() createAppointmentDTO: CreateAppointmentDTO,
  ): Promise<any> {
    console.log('AAAAAAAAAA');
    return this.appointmentService.createAppointment(createAppointmentDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  async getAllAppointments(): Promise<any> {
    return this.appointmentService.getAllAppointments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by ID' })
  async getAppointmentById(@Param('id') id: string): Promise<any> {
    return this.appointmentService.getAppointmentById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update appointment by ID' })
  async updateAppointment(
    @Param('id') id: string,
    @Body() updateAppointmentDTO: UpdateAppointmentDTO,
  ): Promise<any> {
    return this.appointmentService.updateAppointment(id, updateAppointmentDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete appointment by ID' })
  async deleteAppointment(@Param('id') id: string): Promise<any> {
    return this.appointmentService.deleteAppointment(id);
  }
}
