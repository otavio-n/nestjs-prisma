import { Test, TestingModule } from '@nestjs/testing';
import { BookDTO } from './book.dto';
import { BookService } from './book.service';
import { PrismaService } from 'src/database/PrismaService';

const bookList: BookDTO[] = [
  {
    title: 'Lord of the Rings - The Fellowship of the Ring',
    description: `Continuing the story begun in The Hobbit, 
    this is the first part of Tolkien's epic masterpiece.`,
    bar_code: '9780261102354',
  },
  {
    title: 'Lord of the Rings - The Two Towers',
    description: `Building on the story begun in The Hobbit and The Fellowship of the Ring 
    this is the second part of Tolkien's epic masterpiece`,
    bar_code: '0261102362',
  },
  {
    title: 'Lord of the Rings - The Return of the King',
    description: `Special unjacketed hardback edition of the final part of J.R.R. Tolkien's 
    epic masterpiece, The Lord of the Rings`,
    bar_code: '000856714X',
  },
];

const singleBook: BookDTO = bookList[0];

describe('BookService', () => {
  let service: BookService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: PrismaService,
          useValue: {
            book: {
              create: jest.fn().mockResolvedValue(singleBook),
              findFirst: jest.fn().mockResolvedValue(undefined),
              findMany: jest.fn().mockResolvedValue(bookList),
              findUnique: jest.fn().mockResolvedValue(singleBook),
              update: jest.fn().mockResolvedValue(singleBook),
              delete: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('test findAll method', () => {
    it('should return all books', async () => {
      const result = await service.findAll();

      expect(result).toEqual(bookList);
      expect(Array.isArray(result)).toBeTruthy();
      expect(prisma.book.findMany).toBeCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(prisma.book, 'findMany').mockRejectedValueOnce(new Error());

      expect(service.findAll()).rejects.toThrowError();
    });
  });

  describe('test create method', () => {
    it('should return created book', async () => {
      const result = await service.create(singleBook);

      expect(result).toEqual(singleBook);
      expect(prisma.book.create).toBeCalledTimes(1);
      expect(prisma.book.create).toBeCalledWith({ data: singleBook });
    });

    it('should throw an exception when book exists', async () => {
      jest.spyOn(prisma.book, 'findFirst').mockResolvedValueOnce({
        id: '123',
        title: 'Lord of the Rings - The Fellowship of the Ring',
        description: `Continuing the story begun in The Hobbit, 
        this is the first part of Tolkien's epic masterpiece.`,
        bar_code: '9780261102354',
      });

      expect(service.create(singleBook)).rejects.toThrowError(
        'Book already exists',
      );
    });
  });

  describe('test update method', () => {
    it('should return updated book', async () => {
      const id = '123';

      const result = await service.update(id, singleBook);

      expect(result).toEqual(singleBook);
      expect(prisma.book.findUnique).toBeCalledTimes(1);
      expect(prisma.book.findUnique).toBeCalledWith({ where: { id } });
      expect(prisma.book.update).toBeCalledTimes(1);
      expect(prisma.book.update).toBeCalledWith({
        data: singleBook,
        where: { id },
      });
    });

    it('should throw an exception when book does not exist', async () => {
      jest.spyOn(prisma.book, 'findUnique').mockResolvedValueOnce(undefined);

      expect(service.update('123', singleBook)).rejects.toThrowError(
        'Book does not exist',
      );
    });
  });

  describe('test delete method', () => {
    it('should return undefined when book is deleted', async () => {
      const id = '123';

      const result = await service.delete(id);

      expect(result).toEqual(undefined);
      expect(prisma.book.findUnique).toBeCalledTimes(1);
      expect(prisma.book.findUnique).toBeCalledWith({ where: { id } });
      expect(prisma.book.delete).toBeCalledTimes(1);
      expect(prisma.book.delete).toBeCalledWith({
        where: { id },
      });
    });

    it('should throw an exception when book does not exist', async () => {
      jest.spyOn(prisma.book, 'findUnique').mockResolvedValueOnce(undefined);

      expect(service.delete('123')).rejects.toThrowError('Book does not exist');
    });
  });
});
