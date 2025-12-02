# 💰 Zeus Finance

<img width="1920" height="963" alt="Dashboard" src="./src/assets/dashboard.png" />

[![Ver demo](https://img.shields.io/badge/Ver%20Demo-poetic-centaur--37e15f.netlify.app-brightgreen)](https://poetic-centaur-37e15f.netlify.app)


Um sistema de controle financeiro pessoal moderno e intuitivo, desenvolvido com Next.js 15 e tecnologias de ponta.

## ✨ Funcionalidades

- **🔐 Sistema de Autenticação**: Login seguro com sessões JWT e proteção de rotas
- **👤 Perfil do Usuário**: Gestão personalizada de dados financeiros por usuário
- **� Dashboard Avançado**: Visualização completa das suas finanças com múltiplas métricas
- **💸 Gestão de Transações**: Adicione, edite e delete receitas e despesas
- **🏷️ Categorização**: Organize suas transações por categorias (Alimentação, Saúde, Educação, Casa, Lazer, etc.)
- **📅 Filtros Avançados**: Filtre transações por mês e ano
- **📈 Gráficos Interativos**: 
  - **Gráfico de Barras Horizontais**: Compare receitas vs despesas visualmente
  - **Resumo Visual**: Valores formatados em real brasileiro com cores diferenciadas
- **📋 Últimas Transações**: Visualize suas 5 transações mais recentes com ícones de categoria
- **📊 Cards de Resumo**: Métricas financeiras organizadas em cards informativos
- **📤 Exportação Múltipla**: Exporte seus dados em Excel (.xlsx), CSV, JSON ou XML
- **🔒 Proteção de Dados**: Cada usuário acessa apenas suas próprias transações

## 🚀 Tecnologias Utilizadas

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Radix UI](https://www.radix-ui.com/)** - Componentes primitivos acessíveis
- **[Lucide React](https://lucide.dev/)** - Ícones SVG modernos
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos React
- **[shadcn/ui Charts](https://ui.shadcn.com/charts)** - Componentes de gráfico personalizados

### Backend & Banco de Dados
- **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL
- **[MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)** - Driver nativo MongoDB

### Autenticação & Segurança
- **[José](https://github.com/panva/jose)** - JWT tokens seguros para sessões
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Hash de senhas
- **Middleware Next.js** - Proteção de rotas e controle de acesso

### Formulários & Validação
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript
- **[Next Safe Action](https://next-safe-action.dev/)** - Server Actions tipadas e seguras

### Utilitários
- **[dayjs](https://day.js.org/)** - Manipulação de datas
- **[CUID2](https://github.com/paralleldrive/cuid2)** - Gerador de IDs únicos
- **[nuqs](https://nuqs.47ng.com/)** - Gerenciamento de query parameters
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[XLSX](https://sheetjs.com/)** - Exportação para Excel

### Ferramentas de Desenvolvimento
- **[Biome](https://biomejs.dev/)** - Linter e formatter
- **[Turbopack](https://turbo.build/pack)** - Bundler ultra-rápido

## 📋 Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/WedsonTavaress/zeus-finance.git
cd zeus-finance
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente
Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:

```env
# Configuração do Banco de Dados MongoDB
MONGODB_URI="mongodb+srv://seu-usuario:sua-senha@seu-cluster.mongodb.net/?appName=SeuApp"

# Chave secreta para JWT (use uma chave forte em produção)
SESSION_SECRET="sua-chave-secreta-aqui"
```

### 4. (Opcional) Popule o banco com dados de exemplo
```bash
# Execute o script de seed (cria usuário admin e dados iniciais)
npm run db:seed
```

Credenciais padrão após o seed:
- **Usuário**: `admin`
- **Senha**: `admin123`

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Scripts Disponíveis

```bash
npm run dev              # Inicia o servidor de desenvolvimento
npm run build            # Gera o build de produção
npm run start            # Inicia o servidor de produção
npm run lint             # Executa o linter
npm run db:seed          # Popula o banco com dados de exemplo
```


## 👨‍💻 Autor

Desenvolvido por [Wedson Tavares](https://github.com/WedsonTavares)
