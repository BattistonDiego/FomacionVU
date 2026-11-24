import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideChevronRight,
  LucideDynamicIcon,
  LucideMegaphone,
} from '@lucide/angular';

import { HomeSearchService } from '../../services/home-search.service';
import { AVAILABLE_MODULES } from '../../../../core/navigation/navigation.config';
import { NewsBanner } from '../../../news/components/news-banner/news-banner';
import { SearchInput } from '../../../../shared/components/search-input/search-input';

/** Welcome dashboard: news banner, greeting, global search and the implemented modules. */
@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    SearchInput,
    NewsBanner,
    LucideArrowRight,
    LucideChevronRight,
    LucideDynamicIcon,
    LucideMegaphone,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly searchService = inject(HomeSearchService);
  private readonly router = inject(Router);

  protected readonly modules = AVAILABLE_MODULES;
  protected readonly query = signal('');
  protected readonly results = computed(() => this.searchService.search(this.query()));
  protected readonly hasResults = computed(() => {
    const r = this.results();
    return !!r && (r.modules.length > 0 || r.news.length > 0 || r.incidents.length > 0);
  });

  /** Enter opens the first result shown. */
  protected openFirstResult(): void {
    const r = this.results();
    if (r?.modules.length) {
      void this.router.navigate(['/', r.modules[0].path]);
    } else if (r?.news.length) {
      void this.router.navigate(['/novedades', r.news[0].slug]);
    } else if (r?.incidents.length) {
      void this.router.navigate(['/incidencias', r.incidents[0].id]);
    }
  }
}
