import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

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

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            create: jest.fn().mockResolvedValue(singleBook),
            findAll: jest.fn().mockResolvedValue(bookList),
            update: jest.fn().mockResolvedValue(singleBook),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('test findAll method', () => {
    it('should return all books', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(bookList);
      expect(Array.isArray(result)).toBeTruthy();
      expect(service.findAll).toBeCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      expect(controller.findAll()).rejects.toThrowError();
    });
  });

  describe('test create method', () => {
    it('should return created book', async () => {
      const result = await controller.create(singleBook);

      expect(result).toEqual(singleBook);
      expect(typeof result).toBe('object');
      expect(service.create).toBeCalledTimes(1);
      expect(service.create).toBeCalledWith(singleBook);
    });

    it('should throw an exception', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      expect(controller.create(singleBook)).rejects.toThrowError();
    });
  });

  describe('test update method', () => {
    it('should return updated book', async () => {
      const mockId = '9876543210';
      const result = await controller.update(mockId, singleBook);

      expect(result).toEqual(singleBook);
      expect(typeof result).toBe('object');
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(mockId, singleBook);
    });

    it('should throw an exception', async () => {
      const mockId = '9876543210';
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      expect(controller.update(mockId, singleBook)).rejects.toThrowError();
    });
  });

  describe('test delete method', () => {
    it('should return undefined', async () => {
      const mockId = '9876543210';
      const result = await controller.delete(mockId);

      expect(result).toBeUndefined();
      expect(service.delete).toBeCalledTimes(1);
      expect(service.delete).toBeCalledWith(mockId);
    });

    it('should throw an exception', async () => {
      const mockId = '9876543210';
      jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());

      expect(controller.delete(mockId)).rejects.toThrowError();
    });
  });
});
