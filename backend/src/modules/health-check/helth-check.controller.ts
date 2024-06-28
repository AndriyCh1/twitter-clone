import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';

@controller('/health-check')
export class HealthCheckController extends BaseHttpController {
  constructor() {
    super();
  }

  @httpGet('')
  public up() {
    return true;
  }
}
