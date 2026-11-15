# SupportHub

Base de conhecimento para o atendimento ao cliente. Interface em espanhol (es-ES).

Módulos disponíveis:

- **Incidencias** (`/incidencias`): listagem com busca e filtro, e página de detalhes.
- **Descuentos** (`/descuentos`): regras de desconto por venda flash. Os dados estão em
  `features/discounts/data/discounts.data.ts`; o termo "déo" está marcado como pendente de confirmação.

Os demais módulos aparecem na navegação como "Módulo en preparación".

## Executar

```bash
npm install
npm start          # http://localhost:4200
npm test           # testes unitários (Vitest)
npm run build      # build de produção em dist/
```

Angular 22 (standalone, zoneless, signals), SCSS, ícones `@lucide/angular`, fonte Inter local.

## Estrutura

```
src/
  styles/                     tokens (cores, raios, sombras), base, primitivas de UI
  app/
    core/
      layout/                 shell, sidebar, header, brand + LayoutService
      navigation/             menu como dados + rotas "en preparación"
      user/                   perfil estático
    features/
      incidents/
        data/                 transcrição da documentação (fonte única dos dados)
        models/               IncidentType
        services/             busca, filtro, estado da listagem
        components/           incident-table
        pages/                incident-list, incident-detail
        incidents.routes.ts
    shared/
      components/             breadcrumb, page-header, search-input, filter-chips,
                              content-blocks, pending-text, avatar
      models/ utils/ pages/   ContentBlock, busca sem acentos, coming-soon
```

## Regras dos dados

`features/incidents/data/incident-types.data.ts` transcreve a documentação original:

- O texto é literal; só erros evidentes de digitação/acentuação em espanhol são corrigidos
  (cada correção está anotada em comentário). Nomes em francês e termos do sistema não mudam.
- Trechos cortados ou ilegíveis ficam como `PENDING` e aparecem na interface como
  "Texto recortado en la documentación original · pendiente de confirmación".
- Não se acrescentam campos, procedimentos ou responsáveis que não estejam na fonte.

**Pendências:** P1 (#13), P2 (#14), P3 (#18), P4 (#14–#18), P6 (#1–#2) e a segunda página
da fonte (linhas após o #18), ainda não verificada.

## Adicionar um módulo

1. Criar `features/<modulo>/` com o mesmo padrão (data, models, services, pages, routes).
2. Registrar a rota em `app.routes.ts`.
3. Marcar `available: true` no item correspondente em `core/navigation/navigation.config.ts`.

Novas informações de uma incidência (por exemplo, procedimentos) entram como campos
opcionais em `IncidentType` e como uma seção nova na página de detalhes.
