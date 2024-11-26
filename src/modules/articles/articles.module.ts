import { Module } from '@nestjs/common';
import { AuthModule } from '../../modules/auth/auth.module';
import { ArticlesController } from './presentation/controllers/articles.controller';
import { ListArticlesUseCase } from './application/use-cases/list-article/list-articles.use-case';
import { ArticleRepository } from './infrastructure/repositories/articles/articles.repository';
import { PrismaService } from 'prisma/prisma.service';
import { CreateArticleUseCase } from './application/use-cases/create-article/create-article.use-case';
import { UpdateArticleUseCase } from './application/use-cases/update-article/update-article.use-case';
import { DeleteArticleUseCase } from './application/use-cases/delete-article/delete-article.use-case';

@Module({
  controllers: [ArticlesController],
  imports: [AuthModule],
  providers: [
    {
        provide: 'ArticleRepository',
        useClass: ArticleRepository,
    },
    CreateArticleUseCase,
    ListArticlesUseCase,
    UpdateArticleUseCase,
    DeleteArticleUseCase,
    ArticleRepository,
    PrismaService,
  ],
})
export class ArticleModule {}
