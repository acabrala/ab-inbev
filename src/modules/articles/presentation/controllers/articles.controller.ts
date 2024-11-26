import { Controller, Post, Get, Body, UseGuards, Request, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateArticleDto } from '../../dto/create-article.dto';
import { CreateArticleUseCase } from '../../application/use-cases/create-article/create-article.use-case';
import { ListArticlesUseCase } from '../../application/use-cases/list-article/list-articles.use-case';
import { Roles } from 'src/shared/decorators/role.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { UpdateArticleUseCase } from '../../application/use-cases/update-article/update-article.use-case';
import { UpdateArticleDto } from '../../dto/update-article.dto';
import { DeleteArticleUseCase } from '../../application/use-cases/delete-article/delete-article.use-case';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly listArticlesUseCase: ListArticlesUseCase,
    private readonly updateArticleUseCase: UpdateArticleUseCase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Editor')
  async create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    const { title, content } = createArticleDto;
    const userId = req.user.id;
    return this.createArticleUseCase.execute(title, content, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Editor', 'Leitor')
  async findAll() {
    return this.listArticlesUseCase.execute();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Editor')
  async updateArticle(
    @Param('id') id: number,
    @Body() data: Partial<UpdateArticleDto>,
  ) {
    return this.updateArticleUseCase.execute(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Editor')
  async deleteArticle(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deleteArticleUseCase.execute(id);
  }
}
