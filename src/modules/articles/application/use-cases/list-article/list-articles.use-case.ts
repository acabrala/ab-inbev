import { Inject, Injectable } from '@nestjs/common';
import { IArticleRepository } from '../../../domain/repositories/article.repository.interface';
import { Article } from '../../../domain/entities/article.entity';

@Injectable()
export class ListArticlesUseCase {
  constructor(@Inject('ArticleRepository') private readonly articleRepository: IArticleRepository,
) {}

  async execute(): Promise<Article[]> {
    return this.articleRepository.findAll();
  }
}
