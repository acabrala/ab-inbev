import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IArticleRepository } from '../../../domain/repositories/article.repository.interface';
import { Article } from '../../../domain/entities/article.entity';

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    @Inject('ArticleRepository') private readonly articleRepository: IArticleRepository,
  ) {}

  async execute(id: number, data: Partial<Article>): Promise<Article> {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    const updatedArticle = {
      ...article,
      ...data,
    };

    return this.articleRepository.update(id, updatedArticle);
  }
}
