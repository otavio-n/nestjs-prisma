import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

const bookList: BookDTO[] = [
  {
    title: 'Lord of the Rings - The Fellowship of the Ring',
    description: `Continuing the story begun in The Hobbit, this is the first part of Tolkien's epic masterpiece.`,
    bar_code: '9780261102354',
  },
  {
    title: 'Lord of the Rings - The Two Towers',
    description: `Building on the story begun in The Hobbit and The Fellowship of the Ring this is the second part of Tolkien's epic masterpiece`,
    bar_code: '0261102362',
  },
  {
    title: 'Lord of the Rings - The Return of the King',
    description: `Special unjacketed hardback edition of the final part of J.R.R. Tolkien's epic masterpiece, The Lord of the Rings`,
    bar_code: '000856714X',
  },
];

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
            create: jest.fn(),
            findAll: jest.fn().mockResolvedValue(bookList),
            update: jest.fn(),
            delete: jest.fn(),
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

  it('should return all books', async () => {
    const result = await controller.findAll();

    expect(result).toEqual(bookList);
    expect(Array.isArray(result)).toBeTruthy();
  });
});
