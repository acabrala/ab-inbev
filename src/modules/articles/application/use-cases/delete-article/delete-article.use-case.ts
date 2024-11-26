import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IArticleRepository } from '../../../domain/repositories/article.repository.interface';

@Injectable()
export class DeleteArticleUseCase {
  constructor(
    @Inject('ArticleRepository') private readonly articleRepository: IArticleRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    await this.articleRepository.delete(id);
  }
}
