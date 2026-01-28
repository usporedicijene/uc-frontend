/* eslint-disable @typescript-eslint/no-explicit-any */
export type ErrorItem = { message: string; code: number };

export class FetchError extends Error {
  response: any;
  constructor(message: string, res: any) {
    super(message);
    this.response = res;
  }
}

export class ApiError extends Error {
  code: number;
  statusCode: number;
  errors: ErrorItem[];
  timestamp: string;
  path: string;

  constructor(
    message: string,
    statusCode: number,
    timestamp: string,
    path: string,
    code: number,
    errors: ErrorItem[],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.timestamp = timestamp;
    this.code = code;
    this.path = path;
  }

  toJSON(): ErrorJSON {
    return {
      errors: this.errors,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      path: this.path,
      code: this.code,
    };
  }
}

export class UnexpectedError extends Error {
  data: any;
  constructor(data?: any) {
    super("Unexpected Error");
    this.data = data;
  }

  toJSON(): ErrorJSON {
    return {
      code: 500,
      path: "",
      timestamp: "",
      errors: [],
      message: this.message,
      statusCode: 500,
    };
  }
}

export type ErrorJSON = {
  code: number;
  statusCode: number;
  message: string;
  errors: ErrorItem[];
  timestamp: string;
  path: string;
  userId?: string;
};
