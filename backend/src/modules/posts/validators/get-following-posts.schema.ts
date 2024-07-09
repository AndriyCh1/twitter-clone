import { z } from 'zod';

import { pageOptionsSchema } from '../../../common/validators/page-options.schema';

export const getAllPostsSchema = z.object({
  query: pageOptionsSchema,
});
