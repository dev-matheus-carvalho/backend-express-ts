import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


interface ICidade {
  nome: string;
  estado: string,
}


interface IFilter {
  filter?: string
}


const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});


const queryValidation: yup.ObjectSchema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});


export const createQueryValidator: RequestHandler = async (req, res, next) => {
  try {

    await queryValidation.validate(req.query, { abortEarly: false });
    return next();

  } catch(err) {

    const yupError = err as yup.ValidationError;
    const erros: Record<string, string> = {};

    yupError.inner.forEach(err => {
      if (!err.path) return;

      erros[err.path] = err.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors: erros });
  }
};


export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {

    await bodyValidation.validate(req.body, { abortEarly: false });
    return next();

  } catch(err) {

    const yupError = err as yup.ValidationError;
    const erros: Record<string, string> = {};

    yupError.inner.forEach(err => {
      if (!err.path) return;

      erros[err.path] = err.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors: erros });
  }
};


export const create: RequestHandler = async (req: Request<{}, {}, ICidade>, res: Response) => {

  console.log(req.body);
  return res.send('Created! ✔️');
};
