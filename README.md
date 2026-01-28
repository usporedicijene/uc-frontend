# Usporedi Cijene

A price comparison web app for Croatian retail stores. Search products, compare prices across stores, build shopping baskets, and find the cheapest place to shop.

## Features

- **Product Search** - Search products by name or scan barcodes
- **Price Comparison** - Compare prices across multiple retail chains
- **Shopping Basket** - Build a basket and find the cheapest store for all items
- **Store Locator** - Find nearby stores with interactive maps
- **Price Statistics** - Track price trends and market statistics

## Tech Stack

- [Next.js 16.1.6+](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) components
- [MapLibre GL](https://maplibre.org/) for maps

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:usporedicijene/uc-frontend.git

   cd uc-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory (recommended for local development):

   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

   Alternatively, create a `.env` file for shared defaults across environments.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command            | Description               |
| ------------------ | ------------------------- |
| `npm run dev`      | Start development server  |
| `npm run build`    | Build for production      |
| `npm run start`    | Start production server   |
| `npm run lint`     | Run ESLint                |
| `npm run lint:fix` | Fix linting errors        |
| `npm run format`   | Format code with Prettier |

## Project Structure

```
src/
├── app/              # Next.js pages and layouts
├── api/              # API functions and types
├── features/         # Feature modules (components, actions, utils)
├── components/       # Shared UI components
├── lib/              # Utilities and helpers
└── hooks/            # Custom React hooks
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-new-feature`)
3. Commit your changes (`git commit -m 'Add some new feature'`)
4. Push to the branch (`git push origin feature/your-new-feature`)
5. Open a Pull Request

### Code Style

This project uses ESLint and Prettier with pre-commit hooks. Your code will be automatically formatted on commit.

Key conventions:

- No `console.log` statements (use proper error handling)
- No `any` types in TypeScript
- Props and imports must be sorted

## License

This project is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html). See the [LICENSE.txt](LICENSE.txt) file for the full license text.
