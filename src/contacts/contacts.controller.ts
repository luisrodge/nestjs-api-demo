import {
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFile,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { DtoValidationPipe } from '../core/pipes/dto-validation.pipe';
import {
  CreateContactDto,
  UpdateContactDto,
  ResultContactDto,
} from './contact.dto';
import { ApiController } from '../core/decorators/api-controller.decorator';
import { ContactsService } from './contacts.service';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { ContactEntity } from './contact.entity';
import { editFileName, csvFileFilter } from '../utils/file-uploading';

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
    return await this.contactsService.findAll(currentUser.businessId);
  }

  @Post()
  async create(
    @CurrentUser() currentUser: UserEntity,
    @Body() data: Record<string, any>,
  ) {
    const dto = await this.dtoValidationPipe.transformToDto(
      CreateContactDto,
      data,
    );
    return await this.contactsService.create(dto, currentUser.businessId);
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
    await this.contactsService.import(file.path, currentUser.businessId);
  }

  @Put(':id')
  async update(@Body() data: Record<string, any>, @Param('id') id: number) {
    const dto = await this.dtoValidationPipe.transformToDto(
      UpdateContactDto,
      data,
    );
    return await this.contactsService.update(dto, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.contactsService.delete(id);
  }
}
