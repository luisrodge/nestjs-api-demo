import { Post, Body, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { DtoValidationPipe } from '../core/pipes/dto-validation.pipe';
import { CreateContactDto, ResultContactDto } from './contact.dto';
import { ApiController } from '../core/decorators/api-controller.decorator';
import { ContactsService } from './contacts.service';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { ContactEntity } from './contact.entity';
import { editFileName, csvFileFilter } from '../utils/file-uploading.utils';

@ApiController('/api/v1/contacts', ResultContactDto)
export class ContactsController {
  protected dtoValidationPipe: DtoValidationPipe;

  constructor(private contactsService: ContactsService) {
    this.dtoValidationPipe = new DtoValidationPipe({
      transform: true,
      whitelist: true,
    });
  }

  @Get()
  async findAll(
    @CurrentUser() currentUser: UserEntity,
  ): Promise<Array<ContactEntity>> {
    return await this.contactsService.findAll();
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

  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async import(@CurrentUser() currentUser: UserEntity, @UploadedFile() file) {
    console.log(file);
    await this.contactsService.import(file.path);
    return 'Ok';
  }
}
