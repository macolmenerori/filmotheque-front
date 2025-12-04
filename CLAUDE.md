# Filmotheque Front Development Guide

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Bundler**: Webpack 5
- **Styling**: Tailwind CSS v4.1.14 with plugins (@tailwindcss/forms, @tailwindcss/typography, @tailwindcss/aspect-ratio)
- **UI Components**: tw-elements for Material Design components
- **Testing**: Jest + @testing-library/react
- **Linting**: ESLint + Prettier

## Commands
- `pnpm build` - Production build with webpack
- `pnpm start` - Webpack dev server on port 3000
- `pnpm test` - Run all tests
- `pnpm test path/to/Component.test.tsx` - Run single test file
- `pnpm lint` - ESLint with auto-fix
- `pnpm prettify` - Format with Prettier
- `pnpm types` - TypeScript type checking
- `pnpm verify` - Run all checks and tests

## Project Structure
- `/src/pages/` - Page components (MainPage, Movie, NewMovie, Login)
- `/src/common/components/` - Reusable components (Navbar, Pagination, etc.)
- `/src/context/` - React contexts (ToastContext, UserContext)
- `/src/tailwind.css` - Tailwind CSS configuration and imports

## Code Style
- **Files**: Component files named same as component with `.tsx` extension
- **Types**: Separate `.types.ts` files with PascalCase interfaces
- **Imports**: Structured import order: React, org imports, 3rd party, local, relative
- **Components**: PascalCase for components, function components with explicit return types
- **Error Handling**: Try/catch for async operations, use ToastContext for user-facing errors
- **Testing**: Each component has corresponding test file, use @testing-library/react
- **Formatting**: 100 char line limit, semicolons, single quotes, no trailing commas
- **TypeScript**: Strict mode enabled, no `any` types, strict null checks

## Tailwind CSS v4
- Configuration uses CSS-based theming via `@theme` directive in `src/tailwind.css`
- JavaScript config (`tailwind.config.js`) explicitly loaded via `@config` directive for tw-elements compatibility
- Custom font family: InterVariable as primary sans-serif
- Plugins imported directly in CSS file

## Best Practices
- Follow existing patterns in component folders
- Maintain test coverage for all components
- Use existing contexts (ToastContext) for notifications
- Ensure responsive design with Tailwind utilities