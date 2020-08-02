import { Post, Body } from '@nestjs/common';
import { DtoValidationPipe } from '../core/pipes/dto-validation.pipe';
import { CreateContactDto, ResultContactDto } from './contact.dto';
import { ApiController } from '../core/decorators/api-controller.decorator';
import { ContactsService } from './contacts.service';

@ApiController('/api/v1/contacts', ResultContactDto)
export class ContactsController {
  protected dtoValidationPipe: DtoValidationPipe;

  constructor(private contactsService: ContactsService) {
    this.dtoValidationPipe = new DtoValidationPipe({
      transform: true,
      whitelist: true,
    });
  }

  @Post()
  async create(@Body() data: Record<string, any>) {
    const dto = await this.dtoValidationPipe.transformToDto(
      CreateContactDto,
      data,
    );
    return this.contactsService.create(dto);
  }
}
