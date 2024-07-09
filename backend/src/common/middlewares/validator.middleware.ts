import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

const validate =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseResult = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
        files: req.files,
        file: req.file,
      });

      req.query = parseResult.query ?? req.query;
      req.body = parseResult.body ?? req.body;
      req.params = parseResult.params ?? req.params;
      req.files = parseResult.files ?? req.files;
      req.file = parseResult.file ?? req.file;

      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validate;
