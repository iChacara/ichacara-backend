import { IsFiles, MemoryStoredFile } from 'nestjs-form-data';

export class FormDataTestDto {
  @IsFiles()
  images: MemoryStoredFile;
}
