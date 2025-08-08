# Habitat - Interactive Nature Exploration

An immersive web application for exploring different natural habitats and their wildlife inhabitants.

## Features

- **Interactive Region Pages**: Explore forest, arctic, safari, and mountain environments
- **Animal Profiles**: Detailed pages for each animal with habitat information
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Beautiful glass-morphism design with smooth animations

## Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Docker

```bash
# Build the Docker image
docker build -t habitat .

# Run the container
docker run -p 3000:3000 habitat

# Or use Docker Compose
docker-compose up --build
```

### Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Package Manager**: pnpm
- **Deployment**: Docker-ready

## Project Structure

```
habitat/
├── app/                    # Next.js app directory
│   ├── forest/            # Forest region pages
│   ├── arctic/            # Arctic region pages
│   ├── safari/            # Safari region pages
│   └── mountain/          # Mountain region pages
├── src/
│   ├── components/        # Reusable components
│   ├── data/             # Animal and region data
│   └── styles/           # Global styles
└── public/               # Static assets
```

## Development

### Adding New Animals

1. Create animal data in `src/data/`
2. Add animal page in `app/[region]/[animal]/`
3. Update region page to include new animal

### Adding New Regions

1. Create region page in `app/[region]/`
2. Add region data and navigation
3. Update homepage to include new region

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details. 