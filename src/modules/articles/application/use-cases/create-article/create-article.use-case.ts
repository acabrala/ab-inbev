import { Inject, Injectable } from '@nestjs/common';
import { IArticleRepository } from '../../../domain/repositories/article.repository.interface';
import { Article } from '../../../domain/entities/article.entity';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    @Inject('ArticleRepository') private readonly articleRepository: IArticleRepository,
  ) {}

  async execute(title: string, content: string, createdBy: number): Promise<Article> {
    const article = new Article(title, content, createdBy);
    return this.articleRepository.create(article);
  }
}
