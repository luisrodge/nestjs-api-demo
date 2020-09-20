import { Get } from '@nestjs/common';

import { ApiController } from '../core/decorators/api-controller.decorator';
import { ResultBundleDto } from './bundle.dto';
import { BundlesService } from './bundles.service';

@ApiController('/api/v1/bundles', ResultBundleDto)
export class BundlesController {
  constructor(private bundlesService: BundlesService) {}

  @Get()
  public async findAll() {
    return await this.bundlesService.findAll();
  }
}
