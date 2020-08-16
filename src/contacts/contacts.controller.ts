import { Post, Body } from '@nestjs/common';
import { DtoValidationPipe } from '../core/pipes/dto-validation.pipe';
import { CreateContactDto, ResultContactDto } from './contact.dto';
import { ApiController } from '../core/decorators/api-controller.decorator';
import { ContactsService } from './contacts.service';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';

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
  async create(
    @Body() data: Record<string, any>,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const dto = await this.dtoValidationPipe.transformToDto(
      CreateContactDto,
      data,
    );
    return await this.contactsService.create(dto, currentUser.id);
  }
}
