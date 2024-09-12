import data from './data.json';

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

export type ResponseData = {
  data: Person[];
  rowCount: number;
};

export const pageSize = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pageNumber = parseInt(searchParams.get('page') ?? '0');

  return Response.json({
    data: data.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
    rowCount: data.length,
  });
}
